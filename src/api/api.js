const apiBaseUrl = process.env.NODE_ENV === "production" ? "http://helpyProd.example.com/api" : "http://localhost:8080/api";

export default class Api {

  static getApiBaseUrl() {
    return apiBaseUrl;
  }

  /**
     * Fetch the current user from localstorage
     *
     * @returns {User} Logged in user
     */
  getCurrentUser () {
    let currentUser = null;
    try {
      currentUser = JSON.parse(localStorage.getItem("helpyUser"));
    } catch (e) {
      this.handleUnauthorized();
    }
    if(!currentUser) {
      this.handleUnauthorized();
    }
    return currentUser;
  }

  /**
     * Remove the cached user from storage
     */
  handleUnauthorized() {
    localStorage.removeItem("helpyUser");
  }

  /**
     * Wrapper around fetch to enforce settings for all requests.
     *
     * @returns {Promise<Response>}
     */
  async customFetch(url, options) {
    if (options) {
      options.credentials = "include";
      if (options.headers) {
        options.headers["X-Requested-With"] = "XMLHttpRequest";
      } else {
        options.headers = {
          "X-Requested-With": "XMLHttpRequest"
        };
      }
    } else {
      options = {
        credentials: "include",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      };
    }

    let res = await fetch(url, options);

    if (res.status === 401) {
      this.handleUnauthorized();
    }
    return res;
  }

  parseError(data) {
    let message = "";
    for (let m of data.details) {
      message += m + "<br/>";
    }
    return message;
  }

}