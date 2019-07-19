/**
 * Selectors servem para recuperar dados da Store quando necessidade de receber os dados em outro formato
 * Selectors podem ser utilizados em componentes ou em Sagas
 */

export const getPriceDirection = state => (state.coinData.quotes.USD.price && state.coinData.quotes.USD.price > 0 ? 'BULLISH' : 'BEARISH');
