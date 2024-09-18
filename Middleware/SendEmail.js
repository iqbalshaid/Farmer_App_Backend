const nodemailer = require("nodemailer");

const SendEmail = async (email, otp) => {
  console.log(email, otp, "kij");

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>OTP Code</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                text-align: center;
            }
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #0077B6;
                text-align: center;
            }
            p {
                color: #444;
                text-align: center;
                margin: 10px 0;
            }
            .cta-button {
                background-color: #0077B6;
                border: none;
                color: #ffffff;
                padding: 12px 24px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 20px auto;
                border-radius: 5px;
                cursor: pointer;
                display: block;
                width: 50%;
                margin: 20px auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Your OTP Code</h1>
            <p>Please use the following OTP code to complete your process:</p>
            <p class="otp-code">${otp}</p>
            <p>This code is valid for a limited time only.</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `,
  };

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "shahidiqbal63209@gmail.com",
        pass: "eusy uxah goqa egaw",
      },
      tls: {
        rejectUnauthorized: false // Bypass certificate validation (for development only)
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(otp); // Return OTP along with the email info
      }
    });
  });
};

module.exports = SendEmail;
