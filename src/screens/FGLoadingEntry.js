import React, { useState } from 'react';
import { View } from 'react-native';
import SelectButton from '../components/SelectButton';

import BaseCard from '../FGLoading/BaseCard';

const FGLoadingEntry = () => {
  const [selected, setSelected] = useState(true);
  const [vehicleNo, setVehicleNo] = useState('');

  const vehicleOptions = [
    { label: 'MH12AB1234', value: 'MH12AB1234' },
    { label: 'MH13CD5678', value: 'MH13CD5678' },
    { label: 'MH14EF9012', value: 'MH14EF9012' },
  ];

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
  

      <BaseCard
        Key="Vehicle No"
        value={vehicleNo}
        isEditable={selected}
        dropDownData={vehicleOptions}
        onSelect={setVehicleNo}
      />

      
    </View>
  );
};

export default FGLoadingEntry;
