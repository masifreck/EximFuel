// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
// } from 'react-native';
// import React, {useState} from 'react';
// import Uploading from './Uploading';

// const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

// const Step3 = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.levelContainer}>
//         <Text
//           style={{
//             fontSize: 18,
//             marginBottom: 8,
//             marginTop: 8,
//             color: darkBlue,
//             textAlign: 'center',
//             fontFamily: 'PoppinsBold',
//           }}>
//           Upload Documents
//         </Text>

//         <Text style={styles.levelText}>Vehicle Front With Driver</Text>
//         <View style={styles.inputContainer}>
//           <Uploading
//             progress={0.8}
//             width={deviceWidth * 0.6}
//             color={darkBlue}
//             borderColor={darkBlue}
//           />

//           <TouchableOpacity onPress={() => {}}>
//             <Image
//               style={styles.rightIcon}
//               source={require('../assets/upload-file.png')}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.levelText}>Vehicle Back</Text>
//         <View style={styles.inputContainer}>
//           <Uploading
//             progress={0.8}
//             width={deviceWidth * 0.6}
//             color={darkBlue}
//             borderColor={darkBlue}
//           />

//           <TouchableOpacity onPress={() => {}}>
//             <Image
//               style={styles.rightIcon}
//               source={require('../assets/upload-file.png')}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.levelText}>Vehicle Left</Text>
//         <View style={styles.inputContainer}>
//           <Uploading
//             progress={0.8}
//             width={deviceWidth * 0.6}
//             color={darkBlue}
//             borderColor={darkBlue}
//           />

//           <TouchableOpacity onPress={() => {}}>
//             <Image
//               style={styles.rightIcon}
//               source={require('../assets/upload-file.png')}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.levelText}>Vehicle Right</Text>
//         <View style={styles.inputContainer}>
//           <Uploading
//             progress={0.8}
//             width={deviceWidth * 0.6}
//             color={darkBlue}
//             borderColor={darkBlue}
//           />

//           <TouchableOpacity onPress={() => {}}>
//             <Image
//               style={styles.rightIcon}
//               source={require('../assets/upload-file.png')}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.levelText}>Driver Photo</Text>
//         <View style={[styles.inputContainer, {marginBottom: 30}]}>
//           <Uploading
//             progress={0.8}
//             width={deviceWidth * 0.6}
//             color={darkBlue}
//             borderColor={darkBlue}
//           />

//           <TouchableOpacity onPress={() => {}}>
//             <Image
//               style={styles.rightIcon}
//               source={require('../assets/upload-file.png')}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     // justifyContent:'center',
//     flex: 1,
//     flexDirection: 'column',
//   },
//   levelContainer: {
//     backgroundColor: '#fcfafb',
//     width: '90%',
//     margin: 10,
//     borderRadius: 15,
//     borderWidth: 0.5,
//     borderColor: 'gray',
//   },
//   levelText: {
//     alignItems: 'flex-start',
//     padding: 5,
//     marginLeft: '5%',
//     color: 'black',
//     fontSize: 13,
//     fontFamily: 'PoppinsMedium',
//   },
//   Uploadimg: {
//     height: 30,
//     width: 30,
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//   },
//   inputContainer: {
//     height: 50,
//     width: '90%',
//     backgroundColor: '#cedff0',
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     // borderWidth: 0.5,
//     alignItems: 'center',
//     borderColor: 'black',
//     alignSelf: 'center',
//     // fontFamily:"PoppinsBold"
//   },
//   rightIcon: {
//     height: 30,
//     width: 30,
//     margin: '15%',
//   },
// });

// export default Step4;
