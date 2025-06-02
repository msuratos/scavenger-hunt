import { createContext, useContext, useReducer } from "react";

const initialAlert = { type: 'information', message: '', show: false };

function alertReducer(alert, action) {
  return { type: action.type, message: action.message, show: action.show };
}

export const AlertContext = createContext(null);
export const AlertDispatchContext = createContext(null);

export function useAlert() {
  return useContext(AlertContext);
}

export function useAlertDispatch() {
  return useContext(AlertDispatchContext);
}

export function AlertProvider({ children }) {
  const [alert, dispatch] = useReducer(alertReducer, initialAlert);

  return (
    <AlertContext.Provider value={alert}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  )
}