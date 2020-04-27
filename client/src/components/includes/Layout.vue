<template>
  <div class="app sidebar-mini" v-bind:class="{ 'sidenav-toggled': sidebarToggled }">
    <Header />
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header'
import Sidebar from './Sidebar'


export default {
  name: 'Layout',
  components: {
    Header,
    Sidebar
  },
  computed: {
    sidebarToggled() {
      return this.$store.state.sidebarToggled
    }
  }
}
</script>
