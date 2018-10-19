const EventEmitter = require('events');
const Axios = require('axios');
const url = require('url');

export default class RevolutBroker extends EventEmitter {

    constructor(key, debug = false) {
        super();
        this.apiKey = key;
        this.debug = debug;
        this.apiBase = debug? 'https://sandbox-b2b.revolut.com/api/1.0' : 'https://b2b.revolut.com/api/1.0/';

        this.on('get-resource', this.getResource);
    }

    async getResource({ resource, id = '' }) {
        try {
            const { data } = await Axios.get(this.apiUrl(resource.path, id))

            // Map data
            if (Array.isArray(data)) {
                return data.map(entity => resource.CreateFrom(entity));
            } else {
                return resource.CreateFrom(data);
            }

        } catch(error) {
            console.error(error);
        }
    }

    async getResourceRaw({ resource, id = '' }) {
        try {
            const response = await Axios.get(this.apiUrl(resource, id))
            return response.data;
        } catch(error) {
            console.error(error);
        }
    }

    apiUrl(...resources) {
        return url.resolve(this.apiBase, ...resources);
    }

}
