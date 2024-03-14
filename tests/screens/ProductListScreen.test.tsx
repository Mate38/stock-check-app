import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProductListScreen from '../../src/screens/ProductListScreen';
import { useProducts } from '../../src/contexts/ProductContext';
import { useConnection } from '../../src/contexts/ConnectionContext';
import { ProductService } from '../../src/services/ProductService';

jest.mock('../../src/contexts/ProductContext', () => ({
  useProducts: jest.fn()
}));

jest.mock('../../src/contexts/ConnectionContext', () => ({
  useConnection: jest.fn()
}));

jest.mock('../../src/services/ProductService');

const mockProducts = [
  { id: 1, uuid: 'uuid1', description: 'Product 1', price: 10, quantity: 5, barCode: '111', unitOfMeasure: { acronym: 'un' } },
  { id: 2, uuid: 'uuid2', description: 'Product 2', price: 20, quantity: 3, barCode: '222', unitOfMeasure: { acronym: 'un' } },
];

describe('ProductListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      fetchProducts: jest.fn(),
      updateProducts: jest.fn(),
    });
    (useConnection as jest.Mock).mockReturnValue({
      isConnected: true,
    });
  });

  it('displays loading indicator initially', async () => {
    (ProductService.getLocalProducts as jest.Mock).mockResolvedValue([]);
    const { getByTestId } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  it('loads and displays products', async () => {
    const { getByText } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('Product 2')).toBeTruthy();
    });
  });

  it('shows an error message when product loading fails', async () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      fetchProducts: jest.fn(() => Promise.reject('Error loading products')),
    });
    const { getByTestId } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
    });
  });

});

