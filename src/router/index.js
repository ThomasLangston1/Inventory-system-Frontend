import Vue from 'vue'
import Router from 'vue-router'

//components
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import CreateAccount from '../components/CreateAccount'
import Inventory from '../components/Inventory'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/login', name: 'Login', component: Login},
        {path: '/', name: 'Hello', component: HelloWorld},
        {path: '/createaccount', name: 'CreateAccount', component: CreateAccount},
        {path: '/inventory', name: 'Inventory', component: Inventory}
      ]
});