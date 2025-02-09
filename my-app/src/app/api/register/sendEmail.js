import nodemailer from "nodemailer";
import QRCode from "qrcode";
import fs from "fs";
import path from "path"; 


// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "belabbaslotfi099@gmail.com",
        pass: "tmie htfy aile hvlp "
    }
});

// Function to send an email with a QR code
async function sendEmailWithQR(userEmail, fullName, id) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Race to Space - Registration Confirmation",
            html: `<p>Dear ${fullName},</p>
                   <p>Thank you for registering for the <b>Race to Space</b> event! We are excited to have you join us.</p>
                   
                   <p><b>Your Check-in ID:</b> <span style="font-size: 16px; color: #007bff;">${id}</span></p>
                   
                   <p>Please keep this ID safe, as you will need it during check-in.</p>
                   <p>Your personal QR Code is attached to this email. Make sure to present it at the entrance for a smooth check-in process.</p>

                   <p>Looking forward to seeing you there!</p>
                   
                   <p>Best regards,<br><b>Race to Space Team</b></p>`,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}


export default sendEmailWithQR;
