/// <reference types="react-scripts" />

type SignInPayload = {
    phone: string | null | undefined;
    password: string | null | undefined;
}

type SignupPayload = {
    phone: string | null | undefined;
    name: string | null | undefined;
    about: string | null | undefined;
    password: string | null | undefined;
}