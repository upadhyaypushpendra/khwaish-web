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
    friends: [] = [];
    accessToken: string = "";
    accessTokenExpiry: number = Date.now();
    refreshToken: string = "";
    refreshTokenExpiry: number = Date.now();

    _setUser(user: any) {
        this.userId = user._id;
        this.name = user.name;
        this.phone = user.phone;
        this.about = user.about;
        this.friends = user.friends;
    }

    _unsetUser() {
        this.userId = "";
        this.name = "";
        this.phone = "";
        this.about = "";
        this.friends = [];
    }

    onCreateSession({ user, tokens }: any): void {
        this._setUser(user);
        this.accessToken = tokens.accessToken;
        this.accessTokenExpiry = new Date(tokens.accessExpireAt).getTime();
        this.refreshToken = tokens.refreshToken;
        this.refreshTokenExpiry = new Date(tokens.refreshExpireAt).getTime();
        setIsLoggedInCookie();
        localStorage.setItem("khwaishRefreshTokenExpiry", this.refreshTokenExpiry.toString());
        localStorage.setItem("khwaishRefreshToken", this.refreshToken);
    }

    onRestoreSession({ accessToken, accessExpireAt, user }: any): void {
        this._setUser(user);
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
        this._unsetUser();
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
