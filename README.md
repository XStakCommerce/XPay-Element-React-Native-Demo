# XPay Fusion & React Native Apps Integration

XPay Fusion is a PCI DSS-compliant payment solution to collect payments from your customers on your webapp without them having to redirect to a third-party payment page.

## Integrating XPay Fusion

### To integrate XPay Fusion with your eCommerce store, you need to:

1. Integrate Fusion APIs on the server side and
2. Add the XPay embedded element on the client side by using the XPay React Native SDK.

### Step-by-step flow
1. When your customer comes to the checkout page, they enter their card details into the card details form rendered in secure fields, enabled by the XPay Embedded Element. They then click the Place Order button.

2. The Fusion Embedded Element can be added to your app as follows:

3. Import the XPay provider and Payment Element and add the required keys

```
npm i @xstak/xpay-element-react-native
// for live env.

npm i @xstak/xpay-element-react-native-stage
// for staging env.

<XPayProvider xpay={{publishableKey: '', hmacSecret: '', accountId: ''}}>
        <PaymentElement onReady={(data) => {setEnabled(data.complete); console.log(data.complete)}} onBin />
</XPayProvider>
```

Important: The XPay SDK supports custom styling and changing labels and placeholder texts of input fields as per your design to provide a seamless experience to your customers.

4. When the customer clicks on the Place Order button, the app requests your backend to start the payment processing by passing relevant details about the cart (cart ID, cart total, etc.) and the customer name. Since the order has not been created yet, it is recommended that the cart ID be used at this step.

5. Your backend receives this request from the app, creates a payment intent by calling the Create Payment Intent API, and returns the response to the app:

a. The cart ID should be added to the metadata object with the key order_reference and the Create Payment Intent call payload to reference it later. However, any other key or value can also be added to the metadata object.
b. Important: Payment Intent ID is the single source of truth in XPay Fusion and it will be used as a reference for the payment and any possible future actions such as refund, etc.

```
curl --location 'https://xstak-pay-stg.xstak.com/public/v1/payment/intent' \
--header 'x-account-id: your-account-id' \
--header 'x-api-key: secret-key-of-account' \
--header 'x-signature: HMAC-SHA 256 signature' \
--header 'Content-Type: application/json' \
--header 'x-idempotency-key: ' \
--data-raw '{
    "amount": 10,
    "currency": "PKR",
    "customer": {
        "name": "",
        "phone": "",
        "email": ""
    },
    "shipping": {
        "address1": "",
        "city": "",
        "country": "",
        "province": "",
        "zip": ""
    },
    "metadata": {
        "order_reference": ""
    }
}'

```

c. Payment intent client secret is included in the response of the Create Payment Intent call. This client secret will be needed to capture the payment and pass it into the confirmPayment SDK method, as shown below.

6. Once the app receives the payment intent from the backend, it will call the confirmPayment method of the XPay SDK and pass it the payment intent client secret.

```
const customer = {name: 'JOn Doe'}

const { message, error } = await PaymentElement.confirmPayment(payment_intent_client_secret, customer)
```

7. This confirmPayment SDK method will return a promise, which will be resolved with a response object citing either a success or failure message with the reason.

a. If successful, the app can request the backend to create the order. It is recommended that the backend retrieve the payment intent from XPay by calling the Retrieve Payment Intent API, verifying the payment information, and then creating the order and informing the user.

b. If unsuccessful, the app should show an error message to the customer.

c. You can also set up webhooks to get notified of payment status asynchronously.

# How to run this demo?

1. Clone the repo and install node modules
2. In the server file, add required keys and run this file via
   ```
   node server.js
   ```
This file refers to your server environment in demo mode. In the integration with your product, this API call will be done on your server. And create PI API call should always be done from the server side.
3. Run in iOS or Android mode.

#### Invariant Violation: requireNativeComponent: "RNCWebView" was not found in the UIManager

Please follow the following steps:

1. npx pod-install
2. npx react-native run-ios
3. 
After installing the package, you need to update pods and then run the project again.
