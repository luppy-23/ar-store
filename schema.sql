CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  product TEXT NOT NULL,
  robux INTEGER NOT NULL,
  price INTEGER NOT NULL,
  method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Menunggu Pembayaran'
);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
