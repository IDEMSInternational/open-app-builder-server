-- migrate:up


-- PSQL - set variables for use in sql. See docs on "SQL Interpolation"
-- https://www.postgresql.org/docs/current/app-psql.html#APP-PSQL-INTERPOLATION

\set pgpass `echo "$POSTGRES_PASSWORD"`
\set DEPLOYMENT_NAME `echo "$DEPLOYMENT_NAME"`

-- Create a new 'open_app_builder' schema to store tables
create schema if not exists :'DEPLOYMENT_NAME';

create user if not exists :'DEPLOYMENT_NAME' WITH PASSWORD :'pgpass';
ALTER USER :'DEPLOYMENT_NAME' SET search_path TO :'DEPLOYMENT_NAME';
GRANT USAGE ON SCHEMA :'DEPLOYMENT_NAME' TO :'DEPLOYMENT_NAME'

-- Assign privileges so that supabase can access the schema
-- https://supabase.com/docs/guides/api/using-custom-schemas#exposing-custom-schemas
GRANT USAGE ON SCHEMA :'DEPLOYMENT_NAME' TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA :'DEPLOYMENT_NAME' TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA :'DEPLOYMENT_NAME' TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA :'DEPLOYMENT_NAME' TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA :'DEPLOYMENT_NAME' GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA :'DEPLOYMENT_NAME' GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA :'DEPLOYMENT_NAME' GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;



-- migrate:down

