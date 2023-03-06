import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const baseUrl = "http://localhost:8000"
// const baseUrl = import.meta.env.VITE_MS_BASE_URL
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({  }),
  actions: {

    async register(
      email, first_name, last_name, display_name, password
    ){
      try{
        return await axios.post(baseUrl + '/user/', {
          "email": email,
          "first_name": first_name,
          "last_name": last_name,
          "display_name": display_name,
          "password": password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
      }catch (e) {
        console.log(e)
        console.log(e.message)

      }
    },

    async login(email, password) {
      return await axios.post(baseUrl + `/token`, {
        "email": email,
        "password": password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }).then( user => {
        console.log("C")

        console.log(user)
        this.user = user
        // localStorage.setItem('isAuthenticated', "true")
        return user
      }).catch( error => {
        console.log("D")
        console.log(error)
        return error
      })
    },

    async userInfo(){
      return await axios.get(baseUrl + '/user/me',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }).then(user => {
          this.user = user
          return user
      }).catch( error => {
        return error
      })
    },

    async logout() {
      function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
      delete_cookie('logged_in')
      location.reload()
      await router.push('login')
    },

    async refresh() {
      console.log("refreshing access token...")
      return await axios.post(baseUrl + `/refresh`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "http://localhost:5173"
        },
        withCredentials: true
      }).then( user => {
        this.user = user
        return user
      }).catch( error => {
        return error
      })
    },
  },
})
