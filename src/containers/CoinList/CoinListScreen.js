import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import {
  Button, ScrollView, Text, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CoinCard from '../../components/CoinCard/CoinCard';
import { fetchCoinData } from '../../redux/actions/cryptoActions';
import Style from './CoinListScreenStyle';

const CoinListScreen = () => {
  const { coinData, coinDataErrorMessage, coinDataIsLoading } = useSelector(
    state => state.crypto,
  );
  // const dispatch = useDispatch();
  // const { loading } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData());
  }, []);

  const renderCoinCards = () => coinData.map((coin, index) => (
    <CoinCard
      key={index}
      coinName={coin.name}
      symbol={coin.symbol}
      priceUsd={coin.quotes.USD.price}
      percentChange24h={coin.quotes.USD.percent_change_24h}
      percentChange7d={coin.quotes.USD.percent_change_7d}
    />
  ));

  const renderErrorMessage = () => (
    <Text style={{ color: 'red' }}>{coinDataErrorMessage}</Text>
  );

  const onPressButton = () => {
    dispatch(fetchCoinData());
  };

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
      <ScrollView contentContainerStyle={Style.contentContainer}>
        {renderErrorMessage()}
        {renderCoinCards()}
      </ScrollView>
      <View>
        <Button onPress={onPressButton} title="Refresh" />
      </View>
    </View>
  );
};

/**
 * Definir proptypes para todos componentes ou telas
 */
CoinListScreen.propsTypes = {
  coinData: PropTypes.array,
  coinDataErrorMessage: PropTypes.string,
  coinDataIsLoading: PropTypes.bool,
};

CoinListScreen.defaultProps = {
  coinData: [],
  coinDataErrorMessage: ' ',
  coinDataIsLoading: false,
};

export default CoinListScreen;
