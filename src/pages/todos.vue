<script setup>

import CardBasic from '@/views/pages/cards/card-basic/CardBasic.vue'
import CardNavigation from '@/views/pages/cards/card-basic/CardNavigation.vue'
import CardSolid from '@/views/pages/cards/card-basic/CardSolid.vue'


import { useTodoStore } from '@/stores/todo.store'
import { ref } from 'vue'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar8 from '@/assets/images/avatars/avatar-8.png'

const todos = ref([])

async function getTodos(){
  return await useTodoStore()
    .fetchTodos()
    .then( response => {
      todos.value = response.data
    })
}

async function deleteTodo(todo_id){
  return await useTodoStore()
    .deleteTodo(todo_id)
    .then( response => {
      console.log(response)
      getTodos()
    })
}



onMounted(() => {
  getTodos()
});

const solidCardData = [
  {
    cardBg: '#438aec',
    title: 'Twitter Card',
    icon: 'mdi-twitter',
    text: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
    avatarImg: avatar4,
    avatarName: 'Mary Vaughn',
    likes: '1.2k',
    share: '80',
  },
  {
    cardBg: '#438aec',
    title: 'Facebook Card',
    icon: 'mdi-facebook',
    text: 'You\'ve read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients in an.',
    avatarImg: avatar1,
    avatarName: 'Eugene Clarke',
    likes: '3.2k',
    share: '49',
  },
  {
    cardBg: '#438aec',
    title: 'Linkedin Card',
    icon: 'mdi-linkedin',
    text: 'With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is directed.',
    avatarImg: avatar8,
    avatarName: 'Anne Burke1',
    likes: '1.2k',
    share: '80',
  },
]

</script>

<template>
  <span>
  <VDivider/>
    <h3 class="text-h3 text-center font-weight-black font-italic">
      Your todos
    </h3>
  <VDivider/>
  <VDivider/>
    <br>
  </span>
  <VRow
    style = "margin-left: 200px; margin-right: 200px"
  >
<!--    <VCardActions class="justify-center">-->
<!--      <VBtn-->
<!--        block=""-->
<!--        type="submit"-->
<!--        @click.prevent="getTodos"-->
<!--        variant="elevated">-->
<!--        get todos-->
<!--      </VBtn>-->
<!--    </VCardActions>-->

    <VCol
      v-for="todo in todos"
      :key="todo.id"
      cols="12"
      md="6"
      lg="3"
    >
      <VCard
        :color="solidCardData[2].cardBg"
        class="text-center">
        <VCardText class="d-flex flex-column justify-center align-center">
          <VAvatar
            color="white"
            variant="tonal"
            size="50"
            class="mb-4"
          >
            <img src="/tickbox.png" height="30" alt="Logo" />
          </VAvatar>

<!--          <h6 class="text-h6 text-white">-->
            <VDivider color='white'/>
<!--          </h6>-->
          <h6 class="text-h6 text-white">
            {{ todo.title }}
          </h6>
          <h6 class="text-h6 text-white">
            {{ todo.content }}
          </h6>
        </VCardText>

        <VCardText>
          <p>
            {{ todo.todo }}
          </p>
        </VCardText>

        <VCardActions class="justify-center">
          <VBtn
            block=""
            type="submit"
            @click.prevent="deleteTodo(todo.id)"
            variant="elevated"
            color='white'
          >
            Remove
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>
