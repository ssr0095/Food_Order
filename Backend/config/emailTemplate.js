export const EMAIL_VERIFY_TEMPLATE = `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <title>Potato. | Email Verify</title>
    <style>
        body {
            font-family: 'Outfit',Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding: 20px;
        }

        .header {
            background-color: tomato;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .otp {
            font-size: 32px;
            font-weight: bold;
            margin: 20px 0;
            color: tomato;
        }

        .footer {
            text-align: center;
            color: #888888;
            margin-top: 20px;
            font-size: 12px;
        }

        .footer a {
            color: tomato;
            text-decoration: none;
        }

        .button {
            display: inline-block;
            background-color: tomato;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
        }

        .button:hover {
            background-color: rgb(251, 119, 96);
        }
        .content a[href],.content a{
            color: white;
            }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            Potato. | Email Verification
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>Thank you for signing up. Use the OTP below to verify your email address:</p>
            <div class="otp">{{OTP}}</div>
            <a href="{{FRONT_URL}}/verifyAccount?token={{token}}&otp={{OTP}}" style class="button">Verify Email</a>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2025 Potato. All rights reserved.</p>
            <p>Need help? <a href="mailto:support@potato.com">Contact Support</a></p>
        </div>
    </div>
</body>

</html>`;
export const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <title>Potato. | Reset Password</title>
    <style>
        body {
            font-family: 'Outfit',Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding: 20px;
        }

        .header {
            background-color: tomato;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .otp {
            font-size: 32px;
            font-weight: bold;
            margin: 20px 0;
            color: tomato;
        }

        .footer {
            text-align: center;
            color: #888888;
            margin-top: 20px;
            font-size: 12px;
        }

        .footer a {
            color: tomato;
            text-decoration: none;
        }

        .button {
            display: inline-block;
            background-color: tomato;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
        }

        .button:hover {
            background-color: rgb(251, 119, 96);
        }
        .content a[href],.content a{
            color: white;
            }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            Potato. | Reset Password
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>Use the OTP below to reset your password:</p>
            <div class="otp">{{OTP}}</div>
            <a href="{{FRONT_URL}}/resetPassword?otp={{OTP}}&email={{EMAIL}}" class="button">Reset Password</a>
            <p>If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© 2025 Potato. All rights reserved.</p>
            <p>Need help? <a href="mailto:support@potato.com">Contact Support</a></p>
        </div>
    </div>
</body>

</html>`;
