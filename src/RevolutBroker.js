const Axios = require('axios');
const url = require('url');

export default class RevolutBroker {

    constructor(key, debug = false) {
        this.apiKey = key;
        this.debug = debug;
        this.apiBase = debug? 'https://sandbox-b2b.revolut.com/api/1.0' : 'https://b2b.revolut.com/api/1.0/';

        this.axios = Axios.create({
            baseURL: this.apiBase,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        })
    }

    async getResource({ resource, id }) {
        try {
            const { data } = await this.axios.get(resource.GetResourcePath(id))

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
