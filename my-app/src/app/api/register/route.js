import Database from "better-sqlite3";

const db = new Database("database/race_to_space.db");

import checkData from "./checkData.js"; 
import sendEmail from "./sendEmail.js"; 
export async function POST(req) {
    console.log("POST /api/register");
    const { full_name, email, phone_num, mat, field_of_study, year_of_study } = await req.json();
    let found = await checkData(mat, email);  

    if (found) {
        return new Response(JSON.stringify({ success: false, message: "Error: User already exists or invalid data! lol " }), { status: 400 });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO registrations (full_name, email, phone_num, mat, field_of_study, year_of_study)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        stmt.run(full_name, email, phone_num, mat, field_of_study, year_of_study);
        
        // get the id of the last inserted user 
        const user = db.prepare(`SELECT * FROM registrations WHERE mat = ?`).get(mat);
        console.log("lol i am joking :", user.id);
        // return ; 

        await sendEmail(email, full_name, user.id); // Send email with QR code
        return new Response(JSON.stringify({ success: true, message: "User registered!" }), { status: 200 });
    } catch (error) { 
        console.error("Database error:", error);
        return new Response(JSON.stringify({ success: false, message: "Error: User already exists or invalid data!" }), { status: 500 });
    }
}
