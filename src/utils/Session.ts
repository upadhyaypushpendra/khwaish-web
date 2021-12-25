import Cookies from "js-cookie";

const kutIsLoggedIn = Symbol("kutIsLoggedIn");

function setIsLoggedInCookie() {
  const domain = "khwaish";

  if (kutIsLoggedIn.description)
    Cookies.set(kutIsLoggedIn.description, true.toString(), {
      expires: 30,
      domain
    });
}

class Session {
  userId: string = "";
  accessToken: string = "";
  accessTokenExpiry: number = Date.now();
  refreshToken: string = "";
  refreshTokenExpiry: number = Date.now();

  async onCreateSession({
    accessToken,
    accessTokenExpiry,
    refreshToken,
    refreshTokenExpiry
  }: any) {
    this.accessToken = accessToken;
    this.accessTokenExpiry = accessTokenExpiry;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiry = refreshTokenExpiry;
    setIsLoggedInCookie();
    localStorage.setItem("khwaishRefreshTokenExpiry", refreshTokenExpiry);
    localStorage.setItem("khwaishRefreshToken", refreshToken);
  }

  onRestoreSession({ accessToken, accessTokenExpiry }: any) {
    this.accessToken = accessToken;
    this.accessTokenExpiry = accessTokenExpiry;
    setIsLoggedInCookie();
  }

  clearSession() {
    this.accessToken = "";
    this.accessTokenExpiry = Date.now();
    this.refreshToken = "";
    this.refreshTokenExpiry = Date.now();
    if (kutIsLoggedIn.description) Cookies.remove(kutIsLoggedIn.description);
    localStorage.removeItem("khwaishRefreshTokenExpiry");
    localStorage.removeItem("khwaishRefreshToken");
  }

  isLoggedIn() {
    return kutIsLoggedIn.description && Cookies.get(kutIsLoggedIn.description);
  }
}

export default new Session();
