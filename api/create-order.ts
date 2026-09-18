// Vercel Serverless Function: api/create-order.ts
// Handles creation of Cashfree PG orders and returns payment_session_id
declare const process: any;

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
      amount,
      customerName,
      customerEmail,
      customerPhone,
      passId,
      passTitle,
      college,
      branch,
      year,
      teamName,
      teamMembers,
      returnUrl
    } = req.body || {};

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid order amount.' });
    }
    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'Customer name, email, and phone are required.' });
    }

    const appId = process.env.CASHFREE_APP_ID || process.env.CASHFREE_CLIENT_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_CLIENT_SECRET;
    const env = (process.env.CASHFREE_ENV || 'SANDBOX').toUpperCase();
    const apiVersion = process.env.CASHFREE_API_VERSION || '2023-08-01';

    // Generate unique order ID
    const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderId = `RV26_${Date.now().toString().slice(-6)}_${uniqueSuffix}`;
    const sanitizedPhone = customerPhone.replace(/\D/g, '').slice(-10);
    const customerId = `CUST_${sanitizedPhone || Date.now()}`;

    // If Cashfree keys are not configured yet, return a mock session for seamless dev preview
    if (!appId || !secretKey) {
      console.warn('Cashfree API credentials not configured in environment variables. Using development simulation mode.');
      return res.status(200).json({
        mock: true,
        order_id: orderId,
        order_amount: Number(amount),
        order_currency: 'INR',
        payment_session_id: `mock_session_${orderId}`,
        customer_details: {
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: sanitizedPhone
        },
        order_meta: {
          pass_title: passTitle || 'ROBOVEDA 26 Pass',
          college: college || 'N/A'
        },
        message: 'Order created in preview simulation mode (Add CASHFREE_APP_ID & CASHFREE_SECRET_KEY in Vercel to activate live gateway).'
      });
    }

    const baseUrl = env === 'PRODUCTION'
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

    const orderPayload = {
      order_id: orderId,
      order_amount: Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: customerId,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: sanitizedPhone
      },
      order_meta: {
        return_url: returnUrl || `https://trc-rv.vercel.app/?order_id=${orderId}`
      },
      order_note: `ROBOVEDA'26 - ${passTitle || 'Pass Registration'} | ${customerName} (${college || 'SNIST'})`,
      order_tags: {
        pass_id: (passId || 'general').substring(0, 40),
        pass_title: (passTitle || 'Pass').substring(0, 40),
        college: (college || 'SNIST').substring(0, 40),
        branch: (branch || 'N/A').substring(0, 40),
        year: (year || 'N/A').substring(0, 20),
        team_name: (teamName || 'N/A').substring(0, 40)
      }
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-version': apiVersion,
        'x-client-id': appId,
        'x-client-secret': secretKey
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree Create Order Error:', data);
      return res.status(response.status).json({
        error: data.message || 'Failed to create order with Cashfree',
        details: data
      });
    }

    return res.status(200).json({
      order_id: data.order_id,
      payment_session_id: data.payment_session_id,
      order_status: data.order_status,
      order_amount: data.order_amount,
      order_currency: data.order_currency,
      customer_details: data.customer_details
    });
  } catch (error: any) {
    console.error('Internal Server Error in create-order:', error);
    return res.status(500).json({
      error: 'Internal Server Error while creating order',
      message: error?.message || 'Unknown error'
    });
  }
}
