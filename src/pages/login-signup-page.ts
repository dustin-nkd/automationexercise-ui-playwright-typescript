import { expect, type Locator, type Page } from '@playwright/test';

export class LoginSignupPage {
    readonly loginHeading: Locator;
    readonly signupHeading: Locator;
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupButton: Locator;
    readonly loginError: Locator;

    constructor(private readonly page: Page) {
        const loginForm = page
        .locator('form')
        .filter({ has: page.getByRole('button', { name: 'Login' }) });
        const signupForm = page
        .locator('form')
        .filter({ has: page.getByRole('button', { name: 'Signup' }) });

        this.loginHeading = page.getByRole('heading', {
            name: 'Login to your account',
        });
        this.signupHeading = page.getByText('New User Signup!');
        this.loginEmail = loginForm.getByPlaceholder('Email Address');
        this.loginPassword = loginForm.getByPlaceholder('Password');
        this.loginButton = loginForm.getByRole('button', { name: 'Login' });
        this.signupName = signupForm.getByPlaceholder('Name');
        this.signupEmail = signupForm.getByPlaceholder('Email Address');
        this.signupButton = signupForm.getByRole('button', { name: 'Signup' });
        this.loginError = page.getByText('Your email or password is incorrect!');
      } 

    async expectLoginFormVisible(): Promise<void> {
        await expect(this.page).toHaveURL(/\/login\/?$/);
        await expect(this.loginHeading).toBeVisible();
    }

    async expectSignupFormVisible(): Promise<void> {
        await expect(this.signupHeading).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async startSignup(name: string, email: string): Promise<void> {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async expectIncorrectCredentialsError(): Promise<void> {
        await expect(this.loginError).toBeVisible();
    }
}
