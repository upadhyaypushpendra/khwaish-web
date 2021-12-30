import { phone } from "phone";

export const validateAndParsePhone = (phoneNumber: string | undefined) =>
    phone(phoneNumber as string, { country: 'IN', strictDetection: true });