const sql = require('better-sqlite3');
const db = sql('post.db');

// Table: meals
db.prepare(`
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`).run();

// Create posts table
db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    userId INTEGER NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL
  )
`).run();

// Create comments table
db.prepare(`
  CREATE TABLE IF NOT EXISTS comments (
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    body TEXT NOT NULL
  )
`).run();

// Set initial AUTOINCREMENT starting points
db.prepare(`INSERT OR REPLACE INTO sqlite_sequence (name, seq) VALUES ('posts', 100)`).run();     // So next id will be 101
db.prepare(`INSERT OR REPLACE INTO sqlite_sequence (name, seq) VALUES ('comments', 500)`).run();  // So next id will be 501

function initData() {
  const stmt = db.prepare(`
      INSERT INTO user (name, email, password) VALUES (
         @name,
         @email,
         @password
      )
   `);

  const sampleData = {
    name: "Aalyan Asghar",
    email: "aalyan@example.com",
    password: "secure123"
  };

  stmt.run(sampleData);
  console.log("Inserted initial data into meals table");
}

initData();

const rows = db.prepare('SELECT * FROM comments').all();
console.log("📋 All Records in Meals Table:", rows);