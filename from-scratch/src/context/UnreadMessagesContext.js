import React, { createContext, useContext, useState } from 'react';

const UnreadMessagesContext = createContext();

export const UnreadMessagesProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);

  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages, setUnreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
