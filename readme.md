# XPay Fusion

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

