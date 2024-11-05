-- migrate:up

-- Create a new 'open_app_builder' schema to store tables
create schema if not exists open_app_builder;

-- Assign priviledges so that supabase can access the schema
-- https://supabase.com/docs/guides/api/using-custom-schemas#exposing-custom-schemas
GRANT USAGE ON SCHEMA open_app_builder TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA open_app_builder TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA open_app_builder TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA open_app_builder TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA open_app_builder GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA open_app_builder GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA open_app_builder GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- migrate:down

