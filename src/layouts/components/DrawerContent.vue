<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <img src="/src/assets/todo-icon.png" height="50" alt="Logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          Todo App
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Account Settings',
        to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    />
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Todos' }" />
    <VerticalNavLink
      :item="{
        title: 'Add Todo',
        to: 'addtodo',
        icon: { icon: 'mdi-plus-box-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Todo List',
        to: 'todos',
        icon: { icon: 'mdi-clipboard-list-outline' }
      }"
    />

    <!-- 👉 User Interface -->
    <VerticalNavSectionTitle :item="{ heading: 'Other' }" />

    <VerticalNavLink
      :item="{
        title: 'Info',
        to: 'info',
        icon: { icon: 'mdi-information-outline' }
      }"
    />
  </ul>
</template>

<style lang="scss">

.upgrade-banner {
  margin-top: auto;
}
</style>
