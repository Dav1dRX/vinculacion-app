import React, { createContext, useState, useContext } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, severity = 'info') => {
    setNotification({ message, severity });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={hideNotification}>
        <MuiAlert elevation={6} variant="filled" severity={notification?.severity}>
          {notification?.message}
        </MuiAlert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};