import Api from '@/api/api'

export default class JobApi extends Api {
    constructor() {
        super();
    }

    /**
     * Get a Job using its ID
     * @param jobId
     * @returns {Promise<Job>}
     */
    async getJobById (jobId) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${jobId}`);
        if (res.ok) {
            return res.json()
        }
        if (!res.ok) throw new Error(this.parseError(await res.json()));
    }

    /**
     * Update a job
     * @param job
     * @returns {Promise<Job>} updated job
     */
    async updateJob (job) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/update/${job.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (!res.ok) throw new Error(this.parseError(await res.json()));
        return res.json();
    }

    /**
     * Assign a helper to a job
     * @param jobId
     * @param helperEmail
     * @returns {Promise<this>}
     */
    async setHelperForJobId (jobId, helperEmail) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${jobId}/set-helper/${helperEmail}`, {
            method: "PUT"
        });
        if (!res.ok) throw new Error(this.parseError(await res.json()));
        return res.json();
    }

    /**
     * Trigger a match for a job
     * @param id
     */
    async findHelperForJobId (id) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${id}/find-helper`);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Leider konnte kein Helper für deinen Antrag gefunden werden.`);
        }
    }

    /**
     * Create a new job
     * @param job
     * @returns {Promise<Job>} created job
     */
    async addJob (job) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(this.parseError(await res.json()));
        }
    }

    /**
     * Close a job
     * @param id
     * @returns {Promise<void>}
     */
    async closeJobById(id) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/close/${id}`, {
            method: "PUT"
        });
        console.log(res)
        if (!res.ok) throw new Error(`Unable to close job ${id}`);
    }

    /**
     * Delete a job
     * @param id
     * @returns {Promise<void>}
     */
    async deleteJobById (id) {
        let res = await super.customFetch(`${Api.getApiBaseUrl()}/job/remove/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Unable to delete job ${id}`);
    }

    /**
     * Fetch the jobs that the current user has authored
     * @returns {Promise<Jobs>}
     */
    async fetchCurrentUserJobs () {
        let currentUser = this.getCurrentUser();
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/author/${currentUser.email}`);
        return res.json();
    }

    /**
     * Fetch the jobs that the current user was matched as a helper for
     * @returns {Promise<Jobs>}
     */
    async fetchCurrentHelperJobs () {
        let currentUser = this.getCurrentUser();
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/helper/${currentUser.email}`);
        return res.json();
    }
}