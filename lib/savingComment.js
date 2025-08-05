import sql from 'better-sqlite3';

const db = sql('post.db');

export async function savingComment(data) {
    db.prepare(
        `INSERT INTO comments 
        (postId, userId, name, email, body) 
        VALUES (
            @postId,
            @userId,
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

export async function fetchingComment(data) {
    return db.prepare(
        `SELECT * FROM comments 
         WHERE postId = @postId`
    ).all(data);
}

export async function deletingComment(data) {
    return db.prepare(
        `DELETE FROM comments WHERE id = @id`
    ).run(data);
}
