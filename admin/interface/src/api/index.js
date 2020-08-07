import axios from 'axios'

//配置默认的参数
axios.defaults.baseURL = 'http://121.40.239.63:8888';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

export default {
  //发表文章的接口
  article({type,title,content,region,pic}){
    return axios.post("/article/",{type,title,content,region,pic})
  },
  //查找的接口
  articleChanged(skip=0,limit=5,id){
    return axios.post("/article/changed",{skip,limit,id})
  },
  //删除文章
  articleDelet(id){
    return axios.post("/article/delet",{id})
  },
  //编辑文章
  articleRedact({type,title,tag,surface,content}){
    return axios.post("/article/redactA",{type,title,tag,surface,content})
  },
  //编辑文章
  articleRedactA(id){
    return axios.post("/article/redact",{id})
  },
  //用户权限
  userJurisdiction(_id,disabled,admin){
    return axios.post("/user/",{_id,disabled,admin})
  },
  //删除用户
  userDelet(_id){
    return axios.post("/user/delet",{_id})
  },
  //删除留言
  contentDelet(_id){
    return axios.post("/content/",{_id})
  },
  //添加日记
  diaryAdd({content,surface}){
    return axios.post("/diary/Add",{content,surface})
  },
  //删除日记
  diaryDelet(_id){
    return axios.post("/diary/Delet",{_id})
  },
  //添加友联
  linkAdd({title,guide,img,content}){
    return axios.post("/link/",{title,guide,img,content})
  },
  //删除日记
  linkDelet(_id){
    return axios.post("/link/Delet",{_id})
  },
  //登录后台
  login(user,pwd){
    return axios.post("/login",{user,pwd})
  },
  //判断登录没有
  ifLogin(){
    return axios.post("/login/ifLogin")
  }
}
/*
export function uploadArticleSurface(){

}
*/
