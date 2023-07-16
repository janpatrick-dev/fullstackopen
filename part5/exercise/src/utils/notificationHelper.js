const showSuccess = (setState, message, duration=5000) => {
  setState(message);
  setTimeout(() => {
    setState(null);
  }, duration);
};

const showError = (setState, message, duration=5000) => {
  setState(message);
  setTimeout(() => {
    setState(null);
  }, duration);
};

export default { showSuccess, showError };