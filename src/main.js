import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from '../route'
import store from '../store/index'
import * as echarts from 'echarts'
import {
  Aside,
  Button,
  CheckboxGroup,
  Checkbox,
  Col,
  Container,
  DatePicker,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Option,
  Radio,
  RadioGroup,
  Select,
  Submenu,
  Switch,
  TimePicker,
  CheckboxButton,
  Carousel,
  CarouselItem,
  Table,
  TableColumn,
  Row,
  ButtonGroup,
  Pagination,
  RadioButton,
  Dialog
} from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(VueRouter)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Col)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(TimePicker)
Vue.use(Button)
Vue.use(CheckboxButton)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(store)
Vue.use(Row)
Vue.use(ButtonGroup)
Vue.use(Select)
Vue.use(Pagination)
Vue.use(RadioButton)
Vue.use(Dialog)
//路由守卫判断是否存在login
// router.beforeEach((to, from, next) => {
//   store.commit('getToken')
//   const token = store.state.user.token
//   if (!token && to.name !== 'login') {
//     next({
//       name: 'login'
//     })
//   } else {
//     next()
//   }
// })
new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')