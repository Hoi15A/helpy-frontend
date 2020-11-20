import Api from './api'

export default class CategoryApi extends Api {
    constructor() {
        super();
    }

    /**
     * Fetch all available categories from the api
     *
     * @returns {Promise<Array<Category>>} Categories
     */
    async fetchCategories () {
        let res = await this.customFetch(`${Api.getApiBaseUrl()}/category/all`);
        return res.json();
    }
}