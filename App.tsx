import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import axios from 'axios';

import {
  XPayProvider,
  PaymentElement,
} from '@xstak/xpay-element-react-native-stage';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    color: 'white',
  },
});

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const payNow = async () => {
    setLoading(true);
    let customer = {name: 'guest user'};
    try {
      const clientSecret = await axios.get(
        'http://localhost:4242/create-payment-intent',
      );
      const {message} = await PaymentElement.confirmPayment(
        clientSecret.data.clientSecret,
        customer,
      );
      Alert.alert('Payment Sucsess', message);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      Alert.alert('Payment Failed', error?.message);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <XPayProvider
        xpay={{
          publishableKey: '',
          hmacSecret: '',
          accountId: '',
        }}>
        <PaymentElement
          onReady={(data: {
            complete: boolean | ((prevState: boolean) => boolean);
          }) => {
            setEnabled(data.complete);
            console.log(data.complete);
          }}
        />
      </XPayProvider>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#646cff',
          padding: '5%',
          borderRadius: 12,
          marginBottom: 20,
          marginTop: 10,
        }}
        disabled={!enabled}
        onPress={() => payNow()}>
        <Text style={styles.baseText}>
          {!loading ? 'Pay Now' : <ActivityIndicator color="white" />}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#646cff',
          padding: '5%',
          borderRadius: 12,
        }}
        onPress={() => PaymentElement.clear()}>
        <Text style={styles.baseText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;
