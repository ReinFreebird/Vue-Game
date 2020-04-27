<template>
  <header class="app-header">
    <router-link to="/" class="app-header__logo">
      <img class="mb-1" src="../../assets/images/phire-logo-terbaru.png" style="width: 180px; padding: 5px;">
    </router-link>
    <!-- Sidebar toggle button-->
    <a class="app-sidebar__toggle" href="javascript:void(0)" data-toggle="sidebar" aria-label="Hide Sidebar" v-on:click="toggleSidebar"></a>
    <!-- Navbar Right Menu-->
    <ul class="app-nav">
      <li class="dropdown"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i class="fa fa-user fa-lg"></i></a>
        <ul class="dropdown-menu settings-menu dropdown-menu-right">
          <li><a class="dropdown-item" href="page-user.html"><i class="fa fa-cog fa-lg"></i> Settings</a></li>
          <li><a class="dropdown-item" href="page-user.html"><i class="fa fa-user fa-lg"></i> Profile</a></li>
   
          <li>
            <button class="dropdown-item" @click="handleLogout">
              <i class="fa fa-sign-out fa-lg"> </i>
              Logout
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    handleLogout() {
      localStorage.removeItem('token')
      delete this.$http.defaults.headers['Authorization']
      this.$router.push('/login')
    }
  }
}
</script>