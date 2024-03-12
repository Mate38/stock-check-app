import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticate, logoutUser } from '../../src/services/AuthService';
import apiClient from '../../src/api/apiClient';
import { IAuthResponse, IAuthError } from '../../src/types/AuthTypes';

jest.mock('../../src/api/apiClient', () => ({
    post: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    clear: jest.fn(),
}));

const mockedPost = apiClient.post as jest.Mock;
const mockedClear = AsyncStorage.clear as jest.Mock;

const mockError = {
    response: {
        data: {
            error_code: 401,
            error_message: 'Authentication failed'
        }
    }
};

describe('AuthService', () => {
    beforeEach(() => {
        mockedPost.mockClear();
        mockedClear.mockClear();
    });

    it('returns true when authentication is successful', async () => {
        const mockResponse: IAuthResponse = {
            access_token: 'mockToken',
            auth_status: 200,
        };
        mockedPost.mockResolvedValue({ data: mockResponse });
        const isAuthenticated = await authenticate('test@example.com', 'password123');
        expect(isAuthenticated).toBe(true);
    });

    it('returns an error object of type IAuthError when authentication fails and throws an error', async () => {
        mockedPost.mockRejectedValue(mockError);
        try {
            await authenticate('test@example.com', 'password123');
            fail('The authenticate function should throw an error.');
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(mockError.response.data.error_message);
        }
    });

    it('calls AsyncStorage.clear and navigates to Login on logout', async () => {
        const mockNavigation = { navigate: jest.fn() };
        await logoutUser(mockNavigation);
        expect(mockedClear).toHaveBeenCalled();
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
});
