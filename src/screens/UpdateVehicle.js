import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';
import useApiToken from '../components/Token';

const UpdateVehicle = () => {
  const route = useRoute();
  const [apiTokenReceived, setapiTokenReceived] = useState(null);
  AsyncStorage.getItem('Token')
    .then(token => {
      setapiTokenReceived(token);
      console.log('Retrieved token:', token);
    })
    .catch(error => {
      const TokenReceived = useApiToken();
      setapiTokenReceived(TokenReceived);
      console.log('Received token', apiTokenReceived);
      console.log('Error retrieving token:', error);
    });
  const {vehicleDetails} = route.params;
  const FetchVehicleDetails = vehicleDetails.apiResult.Result;
  // console.log(FetchVehicleDetails);
  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [id, setid] = useState(FetchVehicleDetails.Id);
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState(
    FetchVehicleDetails.VehicleNo,
  );
  const [chassisNumber, setChassisNumber] = useState(
    FetchVehicleDetails.ChassicNo,
  );
  const [engineNumber, setEngineNumber] = useState(
    FetchVehicleDetails.EngineNo,
  );
  const [pollution, setPollution] = useState(FetchVehicleDetails.PollutionNo);
  const [fitness, setFitness] = useState(FetchVehicleDetails.FitnessNo);
  const [permit, setPermit] = useState(FetchVehicleDetails.StatePermitNo);
  const [VehicleTyres, setVehicleTyres] = useState(
    FetchVehicleDetails.VehicleTyre.toString(),
  );
  const [roadTax, setRoadTax] = useState(FetchVehicleDetails.RoadTaxNo);

  const [PanNumber, setPanNumber] = useState();
  const [OwnerData, setOwnerData] = useState([]);
  const [ownerNameSelected, setOwnerNameSelected] = useState(
    FetchVehicleDetails.OwnerId,
  );
  const owner_name = FetchVehicleDetails.OwnerName;

  useEffect(() => {
    console.log(ownerNameSelected);
  }, [ownerNameSelected]);
  // dummy=========
  const [IsLoading, setIsLoading] = useState(true);
  const [is_everything_ok, setis_everything_ok] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://Exim.Tranzol.com/api/OwnerApi/GetOwnerListByName?search=${PanNumber}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${apiTokenReceived}`,
            clientId: 'TRANZOLBOSS',
            clientSecret: 'TRANZOLBOSSPAN',
          },
          redirect: 'follow',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.apiResult.Result) {
        const formattedData = result.apiResult.Result.map(owner => ({
          label: owner.OwnerName,
          value: owner.Id,
        }));

        setOwnerData(formattedData);
        // console.log('formatted data is here', formattedData);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.log('Error fetching owner data:', error);
    }
  };

  useEffect(() => {
    if (PanNumber) {
      console.log('after fetching', ownerNameSelected);
      fetchData();
    }
  }, [PanNumber]);

  // ========================

  const registertheVehicle = () => {
    setIsLoading(true);
    const postData = {
      Id: id,
      OwnerId: ownerNameSelected,
      VehicleTyre: VehicleTyres,
      VehicleNo: vehicleRegistrationNo,
      ChassicNo: chassisNumber,
      EngineNo: engineNumber,
      PollutionNo: pollution,
      FitnessNo: fitness,
      StatePermitNo: permit,
      RoadTaxNo: roadTax,
    };
    console.log('posting data is here', postData);
    const url = 'https://Exim.Tranzol.com/api/VehicleApi/CreateVehicle';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiTokenReceived}`,
        clientId: 'TRANZOLBOSS',
        clientSecret: 'TRANZOLBOSSPAN',
      },
      redirect: 'follow',
      body: JSON.stringify(postData),
    };
    fetch(url, requestOptions)
      .then(response => {
        setIsLoading(false);
        if (!response.ok) {
          setIsLoading(false);
          const error = 'Network response was not ok';
          setErrorMessage(error);
          setShowAlert(true);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        if (data.apiResult.Result !== null) {
          const errorMessage = 'Update Successfull!';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else if (data.apiResult.Error === null) {
          const errorMessage = 'Something Went Wrong!';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        } else {
          const errorMessage = 'Fill Mandatory Fields';
          setErrorMessage(errorMessage);
          setShowAlert(true);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error:', error);
        setErrorMessage('Network Error');
        setShowAlert(true);
      });
  };
  const closeAlert = () => {
    // Function to close the alert
    setShowAlert(false);
    redirect();
  };
  const redirect = () => {
    navigation.navigate('Vehicle');
  };

  useEffect(() => {
    // Check if apiTokenReceived is not null
    if (apiTokenReceived !== null) {
      setIsLoading(false);
      setis_everything_ok(true);
    }
  }, [apiTokenReceived]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (is_everything_ok === false) {
        // Redirect to home page if is_everything_ok is still false after 45 seconds
        console.log('Redirecting to home page...');
        setErrorMessage('Unexpected Error! Login Agian');
        setShowAlert(true);
      }
    }, 45000); // 45 seconds in milliseconds

    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when is_everything_ok changes
  }, [is_everything_ok]);

  return (
    <ScrollView style={{backgroundColor: '#edeef2'}}>
      {IsLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.levelContainer}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 8,
                marginTop: 8,
                color: '#453D98ff',
                textAlign: 'center',
                fontFamily: 'PoppinsBold',
              }}>
              Vehicle Details
            </Text>

            <Text style={styles.MandatoryText}>
              Mandatory Fields<Text style={{color: 'red'}}>*</Text>
            </Text>

            <Text style={styles.levelText}>
              Vehicle Registration No <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '85%',
                  marginRight: 20,
                }}
                placeholder={'Enter Vehicle Registration No'}
                autoCorrect={false}
                value={vehicleRegistrationNo}
                editable={false}
                onChangeText={text => setVehicleRegistrationNo(text)}
              />
            </View>

            <Text style={styles.levelText}>
              Owner Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color: 'black'}}
              data={OwnerData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={owner_name}
              searchPlaceholder="Enter Owner Name"
              value={ownerNameSelected}
              onChange={item => {
                setOwnerNameSelected(item.value);
              }}
              onChangeText={text => setPanNumber(text)}
            />
            <Text style={styles.levelText}>
              VehicleTyres <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Vehicle Tyres'}
                autoCorrect={false}
                value={VehicleTyres} // Convert number to string here
                onChangeText={text => setVehicleTyres(text)}
              />
            </View>

            <Text style={styles.levelText}>Chassis Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Enter Chassis Number'}
                autoCorrect={false}
                value={chassisNumber}
                onChangeText={text => setChassisNumber(text)}
              />
            </View>

            <Text style={styles.levelText}>Engine Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Engine Number'}
                autoCorrect={false}
                value={engineNumber}
                onChangeText={text => setEngineNumber(text)}
              />
            </View>
            <Text style={styles.levelText}>Pollution</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Pollution'}
                autoCorrect={false}
                value={pollution}
                onChangeText={text => setPollution(text)}
              />
            </View>
            <Text style={styles.levelText}>Fitness</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Fitness'}
                autoCorrect={false}
                value={fitness}
                onChangeText={text => setFitness(text)}
              />
            </View>
            <Text style={styles.levelText}>State Permit No</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'State Permit No'}
                autoCorrect={false}
                value={permit}
                onChangeText={text => setPermit(text)}
              />
            </View>

            <Text style={styles.levelText}>Road Tax</Text>
            <View style={[styles.inputContainer, {marginBottom: 20}]}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  color: 'black',
                  fontSize: 15,
                  width: '100%',
                }}
                placeholder={'Road Tax'}
                autoCorrect={false}
                value={roadTax}
                onChangeText={text => setRoadTax(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={registertheVehicle}>
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
      <CustomAlert
        visible={showAlert}
        message={errorMessage}
        onClose={closeAlert}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: '#cedff0',
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    // paddingLeft:8,
    color: '#6c6f73',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#6c6f73',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: '#6c6f73',
    // fontFamily:"PoppinsMedium"
  },

  container: {
    alignItems: 'center',
    // justifyContent:'center',
    flex: 1,
    flexDirection: 'column',
  },
  levelContainer: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    borderRadius: 15,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  levelText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },
  MandatoryText: {
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: '5%',
    color: 'black',
    fontSize: 10,
    fontFamily: 'PoppinsRegular',
  },
  imgContainer: {
    height: 110,
    width: 110,
    marginTop: 20,
    marginBottom: 10,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  Uploadimg: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  inputContainer: {
    height: 50,
    width: '90%',
    backgroundColor: '#cedff0',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    // borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'black',
    alignSelf: 'center',
    // fontFamily:"PoppinsBold"
  },
  rightIcon: {
    height: 20,
    width: 20,
  },
  button: {
    backgroundColor: '#453D98ff',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
    height: 50,
    width: '90%',
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: '58%', // Center vertically
    left: '39%', // Center horizontally
    transform: [{translateX: -50}, {translateY: -50}], // Center both horizontally and vertically
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    shadowColor: 'black', // Set shadow color to blue
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10, // This is for Android
  },
  rightIcon: {
    height: 15,
    width: 15,
  },
  wrongIcon: {
    height: 15,
    width: 15,
    tintColor: 'red',
  },
});

export default UpdateVehicle;
