import HomePage from './components/layout/Home.vue';
import NotFound from './components/layout/NotFound.vue';
import Main from './components/module/Main.vue';
import Game from './components/module/game/Index.vue'


export const routes = [
  { path: '', component: HomePage, name: 'homePage' },
  { path: '/main', component: Main, name: 'Main'},
  { path: '/game', component: Game, name: 'Game'},
  { path: '/notfound', component: NotFound, name: 'notFound' },
  { path: '*', redirect: { name: 'notFound' } },

];
