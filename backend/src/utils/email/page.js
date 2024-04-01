import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: "manager.vetnext@outlook.com",
        pass: "Vetnext@1234"
    },
});

// Function to send an email
export const sendEmailToUser = async (to, userName, doctorName, date, StartTime, EndTime) => {
    try {
        await transporter.sendMail({
            from: "manager.vetnext@outlook.com",
            to: to,
            subject: "Appoinment booking confirmation",
            html: `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Confirmation</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Appointment Confirmation</h2>
                    <p>Dear ${userName},</p>
                    <p>Your appointment has been successfully booked with our doctor.</p>
                    <p><strong>Doctor:</strong> ${doctorName}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${StartTime} - ${EndTime}</p>
                    <p>Please make sure to arrive on time for your appointment.</p>
                    <p>If you have any questions or need to reschedule, please contact us.</p>
                    <p>Thank you for choosing our services.</p>
                    <p>Best Regards,</p>
                    <p>The Vetnext Team</p>
                </div>
            </body>
            </html>`
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export const sendEmailToDoctor = async (to, doctorName, UserName, date, StartTime, EndTime) => {
    try {
        await transporter.sendMail({
            from: "manager.vetnext@outlook.com",
            to: to,
            subject: "Appoinment booking confirmation",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Appointment Notification</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">New Appointment Notification</h2>
                    <p>Dear Dr. ${doctorName},</p>
                    <p>A new appointment has been booked with you.</p>
                    <p><strong>Patient Name:</strong> ${UserName}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${StartTime} - ${EndTime}</p>
                    <p>Please review your schedule accordingly.</p>
                    <p>If you have any questions or need to make changes, please contact the patient.</p>
                    <p>Thank you for your attention.</p>
                    <p>Best Regards,</p>
                    <p>The Vetnext Team</p>
                </div>
            </body>
            </html>`
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};