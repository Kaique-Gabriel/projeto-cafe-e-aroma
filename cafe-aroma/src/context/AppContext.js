import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {

  const [user, setUser] = useState(null); // Pode guardar nome, email etc.

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
