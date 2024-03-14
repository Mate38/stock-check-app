import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CompanyScreen from '../../src/screens/CompanyScreen';
import { CompanyService } from '../../src/services/CompanyService';
import { ICompany } from '../../src/types/CompanyTypes';

jest.mock('../../src/services/CompanyService');

const mockCompany: ICompany = {
  uuid: 'uuid-test',
  identification: '00.000.000/0001-00',
  name: 'Test Company',
  businessName: 'Test Company Business Name',
  email: 'test@testcompany.com',
  phoneCollection: [{ areaCode: 11, number: '123456789', type: 1 }],
  addressCollection: [{
    street: 'Test Street',
    number: '123',
    complement: '',
    neighbourhood: 'Test Neighborhood',
    zipCode: {
      zipCode: '12345-678',
      city: {
        name: 'Test City',
        state: {
          name: 'Test State',
          acronym: 'TS'
        }
      }
    }
  }]
};

describe('CompanyScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while fetching company data', async () => {
    (CompanyService.fetchCompany as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { getByTestId } = render(<CompanyScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays company data once fetched', async () => {
    (CompanyService.fetchCompany as jest.Mock).mockResolvedValue(mockCompany);
    const { getByText } = render(<CompanyScreen />);

    await waitFor(() => {
      expect(getByText(mockCompany.name)).toBeTruthy();
      expect(getByText(mockCompany.identification)).toBeTruthy();
    });
  });

  it('displays an error message if there is an error fetching company data', async () => {
    (CompanyService.fetchCompany as jest.Mock).mockRejectedValue(new Error('Error fetching company data'));
    const { getByTestId } = render(<CompanyScreen />);

    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
    });
  });
});
