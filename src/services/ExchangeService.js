import { create } from 'apisauce';
import { Config } from '../config';

const coinApiClient = create({
  baseURL: Config.EXCHANGE_BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

const fetchCoinData = async () => {
  // Retorno padrao do apisauce:
  // response.ok       - Boolean - True is the status code is in the 200's; false otherwise.
  // response.problem  - String  - One of 6 different values (see below - problem codes)
  // response.data     - Object  - this is probably the thing you're after.
  // response.status   - Number  - the HTTP response code
  // response.headers  - Object  - the HTTP response headers
  // response.config   - Object  - the `axios` config object used to make the request
  // response.duration - Number  - the number of milliseconds it took to run this request
  // @see https://www.npmjs.com/package/apisauce

  const response = await coinApiClient.get('ticker/');

  if (response.ok) {
    return response.data.data;
  }
  console.log('response: ', response);
  console.log('response.problem: ', response.problem);
  console.log('response.originalError: ', response.originalError);
  return response.problem;
};

export const ExchangeService = {
  fetchCoinData,
};
