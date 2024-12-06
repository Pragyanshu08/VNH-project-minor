const nodemailer = require('nodemailer');

const sendMail = async ({ name, to, phone, from, subject, msg }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "yashtiwari4000@gmail.com",
            pass: 'lepwdcjqbnjwbkzt'                      // my temporary password(after 2FA)
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: `Message from ${name} (${phone}): ${msg}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};

module.exports = sendMail;
