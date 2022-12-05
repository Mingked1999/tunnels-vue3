import axios from "axios"
 
const errorHandle = (status,info) =>{
    switch(status){
        case 400:
            console.log("400 Bad Request");
            break;
        case 401:
            console.log("401 Unauthorized");
            break;
        case 403:
            console.log("403 Forbidden");
            break;
        case 404:
            console.log("404 Not Found");
            break;
        case 500:
            console.log("500 Internal Server Error");
            break;
        case 502:
            console.log("502 Bad Gateway");
            break;
        default:
            console.log(info);
            break;
    }
}
/**
 * 创建Axios对象
 */
const instance = axios.create({
    timeout:5000
})
 
instance.interceptors.request.use(
    config =>{
        if(config.method === 'post' || config.method === 'put'){
            config.headers =  {
                'Content-type': 'application/x-www-form-urlencoded',
                //config.data = queryString.stringify(config.data)
            }
        }
        return config
    },
    error => Promise.reject(error)
)
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error =>{
        const { response } = error;
        if(response){
            errorHandle(response.status,response.info)
        }else{
            console.log("Request was intercepted");
        }
    }
)
export default instance