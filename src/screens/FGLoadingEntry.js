import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SelectButton from '../components/SelectButton';
import FGLoadingCard from '../components/FGLoadingCard';

const FGLoadingEntry = () => {
  const [selected, setSelected] = useState('E-Challan');

  const handleSelection = (value) => {
    setSelected(value);
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <SelectButton onSelect={handleSelection} />
      <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 18 }}>
        Selected: {selected}
      </Text>
      <FGLoadingCard
  imageSource={require('../assets/rcfrontnew.jpg')}
  imageOpacity={0.1} // You can adjust opacity here
>

</FGLoadingCard>

    </View>
  );
};

export default FGLoadingEntry;
