// Vercel Serverless Function: api/verify-payment.ts
// Verifies Razorpay payment signature & sends greeting email with event rulebook
declare const process: any;

import crypto from 'crypto';
import nodemailer from 'nodemailer';

const EVENT_RULEBOOK_LINKS: Record<string, string> = {
  'ranaveera': "RV 25 Rule books/RANAVEERA RV'25 new.pdf",
  'pushpak': "RV 25 Rule books/PUSPHAK RV 25.pdf",
  'sarvaagami': "RV 25 Rule books/SARVAAGAMI RV'25.pdf",
  'sarvagami': "RV 25 Rule books/SARVAAGAMI RV'25.pdf",
  'yoddha': "RV 25 Rule books/YODDHA RV'25.pdf",
  'lakshmanarekha': "RV 25 Rule books/LAKSHMANREKHA RV'25 new.pdf",
  'lakshman rekha': "RV 25 Rule books/LAKSHMANREKHA RV'25 new.pdf",
  'gati': "RV 25 Rule books/GATI RV'25.pdf",
  'goalaa': "RV 25 Rule books/GOALAA RV'25 new.pdf",
  'goala': "RV 25 Rule books/GOALAA RV'25 new.pdf",
  'yantraa': "RV 25 Rule books/YANTRAA RV'25.pdf",
  'yantra': "RV 25 Rule books/YANTRAA RV'25.pdf",
  'samanvayi': "RV 25 Rule books/SAMANVAYI RV'25new.pdf",
  'jaladhmatra': "RV 25 Rule books/JALADHMATRA RV'25.pdf"
};

function getRulebookPath(title?: string): string {
  if (!title) return "RV 25 Rule books/RANAVEERA RV'25 new.pdf";
  const lower = title.toLowerCase();
  for (const [key, path] of Object.entries(EVENT_RULEBOOK_LINKS)) {
    if (lower.includes(key)) return path;
  }
  return "RV 25 Rule books/RANAVEERA RV'25 new.pdf";
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
      payment_id,
      signature,
      customerName,
      customerEmail,
      passTitle,
      college,
      amount
    } = req.body || {};

    const orderId = razorpay_order_id || order_id;
    const paymentId = razorpay_payment_id || payment_id;
    const receivedSignature = razorpay_signature || signature;

    if (!orderId || !paymentId || !receivedSignature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.'
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'agkEyZz9H4spVP9BNT3SGj7j';

    if (!keySecret) {
      return res.status(500).json({
        success: false,
        error: 'Razorpay Key Secret is not configured in server environment.'
      });
    }

    // Razorpay Signature verification: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const isSignatureValid = expectedSignature === receivedSignature;

    if (!isSignatureValid) {
      console.error('Razorpay Signature Mismatch!', {
        receivedSignature,
        expectedSignature,
        orderId,
        paymentId
      });
      return res.status(400).json({
        success: false,
        payment_status: 'FAILED',
        error: 'Payment verification failed: Signature mismatch. Transaction was not authenticated.'
      });
    }

    // Determine event rulebook
    const rulebookRelativePath = getRulebookPath(passTitle);
    const origin = req.headers?.origin || 'https://trc-rv.vercel.app';
    const rulebookDownloadUrl = `${origin}/${encodeURI(rulebookRelativePath)}`;

    // Send Greeting Email if SMTP credentials are provided
    let emailSent = false;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.GMAIL_PASS;
    const recipientEmail = customerEmail || req.body?.email;

    if (smtpUser && smtpPass && recipientEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || 'gmail',
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        const delegateName = customerName || 'Delegate';
        const eventOrPass = passTitle || "ROBOVEDA'26 Pass";

        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a111e; color: #f1f5f9; padding: 20px; margin: 0; }
              .card { max-width: 600px; margin: 0 auto; background: #0f1929; border: 2px solid #d4af37; border-radius: 8px; overflow: hidden; }
              .header { background: #132238; padding: 25px; text-align: center; border-bottom: 2px solid #d4af37; }
              .header h1 { margin: 0; color: #d4af37; font-size: 26px; text-transform: uppercase; letter-spacing: 2px; }
              .header p { margin: 5px 0 0 0; color: #94a3b8; font-size: 13px; font-family: monospace; }
              .body { padding: 30px; }
              .welcome { font-size: 18px; color: #ffffff; font-weight: bold; margin-bottom: 15px; }
              .details-box { background: #172a45; border: 1px solid rgba(212,175,55,0.4); border-radius: 6px; padding: 20px; margin: 20px 0; }
              .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
              .row:last-child { margin-bottom: 0; }
              .label { color: #94a3b8; }
              .val { color: #fce49c; font-weight: bold; }
              .button-container { text-align: center; margin: 30px 0; }
              .btn { display: inline-block; background: linear-gradient(135deg, #fce49c, #d4af37); color: #000000; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 4px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
              .footer { background: #070d18; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(212,175,55,0.3); font-family: monospace; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h1>ROBOVEDA'26 — ASCENSION</h1>
                <p>THE ROBOTICS CLUB — SNIST // ISO 20121:2012 CERTIFIED</p>
              </div>
              <div class="body">
                <div class="welcome">Greetings, ${delegateName}! 🤖</div>
                <p>Congratulations! Your registration for <strong>${eventOrPass}</strong> has been successfully verified and confirmed.</p>
                
                <div class="details-box">
                  <div class="row"><span class="label">Pass Category:</span><span class="val">${eventOrPass}</span></div>
                  <div class="row"><span class="label">Order ID:</span><span class="val">${orderId}</span></div>
                  <div class="row"><span class="label">Transaction Ref:</span><span class="val">${paymentId}</span></div>
                  <div class="row"><span class="label">Institution:</span><span class="val">${college || 'SNIST'}</span></div>
                  <div class="row"><span class="label">Status:</span><span class="val" style="color:#22c55e;">● VERIFIED PAID</span></div>
                </div>

                <div class="button-container">
                  <a href="${rulebookDownloadUrl}" class="btn" target="_blank">📥 DOWNLOAD OFFICIAL RULEBOOK (PDF)</a>
                </div>

                <p style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
                  <strong>Arena Reporting Checklist:</strong><br>
                  • Please keep your digital pass and rulebook accessible on match day.<br>
                  • Report to the SNIST Campus Registration Desk 45 minutes before arena scrutiny.<br>
                  • For hospitality or queries, reach us at <strong>+91 63019 32007</strong>.
                </p>
              </div>
              <div class="footer">
                ROBOVEDA'26 • Sreenidhi Institute of Science and Technology, Hyderabad
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"ROBOVEDA'26 Organizing Directorate" <${smtpUser}>`,
          to: recipientEmail,
          subject: `🎉 Registration Confirmed: ${eventOrPass} | ROBOVEDA'26 Rulebook & Pass`,
          html: htmlContent
        });
        emailSent = true;
        console.log(`Greeting email dispatched successfully to ${recipientEmail}`);
      } catch (mailErr) {
        console.warn('Could not send automated confirmation email:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      order_id: orderId,
      payment_id: paymentId,
      transaction_id: paymentId,
      order_status: 'PAID',
      payment_status: 'SUCCESS',
      rulebook_url: rulebookDownloadUrl,
      email_sent: emailSent,
      payment_time: new Date().toISOString(),
      message: 'Payment verified successfully.'
    });
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while verifying signature',
      message: error?.message || 'Unknown error'
    });
  }
}
