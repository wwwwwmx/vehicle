import VueRouter from 'vue-router'
import MyMain from '../views/MyMain'
import MyHome from '../views/home/index'
import MySelf from '../views/self/index'
import MyUser from '../views/user/index'
import MyCar from '../views/car/index'
import MyPicture from '../views/picture/index'
import MyLogin from '../views/login/index'
//解决路径冗余
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'MyMain',
    component: MyMain,
    redirect: '/login',
    meta: {
      show: true
    },
    children: [{
      path: '/home',
      name: 'MyHome',
      component: MyHome,
      meta: {
        show: true
      }
    }, {
      path: '/self',
      name: 'MySelf',
      meta: {
        show: true
      },
      component: MySelf
    }, {
      path: '/user',
      name: 'MyUser',
      meta: {
        show: true
      },
      component: MyUser
    }, {
      path: '/car',
      name: 'MyCar',
      meta: {
        show: true
      },
      component: MyCar,
    }, {
      path: '/picture',
      name: "MyPicture",
      meta: {
        show: true
      },
      component: MyPicture
    }, {
      path: '/login',
      name: "MyLogin",
      meta: {
        show: false
      },
      component: MyLogin
    }]
  }]
})