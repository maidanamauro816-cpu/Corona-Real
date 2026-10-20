-- Corona Real initial schema. Add application tables in later migrations.
CREATE TABLE IF NOT EXISTS professionals (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
