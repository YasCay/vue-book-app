import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import SearchResults from '../components/SearchResults.vue';
import BookDetails from '../components/BookDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/details/:id',
    name: 'BookDetails',
    component: BookDetails,
    props: true
  }
  // Weitere Routen hier...
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
