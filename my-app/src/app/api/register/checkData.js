

import Database from "better-sqlite3";



const db = new Database("database/race_to_space.db");
 
async function checkData(mat, email) { 
    try {
        const stmt = db.prepare(`
            SELECT * FROM registrations WHERE mat = ? OR email = ?
        `);
        const user = stmt.get(mat, email); 
        console.log("User:", user);
        return !!user;  // Return true if user exists, false otherwise
    } catch (error) {
        console.error("Database error:", error);
        return false;  // Ensure it returns false instead of an object
    }
}


export default checkData; 