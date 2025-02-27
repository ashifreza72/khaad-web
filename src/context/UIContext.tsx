'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
