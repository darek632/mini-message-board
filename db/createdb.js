#! /usr/bin/env node
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO messages (author, text)
VALUES
  ('Amando', 'Hi there!'),
  ('Charles', 'Hello World!');
`;

async function main() {
  const connectionString = process.argv[2];

  if (!connectionString) {
    console.error("Usage: node db/populatedb.js <database-url>");
    process.exit(1);
  }

  console.log("seeding...");
  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();