// Email Verification Email Template
const verifyEmailTemplate = (user, verifyLink) => {
  return `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="
  margin:0;
  padding:40px 20px;
  background:#f4f4f5;
  font-family:Arial, Helvetica, sans-serif;
">

  <div style="
    max-width:600px;
    margin:auto;
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background:#2563eb;
      padding:35px;
      text-align:center;
      color:#ffffff;
    ">
      <h1 style="margin:0;">
        Verify Your Account
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:40px;">

      <h2 style="
        color:#111827;
        margin-top:0;
      ">
        Hello ${user.name},
      </h2>

      <p style="
        color:#4b5563;
        line-height:28px;
        font-size:16px;
      ">
        Thank you for registering with Movie Ticket Booking.
        Please verify your email address to activate your account.
      </p>

      <div style="text-align:center;margin:40px 0;">
        <a
          href="${verifyLink}"
          style="
            background:#2563eb;
            color:#ffffff;
            text-decoration:none;
            padding:15px 35px;
            border-radius:8px;
            display:inline-block;
            font-size:16px;
            font-weight:bold;
          "
        >
          Verify Email
        </a>
      </div>

      <p style="
        color:#6b7280;
        line-height:28px;
      ">
        This verification link will expire in
        <strong>15 minutes</strong>.
      </p>

      <p style="
        color:#6b7280;
        line-height:28px;
      ">
        If you didn't create this account, you can safely ignore this email.
      </p>

      <div style="
        margin-top:30px;
        padding:15px;
        background:#f9fafb;
        border-radius:8px;
      ">
        <p style="
          margin:0;
          color:#6b7280;
          font-size:14px;
        ">
          Or copy and paste this link into your browser:
        </p>

        <p style="
          word-break:break-all;
          color:#2563eb;
          font-size:14px;
        ">
          ${verifyLink}
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="
      padding:20px;
      text-align:center;
      background:#f9fafb;
      color:#9ca3af;
      font-size:13px;
    ">
      © ${new Date().getFullYear()} Movie Ticket Booking.
      All rights reserved.
    </div>

  </div>

</body>
</html>`;
};

// Login OTP Template
const loginOTPTemplate = (user, otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background:#f4f7fc;font-family:Arial,sans-serif;">

      <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <div style="background:#2563eb;padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;">
                  Verification Code
              </h1>
          </div>

          <div style="padding:40px 30px;">
              <h2 style="margin-top:0;color:#1e293b;">
                  Hello ${user.name},
              </h2>

              <p style="font-size:16px;color:#475569;line-height:1.7;">
                  We received a request to sign in to your account. Please use the following One-Time Password (OTP) to continue:
              </p>

              <div style="text-align:center;margin:35px 0;">
                  <span style="
                      display:inline-block;
                      background:#f1f5f9;
                      color:#2563eb;
                      font-size:32px;
                      font-weight:bold;
                      letter-spacing:10px;
                      padding:18px 35px;
                      border-radius:10px;
                  ">
                      ${otp}
                  </span>
              </div>

              <p style="font-size:15px;color:#64748b;line-height:1.7;">
                  This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone for security reasons.
              </p>

              <p style="font-size:15px;color:#64748b;line-height:1.7;">
                  If you did not request this code, please ignore this email or contact our support team.
              </p>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin:30px 0;">

              <p style="font-size:14px;color:#94a3b8;text-align:center;">
                  © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
          </div>
      </div>

  </body>
  </html>
  `;
};

module.exports = {
  verifyEmailTemplate,
  loginOTPTemplate,
};
