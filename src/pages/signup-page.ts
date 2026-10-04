import { expect, type Locator, type Page } from '@playwright/test';
import { type SignupPayload } from '../data/types';

export class SignupPage {
    readonly heading: Locator;
    readonly password: Locator;
    readonly createAccountButton: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByText('ENTER ACCOUNT INFORMATION');
        this.password = page.getByLabel('Password');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/signup\/?$/);
        await expect(this.heading).toBeVisible();
    }

    async fillAccount(user: SignupPayload): Promise<void> {
        const titleLabel = user.title.endsWith('.') ? user.title : `${user.title}.`;
        await this.page.getByRole('radio', { name: titleLabel, exact: true }).check();
        await this.password.fill(user.password);

        await this.page.locator('#days').selectOption({ label: user.birth.day });
        await this.page.locator('#months').selectOption({ label: user.birth.month });
        await this.page.locator('#years').selectOption({ label: user.birth.year });

        if (user.newsletter) {
            await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        }
        if (user.offers) {
            await this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
        }

        const address = user.address;
        await this.page.getByLabel('First name').fill(address.firstName);
        await this.page.getByLabel('Last name').fill(address.lastName);
        await this.page.getByLabel('Company', { exact: true }).fill(address.company);
        await this.page.getByLabel('Address *').fill(address.address1);
        await this.page.getByLabel('Address 2').fill(address.address2);
        await this.page.locator('#country').selectOption({ label: address.country });
        await this.page.getByLabel('State').fill(address.state);
        await this.page.locator('#city').fill(address.city);
        await this.page.locator('#zipcode').fill(address.zipcode);
        await this.page.getByLabel('Mobile Number').fill(address.mobileNumber);
    }

    async submit(): Promise<void> {
        await this.createAccountButton.click();
    }
}
