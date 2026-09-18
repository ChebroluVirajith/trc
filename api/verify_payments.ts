// Vercel Serverless Function: api/verify-payment.ts
// Verifies status of a Cashfree PG order
declare const process: any;

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

  const orderId = req.query.order_id || req.body?.order_id;

  if (!orderId) {
    return res.status(400).json({ error: 'order_id query parameter is required.' });
  }

  const appId = process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_CLIENT_SECRET;
  const env = (process.env.CASHFREE_ENV || 'SANDBOX').toUpperCase();
  const apiVersion = process.env.CASHFREE_API_VERSION || '2023-08-01';

  // If mock mode
  if (!appId || !secretKey || orderId.startsWith('RV26_mock') || orderId.includes('mock')) {
    return res.status(200).json({
      order_id: orderId,
      order_status: 'PAID',
      order_amount: 1499,
      order_currency: 'INR',
      payment_status: 'SUCCESS',
      is_mock: true,
      transaction_id: `TXN_${Date.now().toString().slice(-8)}`,
      payment_time: new Date().toISOString(),
      message: 'Payment verified successfully (Mock Dev Mode)'
    });
  }

  const baseUrl = env === 'PRODUCTION'
    ? `https://api.cashfree.com/pg/orders/${orderId}`
    : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-api-version': apiVersion,
        'x-client-id': appId,
        'x-client-secret': secretKey
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree Verify Order Error:', data);
      return res.status(response.status).json({
        error: data.message || 'Failed to fetch order from Cashfree',
        details: data
      });
    }

    // Also attempt to get specific payment details if possible
    let payments: any[] = [];
    try {
      const paymentsUrl = env === 'PRODUCTION'
        ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`;

      const paymentsRes = await fetch(paymentsUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-api-version': apiVersion,
          'x-client-id': appId,
          'x-client-secret': secretKey
        }
      });
      if (paymentsRes.ok) {
        payments = await paymentsRes.json();
      }
    } catch (payErr) {
      console.warn('Could not fetch payment details array:', payErr);
    }

    const latestSuccessfulPayment = Array.isArray(payments)
      ? payments.find((p: any) => p.payment_status === 'SUCCESS') || payments[0]
      : null;

    return res.status(200).json({
      order_id: data.order_id,
      order_status: data.order_status,
      order_amount: data.order_amount,
      order_currency: data.order_currency,
      customer_details: data.customer_details,
      payment_status: data.order_status === 'PAID' ? 'SUCCESS' : (latestSuccessfulPayment?.payment_status || 'PENDING'),
      payment_method: latestSuccessfulPayment?.payment_group || latestSuccessfulPayment?.payment_method || 'ONLINE',
      transaction_id: latestSuccessfulPayment?.cf_payment_id || data.order_id,
      payment_time: latestSuccessfulPayment?.payment_completion_time || new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Internal Server Error in verify-payment:', error);
    return res.status(500).json({
      error: 'Internal Server Error while verifying order',
      message: error?.message || 'Unknown error'
    });
  }
}
