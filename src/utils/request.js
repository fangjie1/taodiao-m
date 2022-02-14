import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
import router from '@/router';

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'
})
const refreshToKenReq = axios.create({ 
   baseURL: 'http://toutiao.itheima.net'}
)
request.interceptors.request.use(function (config) {
   const {user}=store.state
    if(user && user.token){
        config.headers.Authorization=`Bearer ${store.state.user.token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    return response;
},async function (error) {
    const status=error.response.status
    if(status===400){
        //客户端参数错误 
        Toast.fail('客户端请求参数异常')
    }
    else if(status===401){ 
    // toke无效
     const {user}=store.state
     if(!user||!user.token){
        return redirectLogin()
     }
     try {
        const {data}= await refreshToKenReq({  
            method: 'PUT',
            url: '/v1_0/authorizations',
            headers:{
                Authorization: `Bearer ${user.refresh_token}`
            }
         })
        //拿到新的token之后把它更新到容器中
         user.token = data.data.token
         store.commit('setUser',user)
        //把失败的请求重新发出去，error.config是失败请求的配置对象，
        // 它的请求拦截器中通过store容器访问到新的token数据
         return request(error.config)
     } catch (error) {
         redirectLogin()
     }
    } else if(status===403){
        Toast.fail('没有操作权限')
        // 没有权限 
    }else if (status>=500){
        // 服务端异常
        Toast.fail('服务端异常，请稍候重试')
    }
    return Promise.reject(error);
})
function redirectLogin(){
    router.replace({
        name: 'login',
    // 传递查询参数,会以？作为分隔符放到url后面
    // router.currentRoute等于组件中的this.$route
        query: {
            redirect: router.currentRoute.fullPath
    }
    })
}
export default request
