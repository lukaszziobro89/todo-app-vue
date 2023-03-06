<script setup>
import { useTheme } from 'vuetify'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import { ref, reactive, computed } from "vue"
import useVuelidate from "@vuelidate/core"
import { required, minLength, email, sameAs } from "@vuelidate/validators"
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)

const formData = reactive({
  email: "",
  first_name: "",
  last_name: "",
  display_name: "",
  password: "",
  passwordConfirm: "",
})

const rules = computed(() => {
  return{
    email: { required, email },
    first_name: { required, minLength: minLength(3)},
    last_name: { required, minLength: minLength(3)},
    display_name: { required, minLength: minLength(3)},
    password: { required, minLength: minLength(7) },
    passwordConfirm: { required, sameAs: sameAs(formData.password) },
  }
})

const v$ = useVuelidate(rules, formData)

async function handleRegister(){
  const result = await v$.value.$validate()
  if (!result) { return }
  await useAuthStore().register(
    formData.email,
    formData.first_name,
    formData.last_name,
    formData.display_name,
    formData.password,
  )
  await router.push('login')
  location.reload()
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
              height="50"
              alt="Logo"
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
            <!-- first_name -->
            <VCol cols="12">
              <VTextField
                v-model="formData.first_name"
                label="First name"
                type="text"
              />
              <span
                v-for="error in v$.first_name.$errors"
                :key="error.$uid"
                class="red"
              >
                {{ error.$message }}
              </span>
            </VCol>
            <!-- last_name -->
            <VCol cols="12">
              <VTextField
                v-model="formData.last_name"
                label="Last name"
                type="text"
              />
              <span
                v-for="error in v$.last_name.$errors"
                :key="error.$uid"
                class="red"
              >
                {{ error.$message }}
              </span>
            </VCol>
            <!-- display_name -->
            <VCol cols="12">
              <VTextField
                v-model="formData.display_name"
                label="Display name"
                type="text"
              />
              <span
                v-for="error in v$.display_name.$errors"
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
              <VTextField
                v-model="formData.passwordConfirm"
                label="Confirm Password"
                :type="isPasswordConfirmVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
              />
              <span
                v-for="error in v$.passwordConfirm.$errors"
                :key="error.$uid"
                class="red"
              >
                {{ error.$message }}
              </span>
            </VCol>

            <VCol cols="12">
              <!-- login button -->
              <VBtn
                block=""
                type="submit"
                @click.prevent="handleRegister"
              >
                Register
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'login' }"
              >
                Login
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
