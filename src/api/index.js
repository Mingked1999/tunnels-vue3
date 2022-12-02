import axios from '../utils/request.js';
import base from './base.js';

const api = {
    loginUser(params){
        return axios.post(base.baseRul + base.login, params)
    }
}

export default api