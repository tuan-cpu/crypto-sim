import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your context
type ControlContextType = {
  selectedNFT: any;
  updateSelectedNFT: (nft: any) => void;
};

// Create a context with an initial state
const ControlContext = createContext<ControlContextType | undefined>(undefined);

// Create a context provider component
type ControlContextProviderProps = {
  children: ReactNode;
};

const ControlContextProvider: React.FC<ControlContextProviderProps> = ({ children }) => {
  const [selectedNFT, setSelectedNFT] = useState();

  const updateSelectedNFT = (nft: any) => {
    setSelectedNFT(nft);
  };

  return (
    <ControlContext.Provider value={{ selectedNFT, updateSelectedNFT }}>
      {children}
    </ControlContext.Provider>
  );
};

// Create a custom hook to use the context
const useControlContext = (): ControlContextType => {
  const context = useContext(ControlContext);
  if (!context) {
    throw new Error('useControlContext must be used within a ControlContextProvider');
  }
  return context;
};

export { ControlContextProvider, useControlContext };
