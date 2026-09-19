// Vercel Serverless Function: api/verify-payment.ts
// Verifies Razorpay payment signature using HMAC-SHA256 algorithm
declare const process: any;

import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

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
      signature
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

    // Signature matches! Mark as success
    return res.status(200).json({
      success: true,
      order_id: orderId,
      payment_id: paymentId,
      transaction_id: paymentId,
      order_status: 'PAID',
      payment_status: 'SUCCESS',
      payment_time: new Date().toISOString(),
      message: 'Payment verified and authenticated successfully.'
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
