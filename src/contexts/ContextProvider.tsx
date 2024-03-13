import React from 'react';
import { ProductProvider } from './ProductContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
};

export default ContextProvider;
