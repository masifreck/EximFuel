import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StepIndicator = ({ isFirstStep, isStep1Visible, isStep3 }) => {
  const bgColor3 = (isStep1Visible || isStep3) ? 'limegreen' : 'grey';
  const bgColor4 = isStep3 ? 'limegreen' : 'grey';

  return (
    <View style={styles.container}>
      {/* Step 1 */}
      <View style={[styles.circle, { borderColor: 'limegreen' }]}>
        {isFirstStep ? (
          <Text style={styles.stepText}>1</Text>
        ) : (
          <Image style={styles.checkIcon} source={require('../assets/check-mark.png')} />
        )}
      </View>

      {/* Line 1 */}
      <View style={[styles.line, { backgroundColor: bgColor3 }]} />

      {/* Step 2 */}
      <View style={[styles.circle, { borderColor: bgColor3 }]}>
        {isStep3 ? (
          <Image style={styles.checkIcon} source={require('../assets/check-mark.png')} />
        ) : (
          <Text style={styles.stepText}>2</Text>
        )}
      </View>

      {/* Line 2 */}
      <View style={[styles.line, { backgroundColor: bgColor4 }]} />

      {/* Step 3 */}
      <View style={[styles.circle, { borderColor: bgColor4 }]}>
        <Text style={styles.stepText}>3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 30,
    height: 6,
  },
  stepText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 25,
  },
  checkIcon: {
    width: 30,
    height: 30,
  },
});

export default StepIndicator;
