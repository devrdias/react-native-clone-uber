import { put, takeLatest } from 'redux-saga/effects';
import { fetchCoinData } from '../actions/cryptoActions';
import NavigationService from '../../services/NavigationService';
import { STARTUP } from '../actions/startupActions';

/**
 * Definir processos para executar durante a aplicacao iniciando
 * @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
 */
function* startup() {
  yield put(fetchCoinData());

  // Redirecionar para tela principal depois de finalizar
  // durante a execucao destes processos iniciais, a initialScreen sera a SplashScreen
  // Ver definicao no arquivo
  NavigationService.navigateAndReset('MainScreen');
}

export function* watchStartup() {
  yield takeLatest(STARTUP, startup);
}
