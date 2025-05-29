import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { darkBlue } from './constant';
const CustomOTPVerify = ({ onVerify ,onResend ,isVloading}) => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length === 4) {
      onVerify(finalOtp); // send OTP to parent
    } else {
      alert('Please enter complete 6-digit OTP');
    }
  };

const handleResend = () => {
  setOtp(new Array(4).fill(''));
  inputRefs.current[0]?.focus();
  setTimer(60);
  setIsResendDisabled(true);
  
  console.log('Resend OTP triggered');
  onResend(); // 🔁 This will call your resend OTP logic in parent
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
  key={index}
  style={styles.inputBox}
  keyboardType="number-pad"
  maxLength={1}
  ref={(ref) => (inputRefs.current[index] = ref)}
  onChangeText={(text) => handleChange(text, index)}
  onKeyPress={({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  }}
  value={otp[index]}
/>

        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        {isVloading?(
          <ActivityIndicator size="small" color="#fff"/>
        ):(
        <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {isResendDisabled ? (
          <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomOTPVerify;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    color: '#333',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
  },
  inputBox: {
    width: 45,
    height: 45,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: darkBlue,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    color: darkBlue,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#999',
  },
});
