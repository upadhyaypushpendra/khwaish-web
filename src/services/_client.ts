import Session from "../utils/Session";

/**
 * @param {Object} params
 * @param {string} params.path  path to resource relative to baseUrl
 * @param {string} params.baseUrl  base URL for resource
 * @param {Object} params.options  init options for request
 * @param {Object} params.payload  JSON payload attachment
 */
class Client {
  _url: string;

  _options: Record<string, unknown>;

  _baseUrl =
    process.env.SERVER_URL || "https://local-book-store.herokuapp.com/chatUser";

  constructor({
    path = "",
    options = {},
    payload = null
  }: {
    path: string;
    options?: Record<string, unknown>;
    payload?: Record<string, unknown> | null;
  }) {
    this._url = (() => {
      let _path = path;

      if (_path[0] !== "/") _path = `/${_path}`;

      return this._baseUrl + _path;
    })();

    this._options = {
      ...JSON.parse(JSON.stringify(options)),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        userId: Session.userId,
        "kutuki-application": "web",
        "khwaish-access-token": Session.accessToken,
        "khwaish-refresh-token": localStorage.getItem("kutRefreshToken")
      }
    };

    if (payload) {
      this._options.body = JSON.stringify(payload);
    }
  }

  _handleError = (error: unknown) => {
    console.error(error);
    throw error;
  };

  _fetch = async (options: Record<string, unknown>) => {
    try {
      const response = await fetch(this._url, { ...this._options, ...options });
      const responseJson = await response.json();

      return { ok: response.ok, ...responseJson };
    } catch (error) {
      return this._handleError(error);
    }
  };

  /**
   * GET request to remote service
   */
  get = () =>
    this._fetch({
      method: "GET"
    });

  /**
   * POST request to remote service
   */
  post = () =>
    this._fetch({
      method: "POST"
    });

  /**
   * PUT request to remote service
   */
  put = () =>
    this._fetch({
      method: "PUT"
    });

  /**
   * PATCH request to remote service
   */
  patch = () =>
    this._fetch({
      method: "PATCH"
    });

  /**
   * DELETE request to remote service
   */
  delete = () =>
    this._fetch({
      method: "DELETE"
    });
}

export default Client;
