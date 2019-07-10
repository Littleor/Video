// 一级路由
import Home from './routes/Home'
import Play from './routes/Play'
import Search from './routes/SearchResult'


// 二级路由
import PlayPath from './components/PlayPath'
import PlayDetail from './components/PlayDetail'
import PlayComment from './components/PlayComment'


export const routes=[
  {path: '/' ,name: 'homeLink' ,component: Home },
  {path: '/search' ,name: 'searchLink' ,component: Search },
  {path: '/play' ,name: 'playLink' ,component:Play,children:[
      {path: '/play/playpath', name: 'pathLink', component: PlayPath},
      {path:'/play/detail',name:'detailLink',component:PlayDetail},
      {path:'/play/comment',name:'commentLink',component:PlayComment},
        ]
      },
  {path:'*',redirect:'/'},


]
