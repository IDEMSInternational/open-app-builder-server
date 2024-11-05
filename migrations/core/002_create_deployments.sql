-- migrate:up

-- Create a new 'deployments' schema to store deployment meta_data
create table if not exists open_app_builder.deployments (
    id text not null,
    created_at timestamp with time zone not null default now(),
    constraint deployments_pkey primary key (id)
  ) tablespace pg_default;

-- migrate:down

