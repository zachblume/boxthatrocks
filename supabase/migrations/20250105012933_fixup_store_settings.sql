DROP TABLE IF EXISTS store_settings;
CREATE TABLE store_settings (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  store_name TEXT NOT NULL
);