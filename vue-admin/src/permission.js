import router from './router'
// import store from './store'
import { Message } from 'element-ui'
import { getToken,setToken } from '@/utils/authority'
import getPageTitle from '@/utils/pageTitle'
const whiteList = ['/login']
router.beforeEach(async (to,from,next)=>{
  document.title = getPageTitle(to.meta[1]);
  const hasToken = getToken();
  if(hasToken){
    if(to.path === '/login'){
      Message.success('登陆成功')
      next('/')
    }else{
      next()
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      setToken(123)
      next()
    } else {
      next('/login')
    }
  }
})