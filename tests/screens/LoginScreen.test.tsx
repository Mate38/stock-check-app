import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import { authenticate } from '../../src/services/AuthService';

jest.mock('../../src/services/AuthService', () => ({
    authenticate: jest.fn().mockResolvedValue(true)
}));

describe('LoginScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<LoginScreen />);

        expect(getByTestId('email-input')).toBeTruthy();
        expect(getByTestId('password-input')).toBeTruthy();
        expect(getByTestId('login-button')).toBeTruthy();
    });

    it('validates empty fields before submission', async () => {
        const { getByTestId } = render(<LoginScreen />);
        const loginButton = getByTestId('login-button');

        fireEvent.press(loginButton);

        await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
        expect(authenticate).not.toHaveBeenCalled();
    });

    it('submits the form with email and password', async () => {
        const { getByTestId } = render(<LoginScreen />);
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');

        fireEvent.press(loginButton);

        await waitFor(() => expect(authenticate).toHaveBeenCalledWith('test@example.com', 'password123'));
    });

    it('validates incorrect email format before submission', async () => {
        const { getByTestId } = render(<LoginScreen />);
        const emailInput = getByTestId('email-input');
        const loginButton = getByTestId('login-button');

        fireEvent.changeText(emailInput, 'wrongemail');
        fireEvent.press(loginButton);

        await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
        expect(authenticate).not.toHaveBeenCalled();
    });

    it('validates password length before submission', async () => {
        const { getByTestId } = render(<LoginScreen />);
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const loginButton = getByTestId('login-button');
    
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'short');
    
        fireEvent.press(loginButton);
    
        await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
        expect(authenticate).not.toHaveBeenCalled();
    });
});
