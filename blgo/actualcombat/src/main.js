import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,MessageBox,Input,Form,FormItem,Timeline,TimelineItem,Card,Row,Link,Upload,Dialog} from 'element-ui'
Vue.use(Form).
    use(FormItem).
    use(Input).
    use(Timeline).
    use(Button).
    use(TimelineItem).
    use(Card).
    use(Row).
    use(Link).
    use(Upload).
    use(Dialog)
Vue.prototype.$msgbox = MessageBox;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
