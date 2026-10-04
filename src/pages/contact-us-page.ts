import path from 'node:path';
import { expect, type Locator, type Page } from '@playwright/test';
import { type ContactMessage } from '../data/types'; 

export class ContactUsPage {
    readonly heading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeLink: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByText('GET IN TOUCH');
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email', { exact: true });
        this.subjectInput = page.getByPlaceholder('Subject');
        this.messageInput = page.getByPlaceholder('Your Message Here');
        // File input has no accessible name on this form.
        this.fileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.');
        this.homeLink = page.locator('#form-section').getByRole('link', { name: 'Home' });
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/contact_us\/?$/);
        await expect(this.heading).toBeVisible();
        // Submit is bound by jQuery at the bottom of the page. Clicking before that
        // posts the form and reloads, so the success alert never appears.
        await this.page.waitForFunction(() => {
            const form = document.querySelector('#contact-us-form');
            const jq = (window as unknown as {
                $?: {
                    _data?: (element: Element | null, key: string) => { submit?: unknown };
                };
            }).$;
            return Boolean(form && jq?._data?.(form, 'events')?.submit);
        });
    }

    async submit(message: ContactMessage): Promise<void> {
        await this.nameInput.fill(message.name);
        await this.emailInput.fill(message.email);
        await this.subjectInput.fill(message.subject);
        await this.messageInput.fill(message.message);
        await this.fileInput.setInputFiles(path.resolve(message.attachmentPath));
        await this.submitButton.click();
    }

    async expectSubmitted(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
    }

    async backHome(): Promise<void> {
        await this.homeLink.click();
    }
} 
