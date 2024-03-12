import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen';
import { ProfileService } from '../../src/services/ProfileService';
import { IProfileData } from '../../src/types/ProfileTypes';

jest.mock('../../src/services/ProfileService');

const mockProfileData: IProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while fetching profile data', async () => {
    (ProfileService.fetchUserProfile as jest.Mock).mockReturnValue(new Promise(() => {}));
    const { getByTestId } = render(<ProfileScreen />);
    await waitFor(() => expect(getByTestId('loading-indicator')).toBeTruthy());
  });

  it('displays profile data once fetched', async () => {
    (ProfileService.fetchUserProfile as jest.Mock).mockResolvedValue(mockProfileData);
    const { getByText } = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText(mockProfileData.name)).toBeTruthy();
      expect(getByText(mockProfileData.email)).toBeTruthy();
    });
  });

  it('displays an error message if there is an error fetching profile data', async () => {
    (ProfileService.fetchUserProfile as jest.Mock).mockRejectedValue(new Error('Error fetching profile data'));
    const { getByTestId } = render(<ProfileScreen />);
  
    await waitFor(() => {
      expect(getByTestId('error-text')).toBeTruthy();
    });
  });
});
