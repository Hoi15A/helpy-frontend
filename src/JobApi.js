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
        let res = await customFetch(`${apiBaseUrl}/job/update/${job.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(job)
        });
        if (!res.ok) throw new Error(parseError(await res.json));
    }
}