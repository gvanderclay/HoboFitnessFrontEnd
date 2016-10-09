import React, { PropTypes } from 'react';

const LoadingError = ({ message, onRetry }) => (
  <div>
    <p>Could not fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

LoadingError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
}

export default LoadingError;