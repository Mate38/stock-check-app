import { CompanyService } from '../../src/services/CompanyService';
import apiClient from '../../src/api/apiClient';
import { ICompanyData } from '../../src/types/CompanyDataTypes';

jest.mock('../../src/api/apiClient', () => ({
    post: jest.fn()
}));

const mockedPost = apiClient.post as jest.Mock;

describe('CompanyService', () => {
    beforeEach(() => {
        mockedPost.mockClear();
    });

    it('fetches company data successfully', async () => {
        const mockCompanyData: ICompanyData = {
            uuid: "uuid-string",
            identification: "identification-string",
            name: "Company Name",
            businessName: "Business Name",
            email: "email@example.com",
            phoneCollection: [],
            addressCollection: []
        };

        mockedPost.mockResolvedValue({ data: mockCompanyData });

        const result = await CompanyService.fetchCompanyData();

        expect(mockedPost).toHaveBeenCalledWith('/rpc/v1/application.get-client');
        expect(result).toEqual(mockCompanyData);
    });

    it('handles errors when fetching company data fails', async () => {
        const errorMessage = 'Error fetching company data';
        mockedPost.mockRejectedValue(new Error(errorMessage));

        await expect(CompanyService.fetchCompanyData()).rejects.toThrow(errorMessage);
    });
});
