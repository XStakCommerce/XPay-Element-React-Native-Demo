XPay Element for react native is an embedded payment system that allows you to collect payments directly from users within your applications. This package is highly customizable, enabling you to tailor the appearance and functionalities of the payment form to align seamlessly with your app's style and theme.

## **Features**

### **Seamless Payment Integration**

Easily integrate payment functionalities into your  app without redirecting users to external applications or pages.

### **Custom Styling**

Style the payment SDK according to your app's theme with customizable labels, placeholders, and more.

### **Embedded Authentication**

Conduct OTP authentication within your app, ensuring a smooth and secure user experience.

### **Event Handling**

Utilize built-in events such as onBinDiscount and onReady to dynamically manage changes and validate inputs.

## **Getting started**

To incorporate the XPay embedded payment system into your  application, start by adding the following dependency:

```dart
npm i @xstak/xpay-element-react-native
// for live env.

npm i @xstak/xpay-element-react-native-stage
// for staging env.
```

## **Usage**

To use the XPay SDK in your app, follow these steps:

### **Import the Package**

```jsx
import { XPayProvider, PaymentElement } from '@xstak/xpay-element-react-native';
```

### **Initialize the XPayProvider**

Add XPayProvider to the app UI using the necessary credentials available on your XPay dashboard:

```jsx
<XPayProvider xpay={{publishableKey: '', hmacSecret: '', accountId: ''}}>
        <PaymentElement />
</XPayProvider>
```

## **Custom Styling**

Customize the SDK's appearance to seamlessly integrate with your app's style and theme. The XPay SDK allows you to modify elements' style and appearance, making it adaptable to various design requirements.

```jsx
 const customStyle = {
    fields: {
      creditCard: {
        label: "Enter your credit card",
        placeholder: "1234 1234 1234 1234",
      },
      expiry: {
        label: "Expiry Date",
        placeholder: "MM/YY",
      },
      cvc: {
        label: "CVC",
        placeholder: "CVC",
      },
    },
    style: {
      label: {
        color: "#3c4257",
      },
      input: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        borderColor: "#e6e6e6",
      },
      invalid: {
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 5,
        color: "red",
      },
      onFocus: {
        borderColor: "#C8DBF9",
        color: "#3c4257",
      },
    },
  }
```

### **Applying the Custom Styles**

After configuring your styles, pass them to the XPayProvider to enhance the user interface:

```jsx
<XPayProvider xpay={{publishableKey: '', hmacSecret: '', accountId: ''}}>
        <PaymentElement options={customStyle} />
</XPayProvider>
```

The above styling properties are all optional; you can define only those you require, ensuring flexibility and customization according to your specific design needs.

## **Element Events**

Handle element-specific events to enhance the user experience:

### **onReady Event**

This event triggers when all form fields are valid and the form is ready for submission.

```jsx
<XPayProvider xpay={{publishableKey: '', hmacSecret: '', accountId: ''}}>
        <PaymentElement onReady={(data) => {setEnabled(data.complete)}} />
</XPayProvider>
```

### **onBinDiscount**

Receive data related to the card's BIN as the user inputs their card number, which can be used for implementing discounts or promotional offers.

```jsx
<XPayProvider xpay={{publishableKey: '', hmacSecret: '', accountId: ''}}>
        <PaymentElement onBinDiscount={(data) => {console.log(data)}} />
</XPayProvider>
```

## **Confirming Payment**

To proceed with the payment confirmation when all form fields are valid and the onReady event has returned true, you should perform a few necessary steps. First, ensure you have initiated a server-side API call to create a payment intent. This create intent API is responsible for generating the `clientSecret` , which are critical for securing the payment confirmation.

### **Server-Side Payment Intent Creation**

Before invoking the payment confirmation on the client side, your backend should call the create intent API to obtain:

`clientSecret`: A secret key used to initiate the payment process securely.

### **Confirming the Payment**

Once you have the necessary keys from your backend, use the PaymentElement to call the confirmPayment method. Here’s how you can implement this in your app:

```jsx
const confirmPayment = async() => {
     try {
    // Assuming 'PaymentElement' is from package
    const customer = {name: 'Jon Doe'}

		const { message, error } = await PaymentElement.confirmPayment("client_secret_from_intent_api", customer)

    if (error) {
      // Handle payment failure
      console.log("Payment failed: ", message);
    } else {
      // Handle payment success
      console.log("Payment successful: ", message);
    }
  } catch (e) {
    // Handle exceptions
    console.log("Payment Error: ", e);
  }
}
```

### **Confirm Payment Response**

The response from confirmPayment contains two keys:

`error`: A boolean that indicates whether the payment was unsuccessful. If true, it means the payment failed. `message`: A string containing a message from the server. This message provides details about the payment outcome or error information.

## **Clean Method**

The `clear` method is used to reset the payment form. This is especially useful if you have a button designed to clear the form or reset the checkout process.

```jsx
// Assuming 'PaymentElement' is imported from package
PaymentElement.clear();
```
