import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_CRYPTO_SECRET || 'secretkey';

/**
 * Helper to encrypt the data
 * @param data Any data to be encrypted
 * @returns Encrypted data in the string
 */
export const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

/**
 * Helper to decrypt the data from the cipher text
 * @param cipherText Cipher text to be decrypted
 * @returns Decrypted data
 */
export const decrypt = (cipherText: string): any => {
  var bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}