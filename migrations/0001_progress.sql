CREATE TABLE IF NOT EXISTS progress (
  device_id TEXT NOT NULL,
  letter_id TEXT NOT NULL,
  completed_at TEXT NOT NULL,
  PRIMARY KEY (device_id, letter_id)
);
CREATE INDEX IF NOT EXISTS idx_progress_device ON progress(device_id);
