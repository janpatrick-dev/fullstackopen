import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
}

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const messageAndDispatchContext = useContext(NotificationContext);
  return messageAndDispatchContext[0];
}

export const useNotificationDispatch = () => {
  const messageAndDispatchContext = useContext(NotificationContext);
  return messageAndDispatchContext[1];
}

export const NotificationContextProvider = (props) => {
  const [message, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[message, dispatch]}>
      { props.children }
    </NotificationContext.Provider>
  );
}

export default NotificationContext;