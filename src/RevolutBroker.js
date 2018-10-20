const Axios = require('axios');

export default class RevolutBroker {

    /**
     * The RevolutBroker is responsible for final communication between the API
     * and the facade
     * @param {string}  key           Your Revolut Business API Key
     * @param {Boolean} [debug=false] Whether you're using Revolut's sandbox API
     */
    constructor(key, debug = false) {
        this.apiKey = key;
        this.debug = debug;
        this.apiBase = debug? 'https://sandbox-b2b.revolut.com/api/1.0' : 'https://b2b.revolut.com/api/1.0/';

        this.axios = Axios.create({
            baseURL: this.apiBase,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        });
    }

    /**
     * Fetches all or a single RevolutEntity from the API
     * @param  {RevolutEntity}  resource    The entity to fetch
     * @param  {UUID}  id                   Optional ID will fetch a specific entity
     * @return {Promise}                    Promise resolving in the given resource
     */
    async getResource({ resource, id }) {
        try {
            const { data } = await this.axios.get(resource.GetResourcePath(id));
            // Map data
            if (Array.isArray(data)) {
                return data.map(
                    entity => new resource({
                        broker: this,
                        data: entity
                    })
                );
            } else {
                return new resource({ broker: this, data });
            }
        } catch(error) {
            console.error(error);
        }
    }

}
