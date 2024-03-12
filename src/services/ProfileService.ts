import apiClient from '../api/apiClient';
import { IProfileData } from '../types/ProfileTypes';

const ENDPOINT = '/rpc/v1/application.get-profile';

export const fetchUserProfile = async (): Promise<IProfileData> => {
    const response = await apiClient.post<IProfileData>(ENDPOINT);
    return response.data;
};

export const ProfileService = {
    fetchUserProfile
};
