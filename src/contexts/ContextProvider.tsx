import React from 'react';
import { ProductProvider } from './ProductContext';
import { NavigationProvider } from './NavigationContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </NavigationProvider>
  );
};

export default ContextProvider;
