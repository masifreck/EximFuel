import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SelectButton from '../components/SelectButton';
import FGLoadingCard from '../components/FGLoadingCard';
import FirstPage from '../components/FGLoading/FirstPage';

const FGLoadingEntry = () => {
  const [selected, setSelected] = useState(true);

  const handleSelection = (value) => {
    setSelected(value);
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <SelectButton onSelect={handleSelection} 
       isFirstSelected={selected}
      />
   
      <FGLoadingCard
  imageSource={require('../assets/rcfrontnew.jpg')}
  imageOpacity={0.1} // You can adjust opacity here
>
<FirstPage/>
</FGLoadingCard>

    </View>
  );
};

export default FGLoadingEntry;
