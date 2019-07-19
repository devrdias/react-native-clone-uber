import {
  FETCH_COIN_DATA_LOADING,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAILURE,
} from '../actions/cryptoActions';

const INITIAL_STATE = {
  coinData: [],
  coinDataErrorMessage: null,
  coinDataIsLoading: false,
};

const reducer = (state = INITIAL_STATE, { type, coinData, errorMessage }) => {
  switch (type) {
    case FETCH_COIN_DATA_LOADING:
      return {
        ...state,
        coinDataIsLoading: true,
        coinDataErrorMessage: '',
      };

    case FETCH_COIN_DATA_SUCCESS:
      return {
        ...state,
        coinData: Object.keys(coinData).map(k => coinData[k]),
        coinDataIsLoading: false,
        coinDataErrorMessage: null,
      };

    case FETCH_COIN_DATA_FAILURE:
      return {
        ...state,
        coinData: {},
        coinDataIsLoading: false,
        coinDataErrorMessage: errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
