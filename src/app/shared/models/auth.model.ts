export interface ICredentials {
    login: string;
    password: string;
}

export interface IRegistration {
    number: string;
}

export interface IRegistrationData {
    addresses: any[];
    hash: string;
    address?: string;
    email?: string;
    phone?: number;
    registrationNumber?: string;
}

export interface IToken {
    token: string;
}
