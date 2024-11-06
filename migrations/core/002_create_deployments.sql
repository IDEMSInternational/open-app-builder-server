-- migrate:up

-- Create a new 'deployments' schema to store deployment meta_data
CREATE TABLE IF NOT EXISTS open_app_builder.deployments (
    id text not null,
    created_at timestamp with time zone not null default now(),
    constraint deployments_pkey primary key (id)
  ) tablespace pg_default;


-- Create a custom `pre_config` function to update postgrest config and expose deployment
-- schemas to rest api (default only includes `public`, `storage` and `graphql_public`)
-- This function is assigned to PostGrest from the container `PGRST_DB_PRE_CONFIG` env var.
CREATE OR REPLACE FUNCTION open_app_builder.pre_config()
returns void as $$
  SELECT 
    set_config('pgrst.db_schemas', string_agg(id, ',')||',public,storage,graphql_public', true) 
  from open_app_builder.deployments;  
$$ language sql;
-- 

-- When a new deployment is created automatically create schema namespace
CREATE OR REPLACE FUNCTION open_app_builder.create_deployment_schema()
RETURNS trigger
LANGUAGE plpgsql
AS $function$BEGIN
  -- Deployment id accessible from `new` variable which holds new deployment row value when triggered
  -- Use `execute` to allow for dynamically created SQL via sting format()
  -- https://www.postgresql.org/docs/current/functions-string.html#FUNCTIONS-STRING-FORMAT
  EXECUTE format( 'CREATE SCHEMA IF NOT EXISTS %I ',new.id); 
  -- Notify postgrest to reload the pgrst config generated via the `pre_config()` function above
  NOTIFY pgrst, 'reload config';
  RETURN NEW;
END;$function$;

-- Create trigger on new deployment row added to create schema and use webhooks to trigger full migration
CREATE OR REPLACE TRIGGER create_deployment_trigger 
  BEFORE INSERT ON open_app_builder.deployments
  FOR EACH ROW 
  EXECUTE FUNCTION open_app_builder.create_deployment_schema();

-- References
-- [Postgrest schema config](https://docs.postgrest.org/en/stable/references/configuration.html#in-database-configuration)

-- migrate:down
DROP TABLE IF EXISTS open_app_builder.deployments;
DROP TRIGGER IF EXISTS create_deployment_trigger ON open_app_builder.deployments;
DROP FUNCTION IF EXISTS open_app_builder.create_deployment_schema;

