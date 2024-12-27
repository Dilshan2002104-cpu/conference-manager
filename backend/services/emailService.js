const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (username, email) => {
    const msg = {
        to: email,
        from: '22IT0467@itum.mrt.ac.lk',
        subject: 'Welcome to Our Service',
        text: `Hello ${username},\n\nThank you for registering with us! We're glad to have you on board.\n\nBest regards,\nYour Company Name`,
        html: `<strong>Hello ${username},</strong><br><br>Thank you for registering with us! We're glad to have you on board.<br><br>Best regards,<br>Your Company Name`,
    };

    try {
        await sgMail.send(msg);
        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = {
    sendWelcomeEmail,
};