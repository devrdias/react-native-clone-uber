/**
 * This reducer is used to keep track of all Async effets of the app
 * It's usefull for rendering a loading spinner component.
 * Also good for debug
 *
 */

const INITIAL_STATE = {
  loading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|LOADING|SUCCESS|FAILURE)/.exec(type);

  // ignore actions not containing *_REQUEST / *_LOADING / *_SUCCESS /  *_FAILURE
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  // *ACTION_NAME*_REQUEST = true
  // *ACTION_NAME*_SUCCESS = false
  // *ACTION_NAME*_FAILURE = false
  return {
    ...state,
    loading: requestState === 'REQUEST' || requestState === 'LOADING',
    [requestName]: requestState === 'REQUEST' || requestState === 'LOADING',
  };
};

export default loadingReducer;
