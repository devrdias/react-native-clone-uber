import { StyleSheet } from 'react-native';
import Fonts from '../../Theme/Fonts';
import AppStyles from '../../Theme/AppStyles';

export default StyleSheet.create({
  container: {
    ...AppStyles.screen.container,
    margin: 30,
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55,
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
});
