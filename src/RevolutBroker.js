const EventEmitter = require('events');
const Axios = require('axios');
const url = require('url');

export default class RevolutBroker extends EventEmitter {

    constructor(key, debug = false) {
        super();
        this.apiKey = key;
        this.debug = debug;
        this.apiBase = debug? 'https://sandbox-b2b.revolut.com/api/1.0' : 'https://b2b.revolut.com/api/1.0/';

        this.axios = Axios.create({
            baseURL: this.apiBase,
            headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }
        })

        this.on('get-resource', this.getResource);
    }

    async getResource({ resource, id = '' }) {
        try {
            const { data } = await this.axios.get(resource.GetResourcePath());

            console.log(data);

            // Map data
            if (Array.isArray(data)) {
                return data.map(entity => new resource(entity, this));
            } else {
                return new resource(data, this);
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

}
