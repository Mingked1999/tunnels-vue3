import axios from '../utils/request.js';
import base from './base.js';

const api = {
    loginUser(params){
        return axios.post(base.baseRul + base.login, params)
    },
    getLines(){
        return axios.get(base.baseRul + base.lines)
    },
    getProjects(params){
        return axios.get(base.baseRul + base.projectList,{
            params
        })
    },
    searchProjects(params){
        return axios.get(base.baseRul + base.projectSearch,{
            params
        })
    },
    ProjectNumber(){
        return axios.get(base.baseRul + base.pageNumber)
    },
    AddProject(params){
        return axios.post(base.baseRul + base.createProject,params)
    },
    DelProject(params){
        return axios.get(base.baseRul + base.delProject,{params})
    },
    PreProject(params){
        return axios.get(base.baseRul + base.preProject,{params})
    },
}

export default api