import sql from 'better-sqlite3';

const db = sql('post.db');

export async function savingPost(data) {
    db.prepare(
        `INSERT INTO posts 
        (userId, title, body) 
        VALUES (
            @userId,
            @title,
            @body
        )
        `).run(data);
}

export async function fetchingPost(data) {
    return db.prepare(
        `SELECT * FROM posts 
         WHERE userId = @userId`
    ).all(data);
}

export async function fetchingSpecificPost(data) {
  return db.prepare(
    `SELECT * FROM posts 
     WHERE id = @id`
  ).get(data);
}

export async function deletingSpecificPost(data) {
  return db.prepare(
    `Delete posts 
     WHERE id = @id`
  ).get(data);
}
