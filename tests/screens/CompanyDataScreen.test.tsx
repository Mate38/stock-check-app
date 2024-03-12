import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CompanyDataScreen from '../../src/screens/CompanyDataScreen';
import { CompanyService } from '../../src/services/CompanyService';
import { ICompanyData } from '../../src/types/CompanyDataTypes';

jest.mock('../../src/services/CompanyService');

const mockCompanyData: ICompanyData = {
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

describe('CompanyDataScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while fetching company data', async () => {
    (CompanyService.fetchCompanyData as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { getByTestId } = render(<CompanyDataScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays company data once fetched', async () => {
    (CompanyService.fetchCompanyData as jest.Mock).mockResolvedValue(mockCompanyData);
    const { getByText } = render(<CompanyDataScreen />);

    await waitFor(() => {
      expect(getByText(mockCompanyData.name)).toBeTruthy();
      expect(getByText(mockCompanyData.identification)).toBeTruthy();
    });
  });

  it('displays an error message if there is an error fetching company data', async () => {
    (CompanyService.fetchCompanyData as jest.Mock).mockRejectedValue(new Error('Error fetching company data'));
    const { getByTestId } = render(<CompanyDataScreen />);

    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
    });
  });
});
