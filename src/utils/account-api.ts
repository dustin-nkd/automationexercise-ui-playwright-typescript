import { expect, type APIRequestContext } from '@playwright/test';
import { type SignupPayload } from '../data/types';

function toForm(user: SignupPayload): Record<string, string> {
    return {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.birth.day,
        birth_month: user.birth.month,
        birth_year: user.birth.year,
        firstname: user.address.firstName,
        lastname: user.address.lastName,
        company: user.address.company,
        address1: user.address.address1,
        address2: user.address.address2,
        country: user.address.country,
        state: user.address.state,
        city: user.address.city,
        zipcode: user.address.zipcode,
        mobile_number: user.address.mobileNumber,
    };
}

export async function createAccount(
    request: APIRequestContext,
    user: SignupPayload,
): Promise<void> {
    const response = await request.post('/api/createAccount', { form: toForm(user) });
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain('User created!');
}

export async function deleteAccount(
    request: APIRequestContext,
    email: string,
    password: string,
): Promise<void> {
    const response = await request.delete('/api/deleteAccount', {
        form: { email, password },
    });
    expect(response.ok()).toBeTruthy();
}
