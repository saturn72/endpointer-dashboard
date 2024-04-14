import { Alert, Box, Collapse } from '@mui/material';
import { createContext, useEffect, useReducer } from 'react';

type severity = 'success' | 'info' | 'warning' | 'error';

type AlertInfo = {
  severity?: severity;
  message?: string;
  duration?: number;
};

type AlertContextType = {
  alert?: AlertInfo;
}

type AlertDispatchContextType = {
  dispatch: React.Dispatch<AlertInfo | undefined>;
}

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export const AlertDispatchContext = createContext<AlertDispatchContextType>({} as AlertDispatchContextType);

function reducer(
  alert: AlertInfo | undefined,
  alertInfo: AlertInfo | undefined) {

  if (!alertInfo) {
    return undefined;
  }

  const ai = {
    severity: alertInfo.severity || "info",
    message: alertInfo.message,
    duration: alertInfo.duration || 5000
  };

  return ai;
}

export function AlertContextProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [alert, dispatch] = useReducer(reducer, null!);

  useEffect(() => {
    if (alert) {
      setTimeout(() => dispatch(undefined), alert.duration);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert }}>
      <AlertDispatchContext.Provider value={{ dispatch }}>
        <Box sx={{ width: '100%' }}>
          <Collapse in={alert && alert != null}>
            <Alert severity={alert?.severity}>{alert?.message}</Alert>
          </Collapse>
        </Box>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider >
  );
}