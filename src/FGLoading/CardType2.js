import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkBlue, inpurtbgcolor2, textColor } from '../components/constant';

const getIconName = (title = '') => {
  switch (title.toLowerCase()) {
    case 'vehicle no':
      return 'truck';
    case 'verification':
      return 'check-circle';
    case 'validity':
      return 'calendar';
    case 'name':
      return 'user';
    case 'address':
      return 'map-marker';
    case 'primary contact':
      return 'phone';
    case 'secondary contact':
      return 'phone-square';
    case 'pan no':
      return 'id-card';
    case 'loading':
      return 'arrow-up';        // icon for loading
    case 'unloading':
      return 'arrow-down';      // icon for unloading
    case 'consignor':
      return 'industry';        // icon for consignor
    case 'consignee':
      return 'building';        // icon for consignee
    case 'material':
      return 'archive';           // icon for material
    default:
      return 'info-circle';
  }
};


const CardType2 = ({ heading, title, value ,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius}) => {
  const iconName = getIconName(title);

  return (
    <View style={[styles.container,{ borderTopLeftRadius:borderTopLeftRadius, 
    borderTopRightRadius:borderTopRightRadius,borderBottomLeftRadius:borderBottomLeftRadius,borderBottomRightRadius:borderBottomRightRadius}]}>
      {heading && <Text style={styles.headingText}>{heading}</Text>}
      <View style={styles.row}>
        <View style={styles.left}>
          <Icon name={iconName} size={16} color={textColor} style={styles.icon} />
          <Text style={styles.keyText}>{title}</Text>
        </View>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: inpurtbgcolor2,
    paddingHorizontal: 8,
    padding: 4,
   
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headingText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: darkBlue,
    margin: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 6,
    width:18
  },
  keyText: {
    color: textColor,
    fontWeight: 'bold',
  },
  valueText: {
    color: textColor,
    fontWeight: 'bold',
    flex: 2,
  },
});

export default CardType2;
