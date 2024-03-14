import apiClient from '../api/apiClient';

import { IProfileData } from '../types/ProfileTypes';
import { DatabaseService } from './DatabaseService';


const ENDPOINT = '/rpc/v1/application.get-profile';

const PROFILE_JSON_ID = 'userProfile';

const fetchUserProfile = async (): Promise<IProfileData> => {
    const response = await apiClient.post<IProfileData>(ENDPOINT);
    await storeLocalProfile(response.data);
    return response.data;
};

const storeLocalProfile = async (profile: IProfileData): Promise<void> => {
    await DatabaseService.storeJson(PROFILE_JSON_ID, profile);
};

const getLocalProfile = async (): Promise<IProfileData | null> => {
    return DatabaseService.getJson<IProfileData>(PROFILE_JSON_ID);
};

export const ProfileService = {
    fetchUserProfile,
    storeLocalProfile,
    getLocalProfile
};
