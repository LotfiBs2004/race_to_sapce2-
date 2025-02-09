const { Telegraf } = require("telegraf");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const { createCanvas, loadImage } = require("canvas");
const jsQR = require("jsqr");

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Connect to SQLite database
const db = new sqlite3.Database("../my-app/database/race_to_space.db" , (err) => {
    if (err) {
        console.error("❌ Error connecting to database: ", err);
    } else {
        console.log("📦 Database connected!");
    }
}
);
 


// Function to check in a user
function checkInUser(id, callback) {
    const query = `SELECT * FROM registrations WHERE id = ?`;
    db.get(query, [id], (err, row) => {

        if (err) return callback("❌ Database error!" + err);
        if (!row) return callback("❌ Matricule not found!");

        // If already checked in
        if (row.checkin_status === "Checked In") {
            return callback(`⚠️ ${row.full_name} is already checked in.`);
        }

        // Mark user as checked in
        const updateQuery = `UPDATE registrations SET checkin_status = "Checked In"  WHERE id = ?`;
        db.run(updateQuery, [id], function (err) {
            if (err) return callback("❌ Error updating check-in status!");
            callback(`✅ ${row.full_name} has been checked in!`);
        });
    });
} 



 
 

// Handle QR code text input
bot.on("text", (ctx) => {
    const id = ctx.message.text.trim();
    checkInUser(id, (response) => {
        ctx.reply(response);
    });
});

bot.launch();
console.log("🤖 Bot is running...");
