<script setup>

import { computed, reactive, ref } from 'vue'
import Toast from '@core/components/Toast.vue'
import { minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useTodoStore } from '@/stores/todo.store'

const formData = reactive({
  title: "",
  content: "",
})

const errors = ref(null)
const showToast = ref(false)

const triggerToast = () => {
  showToast.value = true;
  setTimeout(() => showToast.value = false, 3000)
}

const rules = computed(() => {
  return{
    title: { required, minLength: minLength(3) },
    content: { required, minLength: minLength(5) },
  }
})

const v$ = useVuelidate(rules, formData)

async function handleAddTodo(){
  const result = await v$.value.$validate()

  if (!result) { return }
  await useTodoStore()
    .addTodo(formData)
    .then( async response => {
      if (response.status !== 200){
        errors.value = response.response.data.detail
      } else {
        triggerToast()
      }
    })
    .catch( error => {
      console.log(error)
    })
}

</script>

<template>

  <h1 class='align-center text-center'>Add todo</h1>
    <VDivider/>
    <br>

  <VRow
    style = "margin-left: 400px; margin-right: 400px"
  >
    <VCol
      cols="1"
      md="1"
      lg="12"
    >
      <VCard title="Add what you need to do"
      class='text-center'
      >
        <VCardText>

          <VForm id='todo-form'>
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <!-- 👉 Title -->
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <label for="Title">Title</label>
                  </VCol>

                  <VCol
                    cols="12"
                    md="9"
                  >
                    <VTextField
                      id="title"
                      v-model="formData.title"
                      placeholder="Title"
                      persistent-placeholder
                    />
                    <span
                      v-for="error in v$.title.$errors"
                      :key="error.$uid"
                      class="red"
                    >
                      {{ error.$message }}
                    </span>
                  </VCol>
                </VRow>
              </VCol>

              <VCol cols="12">
                <VRow no-gutters>
                  <!-- 👉 Content -->
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <label for="Content">Content</label>
                  </VCol>

                  <VCol
                    cols="12"
                    md="9"
                  >
                    <VTextField
                      id="Content"
                      v-model="formData.content"
                      placeholder="Content"
                      persistent-placeholder
                    />
                    <span
                      v-for="error in v$.content.$errors"
                      :key="error.$uid"
                      class="red"
                    >
                      {{ error.$message }}
                    </span>

                  </VCol>
                </VRow>
              </VCol>

              <!-- 👉 submit and reset button -->
              <VCol
                offset-md="3"
                cols="12"
                md="9"
                class="d-flex gap-4"
              >
                <VBtn
                  type="submit"
                  @click.prevent="handleAddTodo"
                >
                  Submit
                </VBtn>
                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <br>
  <VDivider/>
  <br>
  <div class="home">
    <transition name="toast">
      <Toast v-if="showToast" />
    </transition>
  </div>
</template>

<style scoped>
.red{
  color: red;
}
</style>
