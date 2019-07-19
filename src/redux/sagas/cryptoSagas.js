import { call, put, takeLatest } from 'redux-saga/effects';
import { ExchangeService } from '../../services/ExchangeService';
import {
  fetchCoinDataFailure,
  fetchCoinDataLoading,
  fetchCoinDataSuccess,
  FETCH_COIN_DATA_REQUEST,
} from '../actions/cryptoActions';
/**
 *
 * @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
 *
 * Use put para disparacar uma acao que sera lida pelo listener do Redux, ou seja, para atualizar um estado no reducer
 * Use call para disparar açoes assincronas, como chamadas as API's
 *
 * Call eh "blocante" - a chamada eh resolvida e soh apos terminar o codigo continua
 * Put eh "nao blocante" - a chamada eh executada asyncrona
 */
function* fetchCoinData() {
  // seta reducer para estado de loading
  yield put(fetchCoinDataLoading());

  // Fetch API
  const coinData = yield call(ExchangeService.fetchCoinData);

  if (coinData) {
    yield put(fetchCoinDataSuccess(coinData));
  } else {
    yield put(fetchCoinDataFailure('Erro na chamada da API.'));
  }
}

export function* watchFetchCoinData() {
  yield takeLatest(FETCH_COIN_DATA_REQUEST, fetchCoinData);
}
