import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { PrintMinesData } from '../components/DropDownData';

const PrintMines = ({ navigation ,route }) => {
    const { rowData } = route.params;
    console.log('Row Data:', rowData);
  const [selectedPrint, setSelectedPrint] = useState("1");

const handlePrint = () => {
  navigation.navigate('minesQRCode', {
    qrValue: `${rowData.TpNo}`, 
    fetchedData: rowData,
    selectedPrint: selectedPrint,
  });
};


  return (
    <View style={{ alignItems: "center", marginTop: 20 ,justifyContent: 'center',marginTop:'auto',marginBottom:'auto'}}>
<Dropdown
  style={styles.dropdown}
  containerStyle={styles.dropdownContainer}
  placeholderStyle={{ color: '#888' }}
  selectedTextStyle={{ color: 'black', fontWeight: 'bold' }}
  itemTextStyle={{ color: 'black' }}
  data={PrintMinesData}
  search
  maxHeight={400}
  labelField="label"
  valueField="value"
  placeholder="Select Option"
  value={selectedPrint}
  onChange={(item) => {
    if (item?.value !== selectedPrint) {
      setSelectedPrint(item.value); // ✅ avoid unnecessary state updates
    }
  }}
/>


      <TouchableOpacity style={styles.button}
     onPress={handlePrint}
      >
        <Text style={styles.text}>
            PRINT
        </Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>
            SHARE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#453D98',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderRadius: 8,
    borderColor: '#453D98',
    borderWidth: 1,
  },

    button: {
        backgroundColor: '#453D98',
        marginTop: 20,
        height: 50,
        width: '80%',
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
});

export default PrintMines;
