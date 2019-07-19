import { StyleSheet } from 'react-native';
import AppStyles from '../../Theme/AppStyles';

export default StyleSheet.create({
  container: {
    ...AppStyles.screen.container,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 3,
    padding: 10,
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  coinSymbol: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    fontWeight: 'bold',
  },
  coinName: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20,
  },
  seperator: {
    marginTop: 10,
  },
  coinPrice: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 35,
    height: 35,
  },
  moneySymbol: {
    fontWeight: 'bold',
  },
  percentChangePlus: {
    color: '#007800',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  percentChangeMinus: {
    color: '#DD2C00',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
