**Data**
- [ ] Support multiple deployment schemas (default `app`)
- [ ] Create new set of tables for deployment (within schema)
- [ ] Export app schema types
- [ ] Deployment migrations

**Features**
- [ ] Matomo or alternate analytics provider
- [ ] HTTPS domain hosting

**DevOps**
- [ ] Backup and PITR
- [ ] Auto-update and migrate on schedule (?)
- [ ] Publish types for consuming in app builder


## Notes

**Backup**
Supabase has some in-built support for wal-g
Alternate could be more simple pg_dump
https://supabase.com/blog/postgresql-physical-logical-backups
https://supabase.com/blog/continuous-postgresql-backup-walg
https://github.com/supabase/postgres

Other enterprise solutions could include
https://github.com/EnterpriseDB/barman
https://github.com/pgbackrest/pgbackrest
But not likely to hold significant advantage over other options