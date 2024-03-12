import React from 'react';
import { render } from '@testing-library/react-native';
import NetInfo from '@react-native-community/netinfo';
import ConnectionStatusScreen from '../../src/screens/ConnectionStatusScreen';

jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: jest.fn()
}));

describe('ConnectionStatusScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display connected when online', () => {
        const mockNetInfoSubscription = {
            remove: jest.fn(),
        };

        (NetInfo.addEventListener as jest.Mock).mockImplementation(callback => {
            callback({ isConnected: true, isInternetReachable: true });
            return mockNetInfoSubscription;
        });

        const { getByTestId } = render(<ConnectionStatusScreen />);
        expect(getByTestId('status-connected')).toBeTruthy();
    });

    it('should display disconnected when offline', () => {
        const mockNetInfoSubscription = {
            remove: jest.fn(),
        };

        (NetInfo.addEventListener as jest.Mock).mockImplementation(callback => {
            callback({ isConnected: false, isInternetReachable: false });
            return mockNetInfoSubscription;
        });

        const { getByTestId } = render(<ConnectionStatusScreen />);
        expect(getByTestId('status-disconnected')).toBeTruthy();
    });

    it('should display disconnected when internet is not reachable', () => {
        const mockNetInfoSubscription = {
            remove: jest.fn(),
        };

        (NetInfo.addEventListener as jest.Mock).mockImplementation(callback => {
            callback({ isConnected: true, isInternetReachable: false });
            return mockNetInfoSubscription;
        });

        const { getByTestId } = render(<ConnectionStatusScreen />);
        expect(getByTestId('status-disconnected')).toBeTruthy();
    });
});
