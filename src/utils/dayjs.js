import Vue from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn' 
//配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') 
Vue.filter('relativeTime',value=>{
  return dayjs().to(dayjs(value)) 
})