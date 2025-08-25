import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkBlue } from '../components/constant';
const Home = () => {
  const navigation = useNavigation();
  const [userId, setUserid] = useState('');
  const [value, setValue] = useState(null);

  const cardAnimations = useRef(
    Array.from({length: 7}, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    getUserID();

    const animations = cardAnimations.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 1000,
        delay: index * 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    );

    Animated.stagger(130, animations).start();
  }, []);

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

  const cardData = [
    {text: 'Owner', image: require('../assets/woner.png'), screen: 'OwnerDetails'},
    {text: 'Driver', image: require('../assets/truck-driver.png'), screen: 'Driver'},
    {text: 'Vehicle', image: require('../assets/Truck.png'), screen: 'Vehicle'},
    {text: 'Raw Material', image: require('../assets/mine-loading.png'), screen: 'minesmainScreen'},
    {text: 'FG Loading', image: require('../assets/FG-loading.png'), screen: 'FGNavigation'},
    {text: 'Unloading', image: require('../assets/unloading.png'), screen: 'Unloading'},
    {text: 'Print Challan', image: require('../assets/gg.png'), screen: 'PrintChallan'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView>
        <View style={{height: 180}}>
          <LinearGradient
            colors={[darkBlue, darkBlue]}
            style={styles.searchBarLevel}>
            <Text style={styles.welcomeTxt}>WELCOME</Text>
            <Text style={styles.name}>{userId}</Text>
          </LinearGradient>

          <View style={styles.searchBar}>
            <View style={{backgroundColor: darkBlue, width: '35%'}}>
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
                onChange={item => setValue(item.value)}
              />
            </View>
            <View style={{width: '50%'}}>
              <TextInput
                placeholderTextColor={'#6c6f73'}
                style={styles.textInput}
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
                style={styles.searchIcon}
                source={require('../assets/search.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {cardData.map((item, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: cardAnimations[index],
                transform: [
                  {
                    translateY: cardAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              }}>
              <Card
                text={item.text}
                imageSource={item.image}
                color={['#ffffff', '#ffffff', '#ffffff']}
                onPress={() => navigation.navigate(item.screen)}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5ff',
    marginBottom: 70,
  },
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
    backgroundColor: darkBlue,
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
  textInput: {
    marginLeft: 8,
    color: 'black',
    fontSize: 16,
    width: '90%',
  },
  searchIcon: {
    height: 28,
    width: 28,
    margin: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default Home;
