import axios from "axios"
//配置默认的参数
axios.defaults.baseURL = 'http://121.40.239.63:80';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式
export default {
  //文章列表
  getArticleInfo(){
    return axios.post("/article/getInfo")
  },
  //热门文章列表
  getArticleHot(){
    return axios.post('/article/getHot');
  },
  //文章列表显示
  getArticleShow:(function(){
    let skip = 0 ;//初始0篇开始
    let limit = 5 //初始加载5篇

    return function(index=0,f=false){
      if(f){
       skip = 0 ;//初始0篇开始
       limit = 5 //初始加载5篇
      }

      let tag = ["","HTML&CSS","JavaScript","Node.js","Vue.js","Other"][index]
      let data={skip,limit,tag} //发送给后端的数据
      skip += limit //每次初始的篇数加5

      return axios.post("/article/getShow",data)
    }
  })(),
  //pv增加
  getPv(_id){
    return axios.post("/article/pv",{_id})
  },
  //文章内容
  getArticleSun(id){
    return axios.post("/article",{id})
  },
  //文章搜索
  getArticleSearch(value){
    return axios.post("/article/search",{value})
  },
  //验证码
  getVerification(){
    return axios.post('/verification/vcode')
  },
  //验证码验证正确
  getVcode(vcode){
    return axios.post("/verification/checkVcode",{vcode})
  },
  //首页热门文章请求
  getArticle(){
    return axios.post("/home/h")
  },
  //注册接口
  getRegister(option){
    return axios.post("/verification",option)
  },
  //登录接口
  getLogin(option){
    return axios.post("/login",option)
  },
  //是否登录
  getIfLogin(){
    return axios.post("/login/ifLogin")
  },
  //退出登录
  getOut(){
    return axios.post("/login/getout")
  },
  //留言接口
  commitMessage(option){
    return axios.post("/message/commit",option)
  },
  /*留言的留言接口 options => {parentId:"id",user:"id",content:"",$user:""}*/
   commitChildMessage(options){
    return axios.post('/message/childCommit',options)
  },
  //获取留言列表
  getMessageList(skip=0,limit=5){
    return axios.post('/message/getList',{skip,limit});
  },
  //最近访客
  getVisitor(){
    return axios.post('/visitor')
  },
  //日记接口
  diary(){
    return axios.post("/diary")
  },
  //友联
  linkAdd(){
    return axios.post("/links/")
  }
}