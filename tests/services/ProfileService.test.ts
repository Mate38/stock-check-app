import { ProfileService } from '../../src/services/ProfileService';
import apiClient from '../../src/api/apiClient';
import { IProfileData } from '../../src/types/ProfileTypes';

jest.mock('../../src/api/apiClient', () => ({
    post: jest.fn()
}));

const mockedPost = apiClient.post as jest.Mock;

describe('ProfileService', () => {
    beforeEach(() => {
        mockedPost.mockClear();
    });

    it('fetches user profile successfully', async () => {
        const mockProfileData: IProfileData = {
            name: 'John Doe',
            email: 'john.doe@example.com'
        };

        mockedPost.mockResolvedValue({ data: mockProfileData });

        const result = await ProfileService.fetchUserProfile();

        expect(mockedPost).toHaveBeenCalledWith('/rpc/v1/application.get-profile');
        expect(result).toEqual(mockProfileData);
    });

    it('handles errors when fetching user profile fails', async () => {
        const errorMessage = 'Error fetching profile';
        mockedPost.mockRejectedValue(new Error(errorMessage));

        await expect(ProfileService.fetchUserProfile()).rejects.toThrow(errorMessage);
    });
});
