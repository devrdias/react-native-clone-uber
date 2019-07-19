export const FETCH_COIN_DATA_REQUEST = 'FETCH_COIN_DATA_REQUEST';
export const FETCH_COIN_DATA_LOADING = 'FETCH_COIN_DATA_LOADING';
export const FETCH_COIN_DATA_SUCCESS = 'FETCH_COIN_DATA_SUCCESS';
export const FETCH_COIN_DATA_FAILURE = 'FETCH_COIN_DATA_FAILURE';

export const fetchCoinData = () => ({
  type: FETCH_COIN_DATA_REQUEST,
});

export const fetchCoinDataLoading = () => ({
  type: FETCH_COIN_DATA_LOADING,
});

export const fetchCoinDataSuccess = payload => ({
  type: FETCH_COIN_DATA_SUCCESS,
  coinData: payload,
});

export const fetchCoinDataFailure = payload => ({
  type: FETCH_COIN_DATA_FAILURE,
  errorMessage: payload,
});
