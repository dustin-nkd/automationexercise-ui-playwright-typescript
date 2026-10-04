import { test } from '../../src/fixtures/test';
import { type ContactMessage } from '../../src/data/types';

test('Test Case 6: Contact Us Form', async ({
    homePage,
    header,
    contactUsPage,
}) => {
    const message: ContactMessage = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Playwright contact',
        message: 'This is a practice contact form submission.',
        attachmentPath: 'test-data/contact-note.txt',
    };

    await test.step('Navigate to url and verify home is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click on 'Contact Us' button", async () => {
        await header.gotoContactUs();
    });

    await test.step("Verify 'GET IN TOUCH' is visible", async () => {
        await contactUsPage.expectLoaded();
    });

    await test.step('Enter name, email, subject, message, upload file, and submit', async () => {
        await contactUsPage.submit(message);
    });

    await test.step('Verify success message is visible', async () => {
        await contactUsPage.expectSubmitted();
    });

    await test.step('Click Home and verify that home page is visible', async () => {
        await contactUsPage.backHome();
        await homePage.expectLoaded();
    });
});
