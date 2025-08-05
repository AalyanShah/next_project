import sql from 'better-sqlite3';

const db = sql('post.db');

export async function LoginData(data) {
    db.prepare(
        `INSERT INTO meals 
        (name, email, password) 
        VALUES (
            @name,
            @email,
            @password
        )
        `).run(data);
}

export async function checkLoginCredentials({ email, password }) {
    try {
        const stmt = db.prepare("SELECT * FROM meals WHERE email = ? AND password = ?");
        const user = stmt.get(email, password);
        return user || null;
    } catch (err) {
        console.error("Login error:", err);
        return null;
    }
}