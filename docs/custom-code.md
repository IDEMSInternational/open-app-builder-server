# Custom Code

The following is a summary of the major code changes applied to differentiate from supabase

## Functions
- Volumes map includes top-level `/.functions` directory for tidiness

## Migrations
- Custom migration container added with dbmate. Used for core migrations that apply generally
- (wip) Secondary migration system to apply repeated migrations per deployment

## Postgrest
- Custom `PGRST_DB_PRE_CONFIG` function used to define what tables can be accessed through supabase rest.
This appends the names of each deployment defined in the `open_app_builder.deployments` table to be included dynamically 