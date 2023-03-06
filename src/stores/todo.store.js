import { defineStore } from 'pinia'
import axios from 'axios'
import theme from '@/plugins/vuetify/theme'
import { ca } from 'vuetify/locale'

const baseUrl = `http://localhost:8000`
// const baseUrl = import.meta.env.VITE_MS_BASE_URL

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todoList: []
  }),
  actions: {
    async fetchTodos(){
      try{
        return await axios.get(baseUrl + '/user/todo', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
        })
          .then(response => {
            return  response
          })
          .catch(error => error)
      }catch (e) {
        console.log(e)
      }
    },

    async deleteTodo(id){
      try{
        return await axios.delete(baseUrl + '/user/todo/delete/'+ id, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
        })
          .then(response => {
            console.log(response)
            return response
          })
          .catch(error => error)
      }catch (e) {
        console.log(e)
      }
    },

    async addTodo(todo){
      try{
        return await axios.post(baseUrl + '/user/todo/add', {
          "title": todo.title,
          "content": todo.content,
          "completed": false
        },{
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true,
        })
          .then(response => {
            console.log(response)
            return response
          })
          .catch(error => error)
      }catch (e) {
        console.log(e)
      }
    }
  }
})
