# Migrations

## General Approach

### Separation of Concerns
Multiple migration systems are in place to handle different migration concerns

There are 3 different places that migrations are applied:

1. Open App Builder Core   
Used for core system functionality, such as managing lists of deployments. These are stored within the `migrations/core` folder, and are automatically applied during startup. 

Migrations applied by core system shoudl be applied within the the `open_app_builder` schema namespace

2. Open App Builder Deployments
Used for deployment-specific functionality, such as managing lists of users. These are stored within the `migrations/deployment` folder, and are automatically applied during startup or when a new deployment is created. These can also contain reference to the deployment id as a variable, which will be replaced during execution

(TODO - example)

```sql

```

3. Backend-specific integration
Depending on the backend provider there may be certain migrations required either from the backend platform, or to enable the integration of specific platform features with the backend.
These are stored within the `migrations-[platform]` folder

For example, when using the supabase backend specific access needs to be given to newly created schemas to make availalbe to the dashboard and rest apis.

### Named SQL Files

These are named with timestamped references, and are applied in numerical order. 

The same migration will never be applied twice unless specifically rolled back (available via manual methods, recommended only for local development), however only the timestamp part of the name is saved so migrations can be renamed if required.

A utility to generate a new empty migration file can be run via:

```sh
npm run dbmate:core new
```
or
```sh
npm run dbmate:deployment new
```

### Backwards Compatibility
Given that api endpoints will be included in the apps of users who may not update frequently (or ever), any changes to endpoints should avoid breaking functionality for existing users.

Usually this will mean adding columns to existing table structures to store new incoming data,
although if more fundamental changes are required new tables and api endpoints should be created

## Q&A

**The API is written with Drizzle integration, why not use their migration system too (why DBMate)**
Whilst Drizzle does provide some interesting capabilities, it focuses most of its efforts on code-first schema definitions where the database structures are inferred from JS/TS definition files. This limits use of some advanced SQL functionality (particularly triggers), and also provides less clear indication of when updates are available (type definitions overwrite the type files, instead of generating new).

When using an sql-first approach with Drizzle there is no support for migration rollback (particularly useful for development), and there have been known to be a number of issues implementing more generally
https://github.com/drizzle-team/drizzle-orm/discussions/1339



