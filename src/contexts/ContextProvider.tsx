import React from 'react';
import { ProductProvider } from './ProductContext';
import { NavigationProvider } from './NavigationContext';
import { ConnectionProvider } from './ConnectionContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationProvider>
      <ProductProvider>
        <ConnectionProvider>
          {children}
        </ConnectionProvider>
      </ProductProvider>
    </NavigationProvider>
  );
};

export default ContextProvider;
