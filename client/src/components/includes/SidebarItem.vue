<template>
  <li>
    <router-link v-bind:to="link" class="app-menu__item" v-bind:class="currentPage.includes(link) ? 'active': ''">
      <i class="app-menu__icon fa" v-bind:class="icon"></i>
      <span class="app-menu__label">{{ name }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    name: String,
    icon: String,
    link: String,
  },
  computed: {
    currentPage() {
      return this.$route.path
    }
  }
}
</script>