import { randomUUID } from 'node:crypto';
import {
    type Address,
    type SignupPayload,
    type UserCredentials,
} from './types';

const DEFAULT_ADDRESS: Address = {
    firstName: 'John',
    lastName: 'Doe',
    company: 'QA Lab',
    address1: '123 Street Name',
    address2: 'District Name',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'MSV3A8',
    mobileNumber: '4165550100',
};

function uniqueEmail(prefix = 'ae.pw'): string {
    const token = randomUUID().slice(0, 8);
    return `${prefix}.${Date.now()}.${token}@example.com`;
}

export function buildCredentials(
    overrides: Partial<UserCredentials> = {},
): UserCredentials {
    return {
        name: overrides.name ?? 'John Doe',
        email: overrides.email ?? uniqueEmail(),
        password: overrides.password ?? 'Playwright123',
    };
}

export function buildSignupPayload(
    overrides: Partial<UserCredentials> & {
        title?: SignupPayload['title'];
        address?: Partial<Address>;
        newsletter?: boolean;
        offers?: boolean;
    } = {},
): SignupPayload {
    const credentials = buildCredentials(overrides);

    return {
        ...credentials,
        title: overrides.title?? 'Mr',
        birth: {
            day: '10',
            month: 'May',
            year: '1996',
        },
        newsletter: overrides.newsletter ?? true,
        offers: overrides.offers ?? true,
        address: {
            ...DEFAULT_ADDRESS,
            ...overrides.address,
        },
    };
}

export function existingEmailCredentials(): UserCredentials {
    // Shared mailbox for TC5 (register existing email) and later login tests.
    // Real account provisioning is decided in the fixtures step.
    return {
        name: 'Existing User',
        email: 'existing.ae.pw@example.com',
        password: 'Playwright123',
    };
}
