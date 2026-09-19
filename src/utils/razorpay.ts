// Razorpay Standard Web Checkout Integration for ROBOVEDA'26

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch?: string;
  year?: string;
  teamName?: string;
  teamMembers?: string;
  rollNumber?: string;
}

export interface OrderCreationParams {
  amount: number; // in INR
  passId: string;
  passTitle: string;
  customer: CustomerDetails;
}

export interface RazorpayOrderResponse {
  order_id: string;
  amount: number; // in paise
  currency: string;
  key_id: string;
  receipt?: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  order_id: string;
  payment_id: string;
  transaction_id: string;
  order_status: string;
  payment_status: 'SUCCESS' | 'FAILED';
  payment_time: string;
  message?: string;
}

/**
 * Dynamically loads the official Razorpay Checkout script (https://checkout.razorpay.com/v1/checkout.js)
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay checkout script.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Calls backend /api/create-order to create a Razorpay order
 */
export const createRazorpayOrder = async (params: OrderCreationParams): Promise<RazorpayOrderResponse> => {
  const payload = {
    amount: params.amount,
    passId: params.passId,
    passTitle: params.passTitle,
    customerName: params.customer.name,
    customerEmail: params.customer.email,
    customerPhone: params.customer.phone,
    college: params.customer.college,
    branch: params.customer.branch,
    year: params.customer.year,
    teamName: params.customer.teamName,
    teamMembers: params.customer.teamMembers
  };

  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || errData.message || `Server returned ${response.status}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Calls backend /api/verify-payment to verify HMAC-SHA256 signature
 */
export const verifyRazorpayPayment = async (verificationData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<PaymentVerificationResult> => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(verificationData)
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Payment signature verification failed.');
  }

  return data;
};

/**
 * Triggers the Razorpay Standard Checkout modal
 */
export const triggerRazorpayCheckout = async ({
  order,
  passTitle,
  customer,
  onSuccess,
  onFailure
}: {
  order: RazorpayOrderResponse;
  passTitle: string;
  customer: CustomerDetails;
  onSuccess: (result: PaymentVerificationResult) => void;
  onFailure: (error: any) => void;
}) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || !window.Razorpay) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    const keyId =
      order.key_id ||
      (import.meta as any).env?.VITE_RAZORPAY_KEY_ID ||
      'rzp_test_TdmeWie4roD4or';

    const options = {
      key: keyId,
      amount: order.amount, // in paise
      currency: order.currency || 'INR',
      name: "ROBOVEDA'26 — ASCENSION",
      description: passTitle || "ROBOVEDA'26 Registration Pass",
      image: '/img/favicon.ico',
      order_id: order.order_id,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone
      },
      notes: {
        college: customer.college,
        branch: customer.branch || 'N/A',
        year: customer.year || 'N/A',
        team_name: customer.teamName || 'N/A'
      },
      theme: {
        color: '#d4af37' // RoboVeda signature gold
      },
      modal: {
        ondismiss: function () {
          onFailure(new Error('Payment checkout was cancelled by user.'));
        }
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // Verify signature on the backend
          const verificationResult = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          onSuccess(verificationResult);
        } catch (verifyErr: any) {
          console.error('Signature verification failed:', verifyErr);
          onFailure(verifyErr);
        }
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response: any) {
      console.error('Razorpay Payment Failed:', response.error);
      onFailure(new Error(response.error?.description || 'Payment transaction failed.'));
    });

    rzp.open();
  } catch (err: any) {
    console.error('Error opening Razorpay checkout:', err);
    onFailure(err);
  }
};
