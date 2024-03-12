import { checkConnection } from '../../src/services/ConnectionService';
import NetInfo from '@react-native-community/netinfo';

jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn()
}));

const mockedFetch = NetInfo.fetch as jest.Mock;

describe('ConnectionService', () => {
    beforeEach(() => {
        mockedFetch.mockClear();
    });

    it('returns true when the internet connection is available', async () => {
        mockedFetch.mockResolvedValue({
            isConnected: true,
            isInternetReachable: true
        });

        const isConnected = await checkConnection();
        expect(isConnected).toBe(true);
    });

    it('returns false when the internet connection is not available', async () => {
        mockedFetch.mockResolvedValue({
            isConnected: false,
            isInternetReachable: false
        });

        const isConnected = await checkConnection();
        expect(isConnected).toBe(false);
    });

    it('returns false when internet is connected but not reachable', async () => {
        mockedFetch.mockResolvedValue({
            isConnected: true,
            isInternetReachable: false
        });

        const isConnected = await checkConnection();
        expect(isConnected).toBe(false);
    });
});
