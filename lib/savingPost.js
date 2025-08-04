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