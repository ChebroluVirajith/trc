// Vercel Serverless Function: api/test-email.ts
// Diagnostic endpoint to test SMTP settings and get instant error reports
declare const process: any;

import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const testRecipient = req.query?.to || req.body?.to || process.env.SMTP_USER || process.env.EMAIL_USER;

  const rawUser = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER || '';
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_PASS || '';
  const smtpUser = rawUser.trim();
  const smtpPass = rawPass.trim().replace(/\s+/g, '');

  const diagnostics: any = {
    env_configured: {
      has_SMTP_USER: Boolean(process.env.SMTP_USER),
      has_SMTP_PASS: Boolean(process.env.SMTP_PASS),
      has_EMAIL_USER: Boolean(process.env.EMAIL_USER),
      has_EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
      smtpUserPreview: smtpUser ? `${smtpUser.slice(0, 3)}***@${smtpUser.split('@')[1] || ''}` : 'NOT_SET',
      smtpPassLength: smtpPass ? smtpPass.length : 0
    },
    target_recipient: testRecipient || 'NONE'
  };

  if (!smtpUser || !smtpPass) {
    return res.status(400).json({
      success: false,
      error: 'SMTP credentials missing from environment variables (SMTP_USER and SMTP_PASS).',
      diagnostics
    });
  }

  if (!testRecipient) {
    return res.status(400).json({
      success: false,
      error: 'No recipient email specified. Pass ?to=your_email@gmail.com in URL query parameter.',
      diagnostics
    });
  }

  try {
    const isGmail = smtpUser.includes('@gmail.com') || process.env.SMTP_SERVICE === 'gmail';

    const transporter = isGmail
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000
        })
      : nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465 || process.env.SMTP_SECURE === 'true' || true,
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 10000
        });

    // Test SMTP verification
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: `"ROBOVEDA'26 Mailer Test" <${smtpUser}>`,
      to: testRecipient,
      subject: "✅ ROBOVEDA'26 SMTP Test Email Successful",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #0a111e; color: #f1f5f9; border: 2px solid #d4af37; border-radius: 8px;">
          <h2 style="color: #d4af37;">🎉 ROBOVEDA'26 SMTP Test Email</h2>
          <p>Your SMTP mail configuration is working perfectly!</p>
          <p>Automated confirmation emails with delegate passes & rulebooks will now be delivered automatically upon payment.</p>
          <hr style="border: 1px solid rgba(212,175,55,0.3);" />
          <p style="font-size: 12px; color: #94a3b8;">Sent via ${smtpUser}</p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: `Test email sent successfully to ${testRecipient}!`,
      messageId: info.messageId,
      diagnostics
    });
  } catch (err: any) {
    console.error('SMTP test failed:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'SMTP failed',
      code: err?.code,
      response: err?.response,
      command: err?.command,
      diagnostics,
      troubleshooting: {
        guide_if_invalid_login: 'If error is 535 5.7.8 (Bad credentials), ensure 2-Step Verification is ON in your Google account and generate a 16-letter App Password at https://myaccount.google.com/apppasswords',
        guide_if_timeout: 'If error is ETIMEDOUT or ECONNREFUSED, Gmail may be blocking port 587 on cloud host. Try port 465 with SSL.'
      }
    });
  }
}
