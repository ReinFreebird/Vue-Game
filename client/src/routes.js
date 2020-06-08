import HomePage from './components/layout/Home.vue';
import NotFound from './components/layout/NotFound.vue';
import Music from './components/module/Music.vue';
import Game from './components/module/game/Index.vue'


function loadFile (route) {
  console.log(route.params.fileName);
  return {
    name:  '!'
  }
}

export const routes = [
  { path: '', component: HomePage, name: 'homePage' },
  { path: '/main', component: Music, name: 'music'},
  { path: '/game', component: Game, name: 'game'},
  { path: '/notfound', component: NotFound, name: 'notFound' },
  { path: '*', redirect: { name: 'notFound' } },
  { path: '/StreamingAssets/:fileName' , component: Game,props:loadFile},

];
