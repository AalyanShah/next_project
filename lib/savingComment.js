import sql from 'better-sqlite3';

const db = sql('post.db');

export async function savingComment(data) {
    db.prepare(
        `INSERT INTO comments 
        (postId, name, email, body) 
        VALUES (
            @postId,
            @name,
            @email,
            @body
        )
        `).run(data);
}

export async function updatingComment(data) {
    db.prepare(`
        UPDATE comments
        SET 
            body = @body
        WHERE id = @id
    `).run(data);
}