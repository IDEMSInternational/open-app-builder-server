# Troubleshooting

## Tenant or user not found
Supavisor pooler appears to have issues when trying to connect from outside of containers
https://github.com/supabase/supavisor/issues/364

As a workaround connect directly to postgres db instance running on port `5433` instead of 
connection pooler running on `5432`