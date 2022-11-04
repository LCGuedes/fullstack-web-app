import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import SignUp from './index';

describe('singUp screen', () => {

    describe('should signUp screen components render', () => {

        beforeEach(() => {
            render(<SignUp />);
        });
        
        it('signUp screen rendered ?', () => {
            const text = screen.getByText('Cadastro');
            expect(text).toBeInTheDocument();
        });
    
        it('user input should be rendered', () => {
            const userInput = screen.getByPlaceholderText(/nome de usuário/i);
            expect(userInput).toBeInTheDocument();
        });
    
        it('user input field should be empty', () => {
            const userInput = screen.getByPlaceholderText(/nome de usuário/i);
            expect(userInput.textContent).toBe('');
        });
    
        it('password input should be rendered', () => {
            const passwordInput = screen.getAllByPlaceholderText(/senha/i);
            expect(passwordInput[0]).toBeInTheDocument();
        });
    
        it('password input field should be empty ?', () => {
            const passwordInput = screen.getAllByPlaceholderText(/senha/i);
            expect(passwordInput[0].textContent).toBe('');
        });
    
        it('confirm password input should be rendered', () => {
            const confirmPasswordInput = screen.getByPlaceholderText(/confirmar senha/i);
            expect(confirmPasswordInput).toBeInTheDocument();
        });
    
        it('confirm Passowrd input field empty ?', () => {
            const confirmPassowrdInput = screen.getByPlaceholderText(/confirmar senha/i);
            expect(confirmPassowrdInput.textContent).toBe('');
        });
    
        it('forget password checkbox should be rendered and unchecked', () => {
            const checkBox = screen.getByPlaceholderText(/forget password/i);
            expect(checkBox).not.toBeChecked();
        });
    
        it('forget password link should be rendered', () => {});
    
        it('forget password should be redirecting', () => {});
    
        it('submit button should be rendered', () => {
            const button = screen.getByText(/cadastrar/i);
            expect(button).toBeInTheDocument();
        });
    
        it('submit button should be disabled', () => {
            const button = screen.getByText(/cadastrar/i);
            expect(button).toBeDisabled();
        });

        it('submit button should be able after inputs validation', () => {
            // const button = screen.getByText(/cadastrar/i);
        });
    });

    describe('onSubmit', () => {
        const onSubmit = jest.fn();

        beforeEach(() => {
            onSubmit.mockClear();
            render(<SignUp onSubmit={onSubmit} />);
        });

        it('Should onSubmit be called when all fields pass validation', () => {
            
            // username type validation
            
            // password type validation

            // confirm password type validation
            
        });

    });    
});
