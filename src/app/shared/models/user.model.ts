interface IToken {
    token: string;
}

export interface IProfile {
    login: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: number;
    password?: string;
    token?: IToken;
}

export type IProfileChangeEvent = Pick<IProfile, 'email' | 'phone' | 'password'>;

