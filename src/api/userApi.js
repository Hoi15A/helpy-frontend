import Api from "@/api/api";

export default class UserApi extends Api {

  /**
     * Log in user
     *
     * @returns {Promise<void>}
     */
  async login (email, password) {

    let token = btoa(`${email}:${password}`);
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/${email}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${token}`,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    if (res.ok) {
      await this.setCurrentUser(await res.json());
    } else {
      throw Error("Benutzername oder Passwort ist falsch.");
    }
  }

  /**
     * Log the user out
     */
  async logout () {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/logout`);
    if (!res.ok) throw Error("Logout failed");
  }

  /**
     * Register a new user in the api
     *
     * @param newUser User object to register
     * @returns {Promise<void>}
     */
  async register (newUser) {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(newUser)
    });
    let responseData = await res.json();
    console.log(responseData);
    if (res.ok) {
      this.setCurrentUser(responseData);
    } else {
      throw Error(responseData.details.join("<br>"));
    }
  }

  /**
     * Add a rating to a user
     *
     * @param rating
     * @param email
     * @returns {Promise<this>}
     */
  async addRating (rating, email) {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/addRating/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(rating)
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Failed to add rating:\n${JSON.stringify(rating)}`);
    }
  }

  /**
     * Returns the top 10 users
     */
  async getTopTenUsers () {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/points/top-ten`);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to retrieve top users.");
    }
  }

  /**
     * Gets the points for a specific user
     * @param email
     */
  async getPoints(email) {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/points/${email}`);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to retrieve user points.");
    }
  }

  /**
     * Gets the latest rating for a user
     * @param email
     * @returns {Promise<Rating>}
     */
  async getLatestRating(email) {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/rating/latest/${email}`);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Failed to retrieve user points.");
    }
  }

  /**
     * Put a user into local storage
     *
     * @param user
     */
  setCurrentUser (user) {
    localStorage.setItem("helpyUser", JSON.stringify(user));
  }

  /**
     * Update the currently logged user with new data
     *
     * @param updatedUser
     * @returns {Promise<void>}
     */
  async updateCurrentUser (updatedUser) {
    let currentUser = this.getCurrentUser();
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/update/${currentUser.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(updatedUser)
    });
    if (!res.ok) throw new Error(`Unable to update user ${currentUser.email}`);
    return res.json();
  }

  /**
     * Deletes a user using its email
     *
     * @param email
     * @returns {Promise<void>}
     */
  async deleteUserByEmail (email) {
    let res = await this.customFetch(`${Api.getApiBaseUrl()}/user/remove/${email}`, {
      method: "DELETE"
    });
    localStorage.removeItem("helpyUser");
    if (!res.ok) throw new Error(`Unable to delete user ${email}`);
  }
}