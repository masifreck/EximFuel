
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,TextInput,Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Searching from '../components/Searching';
// import {TextInput} from 'react-native-gesture-handler';
//import {useNavigation} from '@react-navigation/native';
import { darkBlue } from '../components/constant';
//import { useNavigation } from "@react-navigation/native";
const NewMinesMainScreen = ({navigation}) => {
    const [tpno,settpno]=useState('')
    const [loading, setLoading] = useState(false);
 // const navigation = useNavigation();
    const fetchLoadingRowMetrial = async (tpno) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/LoadingChallan/GetLoadingRowMetrial?tpno=${tpno}`
      );
      const result = await response.json();

      if (result?.data) {
        // ✅ Success: Navigate with data
        navigation.navigate("LoadingRowDetails", { rowData: result.data });
      } else {
        // ❌ Fail
        Alert.alert("Error", "No data found for this TPNo.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
      const UpdateLoadingRowMetrial = async (tpno) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/LoadingChallan/GetLoadingRowMetrial?tpno=${tpno}`
      );
      const result = await response.json();

      if (result?.data) {
        // ✅ Success: Navigate with data
        navigation.navigate("updateMinesLoading", { rowData: result.data });
      } else {
        // ❌ Fail
        Alert.alert("Error", "No data found for this TPNo.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
        const PrintLoadingRowMetrial = async (tpno) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/LoadingChallan/GetLoadingRowMetrial?tpno=${tpno}`
      );
      const result = await response.json();

      if (result?.data) {
        // ✅ Success: Navigate with data
        navigation.navigate("printmines", { rowData: result.data });
      } else {
        // ❌ Fail
        Alert.alert("Error", "No data found for this TPNo.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    {loading ? 
       (
        <Searching />
       ):(

 
<ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30%', 
          marginBottom: 20,
        }}>
        <View
          style={{
            height: 200,
            width: '50%',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: 'black', // Set shadow color to blue
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 10, // This is for Android
          }}>
          <Image
            source={require('../assets/mine-loading.png')}
            style={{
              height: 200,
              width: '100%',
              backgroundColor: darkBlue,
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              borderWidth: 0,
              borderColor: 'transparent',
              backgroundColor: '#9894e6',
            },
          ]}>
          <Image
            style={styles.leftIcon}
            source={require('../assets/id-card.png')}
          />
          <TextInput
            placeholderTextColor={'black'}
            style={{
              paddingTop: 13,
              paddingLeft: 30,
              letterSpacing: 0.5,
              color: 'black',
              fontSize: 15,
              width: 250,
              fontFamily: 'PoppinsSemiBold',
            }}
            placeholder={'Enter TP Number'}
            autoCorrect={false}
            value={tpno}
            maxLength={20}
            onChangeText={text => settpno(text)}
            autoCapitalize = {"characters"}
            // onChangeText={handleUserIdChange}
          />
        </View>

           <TouchableOpacity
          style={[styles.button, { marginTop: 30 }]}
          onPress={() => fetchLoadingRowMetrial(tpno)}   // ✅ Call API here
        >
          <Text style={styles.text}>Show Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => UpdateLoadingRowMetrial(tpno)} 
          >
          <Text style={styles.text}>Update Details</Text>
        </TouchableOpacity>
 <TouchableOpacity
          style={styles.button}
         onPress={() => PrintLoadingRowMetrial(tpno)} 
          >
          <Text style={styles.text}>Print & Share</Text>
        </TouchableOpacity>

        <View                                                                                                                
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'PoppinsMedium',
            }}>
            If Not Registered !{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewMinesLoading');
            }}>
            <Text
              style={{
                color: darkBlue,
                fontSize: 14,
                // fontWeight: '500',
                fontFamily: 'PoppinsBold',
              }}>
              Click Here to Register.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

  
    
  
    </ScrollView>
          )
    }
    </>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    width: 300,
    backgroundColor: '#9894e6',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    height: 25,
    width: 25,
    margin: 10,
    tintColor: 'black',
  },
  button: {
    backgroundColor: darkBlue,
    marginBottom: 20,
    height: 50,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  toastContainer: {
    borderRadius: 5,
    //position: 'absolute',
    // bottom: '26%', // Center vertically
    // left: '26%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}],
  },
  toastText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
});

export default NewMinesMainScreen