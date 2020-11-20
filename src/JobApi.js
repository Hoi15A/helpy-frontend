import Api1 from './api1'

class JobApi extends Api1 {
    constructor() {
        super();
    }

    async getJobById (jobId) {
        let res = await super.customFetch(`${Api1.getApiBaseUrl()}/job/id/${jobId}`);
        if (res.ok) {
            return res.json()
        }
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async updateJob (job) {
        let res = await super.customFetch(`${Api1.getApiBaseUrl()}/job/update/${job.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async setHelperForJobId (jobId, helperEmail) {
        let res = await super.customFetch(`${Api1.getApiBaseUrl()}/job/id/${jobId}/set-helper/${helperEmail}`, {
            method: "PUT"
        });
        if (!res.ok) throw new Error(this.parseError(await res.json));
    }

    async findHelperForJobId (id) {
        let res = await super.customFetch(`${Api1.getApiBaseUrl()}/job/id/${id}/find-helper`);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Leider konnte kein Helper für deinen Antrag gefunden werden.`);
        }
    }

    async addJob (job) {
        let res = await super.customFetch(`${Api1.getApiBaseUrl()}/job/add`, {
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
}