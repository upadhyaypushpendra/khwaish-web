import Cookies from "js-cookie";

const khwaishIsLoggedIn = Symbol("khwaishIsLoggedIn");

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

  async onCreateSession({
    userId,
    name,
    phone,
    about,
    accessToken,
    accessExpireAt,
    refreshToken,
    refreshExpireAt
  }: any) {
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

  onRestoreSession({ accessToken, accessExpireAt }: any) {
    this.accessToken = accessToken;
    this.accessTokenExpiry = new Date(accessExpireAt).getTime();
    setIsLoggedInCookie();
  }

  clearSession() {
    this.accessToken = "";
    this.accessTokenExpiry = Date.now();
    this.refreshToken = "";
    this.refreshTokenExpiry = Date.now();
    if (khwaishIsLoggedIn.description) Cookies.remove(khwaishIsLoggedIn.description);
    localStorage.removeItem("khwaishRefreshTokenExpiry");
    localStorage.removeItem("khwaishRefreshToken");
  }

  isLoggedIn() {
    return khwaishIsLoggedIn.description && Cookies.get(khwaishIsLoggedIn.description);
  }
}

export default new Session();
