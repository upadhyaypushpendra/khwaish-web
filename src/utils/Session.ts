import Cookies from "js-cookie";
import { encrypt, decrypt } from "./cryptoJS";

const khwaishIsLoggedIn = Symbol("khwaishIsLoggedIn");
const khwaishIsCredentials = Symbol("khwaishIsCredentials");

function setIsLoggedInCookie() {
  const domain = process.env.REACT_APP_COOKIE_DOMAIN || "localhost";

  if (khwaishIsLoggedIn.description)
    Cookies.set(khwaishIsLoggedIn.description, true.toString(), {
      expires: 30,
      domain
    });
}

class Session {
  userId: string = "";
  name: string = "";
  phone: string = "";
  about: string = "";
  accessToken: string = "";
  accessTokenExpiry: number = Date.now();
  refreshToken: string = "";
  refreshTokenExpiry: number = Date.now();

  onCreateSession({
    userId,
    name,
    phone,
    about,
    accessToken,
    accessExpireAt,
    refreshToken,
    refreshExpireAt
  }: any): void {
    this.userId = userId;
    this.name = name;
    this.phone = phone;
    this.about = about;
    this.accessToken = accessToken;
    this.accessTokenExpiry = new Date(accessExpireAt).getTime();
    this.refreshToken = refreshToken;
    this.refreshTokenExpiry = new Date(refreshExpireAt).getTime();
    setIsLoggedInCookie();
    localStorage.setItem("khwaishRefreshTokenExpiry", this.refreshTokenExpiry.toString());
    localStorage.setItem("khwaishRefreshToken", this.refreshToken);
  }

  onRestoreSession({ accessToken, accessExpireAt }: any): void {
    this.accessToken = accessToken;
    this.accessTokenExpiry = new Date(accessExpireAt).getTime();
    setIsLoggedInCookie();
  }

  clearSession(): void {
    this.accessToken = "";
    this.accessTokenExpiry = Date.now();
    this.refreshToken = "";
    this.refreshTokenExpiry = Date.now();
    if (khwaishIsLoggedIn.description) Cookies.remove(khwaishIsLoggedIn.description);
    localStorage.removeItem("khwaishRefreshTokenExpiry");
    localStorage.removeItem("khwaishRefreshToken");
    this.unRememberMe();
  }

  isLoggedIn(): boolean {
    return Boolean(khwaishIsLoggedIn.description && Cookies.get(khwaishIsLoggedIn.description));
  }

  isRemembered(): false | SignInPayload {
    if (khwaishIsCredentials.description) {
      const credentialsRemembered = localStorage.getItem(khwaishIsCredentials.description);
      return Boolean(credentialsRemembered) ? decrypt(credentialsRemembered as string) : false;
    } else return false;
  }

  rememberMe({ phone, password }: SignInPayload): void {
    if (khwaishIsCredentials.description)
      localStorage.setItem(khwaishIsCredentials.description, encrypt({ phone, password }));
  }

  unRememberMe(): void {
    if (khwaishIsCredentials.description)
      localStorage.removeItem(khwaishIsCredentials.description);
  }
}

export default new Session();
