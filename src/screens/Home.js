import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {ScrollView} from 'react-native-gesture-handler';
import Header from '../components/Header';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  useEffect(() => {
    getUserID();
  }, []);

  const [userId, setUserid] = useState('');

  const getUserID = async () => {
    const userId = await AsyncStorage.getItem('username');
    setUserid(userId);
  };

  const data = [
    {label: 'Owner', value: 'ShowOwnerDetails'},
    {label: 'Driver', value: 'ShowDriverDetails'},
    {label: 'Vehicle', value: 'ShowVehicleDetails'},
    {label: 'Chalan', value: 'NewChalan'},
  ];
  const [value, setValue] = useState(null);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f1f5ff',
        marginBottom: 70,
      }}>
      <Header />
      <ScrollView>
        <View style={{height: 180}}>
          <LinearGradient
            colors={['#453D98ff', '#453D98ff']}
            style={styles.searchBarLevel}>
            <Text style={styles.welcomeTxt}>WELCOME</Text>
            <Text style={styles.name}>{userId}</Text>
          </LinearGradient>

          <View style={styles.searchBar}>
            <View style={{backgroundColor: '#453D98ff', width: '35%'}}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: 'black'}}
                data={data}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={'Select'}
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={{width: '50%'}}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={{
                  marginLeft: 8,
                  color: 'black',
                  fontSize: 16,
                  width: '90%',
                }}
                placeholder={'Search'}
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                onSearch;
              }}
              style={{}}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  margin: 10,
                }}
                source={require('../assets/search.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',

            marginTop: 20,
            marginHorizontal: 15,
          }}>
          <Card
            text={'Owner'}
            imageSource={require('../assets/woner.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('OwnerDetails');
            }}
          />
          <Card
            text={'Driver'}
            imageSource={require('../assets/truck-driver.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('Driver');
            }}
          />
          <Card
            text={'Vehicle'}
            imageSource={require('../assets/Truck.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('Vehicle');
            }}
          />
          <Card
            text={'Mines Loading'}
            imageSource={require('../assets/mine-loading.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('MinesLoading');
            }}
          />
          <Card
            text={'FG Loading'}
            imageSource={require('../assets/FG-loading.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('FGLoading');
            }}
          />
          <Card
            text={'Unloading'}
            imageSource={require('../assets/unloading.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('Unloading');
            }}
          />
          <Card
            text={'Print Challan'}
            imageSource={require('../assets/gg.png')}
            color={['#ffffff', '#ffffff', '#ffffff']}
            onPress={() => {
              navigation.navigate('PrintChallan');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'white',
    width: '90%',
    height: 50,
    position: 'absolute',
    left: '5%',
    top: 150,
    borderRadius: 20,
    borderColor: 'gray',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    display: 'none',
  },
  searchBarLevel: {
    height: 160,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  welcomeTxt: {
    fontFamily: 'PoppinsExtraBold',
    fontSize: 38,
    paddingLeft: 15,
    color: 'white',
    letterSpacing: 5,
  },
  name: {
    fontSize: 20,
    fontFamily: 'PoppinsaBold',
    paddingLeft: 25,
    marginBottom: 20,
    color: 'white',
    letterSpacing: 1,
  },
  dropdown: {
    height: '100%',
    width: '85%',
    marginLeft: 20,
    backgroundColor: '#453D98ff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Home;
