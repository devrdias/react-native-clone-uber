import { StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';
import AppStyles from '../../Theme/AppStyles';

export default StyleSheet.create({
  container: {
    ...AppStyles.screen.container,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.defaultBackground,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    backgroundColor: Colors.defaultBackground,
  },
  imageLogo: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75,
  },
});
