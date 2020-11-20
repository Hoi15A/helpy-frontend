import Api from './api'

export default class TagApi extends Api {

    constructor() {
        super();
    }

    /**
     * Fetch all available tags from the api
     *
     * @returns {Promise<Array<Tag>>} Tags
     */
    async fetchTags () {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/tag/all`);
        return res.json();
    }
}