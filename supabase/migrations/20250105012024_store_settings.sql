CREATE TABLE store_settings (
  id uuid not null references auth.users on delete cascade,
  store_name TEXT NOT NULL
);