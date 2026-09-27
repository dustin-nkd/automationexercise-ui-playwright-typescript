export type AccountTitle = 'Mr' | 'Mrs';

export type DateOfBirth = {
    day: string;
    month: string;
    year: string;
};

export type Address = {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
};

export type UserCredentials = {
    name: string;
    email: string;
    password: string;
};

export type SignupPayload = UserCredentials & {
    title: AccountTitle;
    birth: DateOfBirth;
    newsletter: boolean;
    offers: boolean;
    address: Address;
};

export type ProductRef = {
    name: string;
    quantity: number;
};

export type ContactMessage = {
    name: string;
    email: string;
    subject: string;
    message: string;
    // Path relative to repo root; upload happens in the Contact Us step.
    attachmentPath: string;
};
