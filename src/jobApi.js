import Api from './api1'

export default class JobApi extends Api {
    constructor() {
        super();
    }

    async getJobById (jobId) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${jobId}`);
        if (res.ok) {
            return res.json()
        }
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async updateJob (job) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/update/${job.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async setHelperForJobId (jobId, helperEmail) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${jobId}/set-helper/${helperEmail}`, {
            method: "PUT"
        });
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async findHelperForJobId (id) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/id/${id}/find-helper`);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Leider konnte kein Helper für deinen Antrag gefunden werden.`);
        }
    }

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

    async closeJobById(id) {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/close/${id}`, {
            method: "PUT"
        });
        console.log(res)
        if (!res.ok) throw new Error(`Unable to close job ${id}`);
    }

    async deleteJobById (id) {
        let res = await super.customFetch(`${Api.getApiBaseUrl()}/job/remove/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error(`Unable to delete job ${id}`);
    }

    async fetchCurrentUserJobs () {
        let currentUser = this.getCurrentUser();
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/author/${currentUser.email}`);
        return res.json();
    }

    async fetchCurrentHelperJobs () {
        let currentUser = this.getCurrentUser();
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/job/helper/${currentUser.email}`);
        return res.json();
    }
}