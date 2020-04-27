import HomePage from './components/layout/Home.vue';
import NotFound from './components/layout/NotFound.vue';
import Main from './components/module/Main.vue';


export const routes = [
  { path: '', component: HomePage, name: 'homePage' },
  { path: '/main', component: Main, name: 'Main'},
  { path: '/notfound', component: NotFound, name: 'notFound' },
  { path: '*', redirect: { name: 'notFound' } },

];
