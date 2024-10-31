# Open App Builder Server

**PreRequisites**

- Docker

Also copy and configure default environment variables

```
cp .env.example .env
```

Be sure to change sensitive information such as
`POSTGRES_PASSWORD`
`DASHBOARD_USERNAME`
`DASHBOARD_PASSWORD`

You should also create and set keys
https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys

`JWT_SECRET`
`ANON_KEY`
`SERVICE_ROLE_KEY`

## Start Server

```sh
docker compose up -d
```

Access through https://localhost:8000
Use the `DASHBOARD_USERNAME` and `DASHBOARD_USERNAME` variables set in `.env`

## Local Development

**PreRequisites**

[Deno 2](https://docs.deno.com/runtime/getting_started/installation/)

```sh
docker compose -f docker-compose.yml -f ./dev/docker-compose.dev.yml up --renew-anon-volumes
```

or

```sh
deno task start:dev
```

# Supabase Docker

This is a minimal Docker Compose setup for self-hosting Supabase. Follow the steps [here](https://supabase.com/docs/guides/hosting/docker) to get started.

## Troubleshooting

**analytics requires docker daemon exposed on tcp://localhost:2375**  
If running docker on windows via docker desktop, need to enable from settings
_Expose daemon on tcp://localhost:2375 without TLS_

## FAQs

1. Why does this not use Supabase CLI, with commands like `supabase start` or `supabase migrate`

The supabase CLI is designed to only run development mode containers locally, and communicate with a production instance running on the supabase platform. In order to run a local production instance a custom docker-based approach is requried.

2. Why does local development use Deno instead of Node

As Supabase function development is written in Deno it makes sense to require one single runtime throughout instead of multiple
