import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import axios from "axios";
import { useCookies } from "vue3-cookies";

axios.defaults.baseURL = 'http://localhost:8000/';
// axios.defaults.baseURL = import.meta.env.VITE_MS_BASE_URL;

const { cookies } = useCookies();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  publicPath: "/vue-todo/",
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;
    const {status, data} = await axios.post('refresh', {}, {
      withCredentials: true
    });
    if (status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      return axios(error.config);
    }
  }
  refresh = false;
  return error;
});

router.beforeEach(
  (to, from, next) => {

    const isLoggedIn = cookies.get('logged_in')

    if (!isLoggedIn) {
        document.cookie = 'logged_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    if (isLoggedIn || to.name === 'login' || to.name === 'register') {
      next()
    } else {
      next({name: 'login'})
    }
  })
export default router
