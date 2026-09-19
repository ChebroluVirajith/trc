// Vercel Serverless Function: api/create-order.ts
// Handles creation of Razorpay orders and returns order_id & amount in paise
declare const process: any;
declare const Buffer: any;

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
      amount, // Amount in INR (Rupees)
      customerName,
      customerEmail,
      customerPhone,
      passId,
      passTitle,
      college,
      branch,
      year,
      teamName,
      teamMembers
    } = req.body || {};

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TdmeWie4roD4or';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'agkEyZz9H4spVP9BNT3SGj7j';

    if (!keyId || !keySecret) {
      return res.status(401).json({
        error: 'Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
      });
    }

    // Convert amount in INR to Paise (1 INR = 100 Paise)
    const amountInRupees = Number(amount);
    const amountInPaise = Math.round(amountInRupees * 100);

    // Minimum amount: 100 paise (₹1.00)
    if (!amountInPaise || amountInPaise < 100) {
      return res.status(400).json({ error: 'Invalid amount. Minimum amount is ₹1.00 (100 paise).' });
    }

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'Customer name, email, and phone number are required.' });
    }

    const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const receipt = `rcpt_${Date.now().toString().slice(-6)}_${uniqueSuffix}`;

    const orderPayload = {
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        pass_id: String(passId || 'general').substring(0, 40),
        pass_title: String(passTitle || 'Pass').substring(0, 40),
        customer_name: String(customerName).substring(0, 40),
        customer_email: String(customerEmail).substring(0, 40),
        customer_phone: String(customerPhone).substring(0, 15),
        college: String(college || 'SNIST').substring(0, 40),
        branch: String(branch || 'N/A').substring(0, 40),
        year: String(year || 'N/A').substring(0, 20),
        team_name: String(teamName || 'N/A').substring(0, 40),
        team_members: String(teamMembers || 'N/A').substring(0, 80)
      }
    };

    // Direct official Razorpay REST API call with Basic Auth
    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay Order API Error:', data);
      return res.status(response.status).json({
        error: data.error?.description || data.message || 'Failed to create order with Razorpay',
        details: data
      });
    }

    return res.status(200).json({
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
      key_id: keyId,
      receipt: data.receipt,
      notes: data.notes
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      error: error?.error?.description || error?.message || 'Internal Server Error while creating order',
      details: error
    });
  }
}
