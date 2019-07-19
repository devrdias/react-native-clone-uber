import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  SafeAreaView,
} from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/Loading';
import { startup } from '../../redux/actions/startupActions';
import NavigationService from '../../services/NavigationService';
import Colors from '../../Theme/Colors';
import MainScreen from '~/containers/Main';
import SplashScreen from '../SplashScreen/SplashScreen';

/**
 * a root screen contem a navegacao do app
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */

// configuracao da Stack de navegacao
// aplicas-se a todas as rotas
const configureStack = {
  // Splash screen é exibida por default durante a execucao do startup() saga
  // ver definicao no arquivo StartupSaga.js
  initialRouteName: 'SplashScreen',
  // remove header de todas as telas
  // https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
  headerMode: 'none',
  navigationOptions: {
    translucent: 'true',
    headerStyle: {
      backgroundColor: Colors.defaultBackground,
      elevation: 0,
      paddingTop: 40,
    },
    headerTitleStyle: {
      textAlign: 'center',
      fontFamily: 'Geomanist-Medium',
      alignSelf: 'center',
    },
    headerTintColor: Colors.headerTintColor,
  },
};

/**
 * Root navigation
 */
const RootNavigator = createStackNavigator(
  {
    SplashScreen,
    MainScreen,
  },
  configureStack,
);

/**
 * Configure App Container - for react-navigation 3+
 */
const AppContainer = createAppContainer(RootNavigator);

/**
 * Define main RootScreen component
 */
const RootScreen = () => {
  const { loading } = useSelector(state => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    // Executa startup saga quando aplicacao inicia
    dispatch(startup());
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.defaultBackground }}
    >
      <View style={{ flex: 1 }}>
        <Loading visible={loading} animation="fade" />
        <AppContainer
          // Utilizando NavigationService para permitir navegar de onde navigation props nao for acessível
          // Permite navegar direto de um Saga, por exemplo
          // NavigationService (https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RootScreen;
