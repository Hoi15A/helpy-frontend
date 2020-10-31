const apiBaseUrl = process.env.NODE_ENV === "production" ? "http://helpyProd.example.com/api" : "http://localhost:8080/api";

export default {
    /**
     * Fetch all available categories from the api
     *
     * @returns {Promise<Array<Category>>} Categories
     */
    fetchCategories: async function () { // TODO: Put it more global
        let res = await fetch(`${apiBaseUrl}/category/all`);
        return res.json();
    },
    /**
     * Log in user
     *
     * @returns {Promise<void>}
     */
    login: async function () {
        /**
         * Login logic
         * -> Logged in
         */
        await this.setCurrentUser(await this.fetchUser("ahmed_miri@gmx.net"));
    },
    /**
     * Register a new user in the api
     *
     * @param newUser User object to register
     * @returns {Promise<void>}
     */
    register: async function (newUser) {
        let res = await fetch(`${apiBaseUrl}/user/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUser)
        });
        let createdUser = await res.json();
        this.setCurrentUser(createdUser);
    },
    /**
     * Fetch a user from the api
     *
     * @param email
     * @returns {Promise<User>} User
     */
    fetchUser: async function (email) {
        let res = await fetch(`${apiBaseUrl}/user/${email}`);
        return res.json();
    },
    /**
     * Put a user into local storage
     *
     * @param user
     */
    setCurrentUser: function (user) {
        localStorage.setItem("helpyUser", JSON.stringify(user));
    },
    /**
     * Fetch the current user from localstorage
     *
     * @returns {User} Logged in user
     */
    getCurrentUser: function () {
        let currentUser = JSON.parse(localStorage.getItem("helpyUser"));
        if(!currentUser) {
            throw new Error("User not logged in");
        }
        return currentUser;
    },
    /**
     * Update the currently logged user with new data
     *
     * @param updatedUser
     * @returns {Promise<void>}
     */
    updateCurrentUser: async function (updatedUser) {
        let currentUser = this.getCurrentUser();
        let res = await fetch(`${apiBaseUrl}/user/update/${currentUser.email}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updatedUser)
        });
        if (!res.ok) throw new Error(`Unable to update user ${currentUser.email}`);
    },
    /**
     * Fetch the list of jobs for the currently logged in user
     *
     * @returns {Promise<Array<Job>>} List of jobs
     */
    fetchCurrentUserJobs: async function () {
        let currentUser = this.getCurrentUser();
        let res = await fetch(`${apiBaseUrl}/job/author/${currentUser.email}`);
        return res.json();
    },
    /**
     * Deletes a job using its id
     *
     * @param id
     * @returns {Promise<void>}
     */
    deleteJobById: async function (id) {
        let res = await fetch(`${apiBaseUrl}/job/remove/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Unable to delete job ${id}`);
    },
    /**
     * Deletes a user using its email
     *
     * @param email
     * @returns {Promise<void>}
     */
    deleteUserByEmail: async function (email) {
        let res = await fetch(`${apiBaseUrl}/user/remove/${email}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Unable to delete user ${email}`);
    },
    /**
     * Create a new job
     *
     * @param job
     * @returns {Promise<Job>} Created job
     */
    addJob: async function (job) {
        let res = await fetch(`${apiBaseUrl}/job/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Failed to add job:\n${job}`);
        }
    },
    /**
     * Triggers matching in the backend for a specified job id
     *
     * @param id
     * @returns {Promise<Array<Helper>>} List of helpers that match
     */
    findHelperForJobId: async function (id) {
        let res = await fetch(`${apiBaseUrl}/job/id/${id}/find-helper`);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`No helpers found for job:\n${id}`);
        }
    },
    setHelperForJobId: async function (jobId, helperEmail) {
        let res = await fetch(`${apiBaseUrl}/job/id/${jobId}/set-helper/${helperEmail}`, {
            method: "PUT"
        });
        if (!res.ok) throw new Error(`Unable to set helper ${helperEmail} for job ${jobId}`);
    }
}