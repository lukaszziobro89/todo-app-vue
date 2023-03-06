<script setup>
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'
import { computed, reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)

const formData = reactive({
  email: "",
  password: "",
})

const errors = ref(null)

const rules = computed(() => {
  return{
    email: { required, email },
    password: { required, minLength: minLength(7) },
  }
})

const v$ = useVuelidate(rules, formData)

async function handleLogin(){
  const result = await v$.value.$validate()
  if (!result) { return }
  console.log("1")
  await useAuthStore()
    .login(formData.email, formData.password)
    .then( async response => {
      console.log("2")
      console.log(response)
      if (response.status !== 200){
        console.log("4")
        errors.value = response.response.data.detail
      }else {
        console.log("5")
        await router.push('/#')
      }
    })
    .catch( error => {
      console.log(error)
    })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img
              src="/src/assets/todo-icon.png"
              width="50"
              height="50"
            >
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Todo App
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Todo App! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="formData.email"
                label="Email"
                type="email"
              />
              <span
                v-for="error in v$.email.$errors"
                :key="error.$uid"
                class="red"
              >
                {{ error.$message }}
              </span>
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="formData.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <span
                v-for="error in v$.password.$errors"
                :key="error.$uid"
                class="red"
              >
                {{ error.$message }}
              </span>
            </VCol>

            <VCol cols="12">
              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="formData.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block=""
                type="submit"
                @click.prevent="handleLogin"
              >
                Login
              </VBtn>
            </VCol>

            <VCol cols="12">
              <p
                v-if="errors"
                class="red"
              >
                {{ errors }}
              </p>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <VDivider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";

.red {
  color: red;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
