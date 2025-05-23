
export const EMAIL_TEMPLATE = `<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet">
  <title>Email Verification</title>
  <style>
    body { margin: 0; padding: 0; background-color: #e7e7e7; color: #000000; }
    .u-row-container { padding: 0; background-color: #f5dff1; }
    .u-row { width: 100%; max-width: 600px; margin: 0 auto; background-color: transparent; }
    .u-col { width: 100%; display: table-cell; vertical-align: top; }
    .u-content { padding: 60px 0; text-align: center; }
    .u-heading { font-family: 'Arvo', serif; font-size: 70px; color: #6f59a0; }
    .u-subheading { font-family: 'Montserrat', sans-serif; font-size: 24px; color: #d8317d; margin-bottom: 30px; }
    .u-image { width: 100%; max-width: 480px; }
    .u-button { background-color: #000000; color: #FFFFFF; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 14px; display: inline-block; }
  </style>
</head>
<body>
  <div class="u-row-container">
    <div class="u-row">
      <div class="u-col">
        <div class="u-content">
          <h1 class="u-heading">Hi {{name}}! Welcome</h1>
          <p class="u-subheading">"This Could be the Start of Something Awesome"</p>
          <img src="{{image}}" alt="Welcome Image" class="u-image" />
        </div>
      </div>
    </div>
  </div>

  <div class="u-row-container" style="background-color: #ffffff;">
    <div class="u-row">
      <div class="u-col">
        <div class="u-content">
          <h2 style="font-family: 'Arvo', serif; font-size: 35px; color: #000000;">You Are Almost Done, Please Confirm Your Email</h2>
          <li onclick={sendVerificationOtp} >confirm Email</li>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`

export const VERIFY_OTP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      text-align: center;
    }
    .header-img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    h1 {
      color: #333;
      margin-top: 20px;
    }
    .otp-code {
      background-color: #eef9f1;
      color: #2e7d32;
      font-size: 32px;
      font-weight: bold;
      padding: 15px 30px;
      display: inline-block;
      border-radius: 10px;
      margin: 20px 0;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="header-img" src="http://localhost:6969/images/otp1.svg" alt="Email Verification">
    <h1>Email Verification</h1>
    <p>Please use the following OTP to complete your verification process:</p>
    <div class="otp-code">{{OTP_CODE}}</div>
    <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
    <p>If you didn’t request this code, you can safely ignore this email.</p>
    
    <div class="footer">
      &copy; 2025. All rights reserved.
    </div>
  </div>
</body>
</html>
`

export const RESET_OTP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Password OTP</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f6f8fb;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      text-align: center;
    }
    .otp-code {
      font-size: 30px;
      color: #007bff;
      font-weight: bold;
      background: #eef3fc;
      padding: 12px 24px;
      border-radius: 8px;
      display: inline-block;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 30px;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <img src="http://localhost:6969/images/otp2.svg" alt="Reset Password">
    <h2>Reset Your Password</h2>
    <p>You requested to reset your password. Please use the OTP below to proceed:</p>
    <div class="otp-code">{{OTP_CODE}}</div>
    <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
    
    <div class="footer">
      &copy; 2025. All rights reserved.
    </div>
  </div>
</body>
</html>
`