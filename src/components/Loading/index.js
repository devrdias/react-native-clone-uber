import PropTypes from 'prop-types';
import * as React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

// const Loading = () => <ActivityIndicator animating color={Colors.red800} />;

const Loading = ({ visible }) => (
  <Spinner
    visible={visible}
    textContent="Loading..."
    textStyle={{ color: '#253145' }}
    animation="fade"
  />
);

Loading.propTypes = {
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  visible: false,
};

export default Loading;
