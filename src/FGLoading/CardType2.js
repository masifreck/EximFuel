import React from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkBlue, inpurtbgcolor2, inputbgColor, textColor } from '../components/constant';
import { is } from 'date-fns/locale';

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
      return 'arrow-up';
    case 'unloading':
      return 'arrow-down';
    case 'consignor':
      return 'industry';
    case 'consignee':
      return 'building';
    case 'material':
      return 'archive';
    case 'account number':
      return 'bank';            
    case 'ifsc code':
      return 'code';            
    case 'bank name':
      return 'university';   
      case 'dl no':
  return 'id-badge';
case 'driver':
  return 'user-circle';
    default:
      return 'info-circle';
  }
};



const CardType2 = ({ heading, title, value ,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius,isNVerify}) => {
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
        {isNVerify && (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>VERIFY</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: inputbgColor,
    paddingHorizontal: 8,
    padding: 6,
   
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
    flex: 1,
  },
  btn:{
    padding:8,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    width:50,
   // backgroundColor:'yellow',
    marginRight:-20
  },
  btnText:{
    color:'red',
    fontWeight:'bold',
    fontSize:12
  }
});

export default CardType2;
