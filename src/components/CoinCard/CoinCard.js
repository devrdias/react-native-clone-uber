import React from 'react';
import { View, Text, Image } from 'react-native';
import { coinIcons } from '../../Images/CoinIcons';
import Style from './CoinCardStyle';

const CoinCard = ({
  coinName, symbol, priceUsd, percentChange24h,
}) => (
  <View style={Style.container}>
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
    >
      <Image style={Style.image} source={{ uri: coinIcons[symbol] }} />
      <Text style={Style.coinSymbol}>{symbol}</Text>
      <Text style={Style.seperator}>|</Text>
      <Text style={Style.coinName}>{coinName}</Text>
    </View>

    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'center',
      }}
    >
      <Text style={Style.coinPrice}>
        {priceUsd}
        <Text style={Style.moneySymbol}> USD </Text>
      </Text>
      <Text>
        24h:
        <Text
          style={
            percentChange24h < 0
              ? Style.percentChangeMinus
              : Style.percentChangePlus
          }
        >
          {' '}
          {percentChange24h} %{' '}
        </Text>
      </Text>
    </View>
  </View>
);

export default CoinCard;
