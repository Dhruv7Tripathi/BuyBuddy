declare module 'razorpay' {
  interface RazorpayOptions {
    key_id: string;
    key_secret: string;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    orders: {
      create(params: any): Promise<any>;
    };
    payments: {
      capture(paymentId: string, amount: number): Promise<any>;
    };
  }

  export = Razorpay;
}
