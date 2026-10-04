import { test } from '../../src/fixtures/test';

test('Test Case 7: Verify Test Cases Page', async ({
    homePage,
    header,
    testCasesPage,
}) => {
    await test.step('Navigate to url and verify home page is visible', async () => {
        await homePage.open();
        await homePage.expectLoaded();
    });

    await test.step("Click on 'Test Cases' button", async () => {
        await header.gotoTestCases();
    });

    await test.step('Verify user is navigated to test cases page successfully', async () => {
        await testCasesPage.expectLoaded();
    });
});
