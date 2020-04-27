<template>
  <aside class="app-sidebar">
    <ul class="app-menu">
      <SidebarItem 
        v-for="(item, index) in sidebarItems"
        v-bind:key="index"
        v-bind:name="item.name"
        v-bind:icon="item.icon"
        v-bind:link="item.link" ></SidebarItem>
    </ul>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarItems: [
        {
        name: 'Users',
        icon: 'fa-users',
        link: '/users'
        },
        {
        name: 'Warehouse',
        icon: 'fa-industry',
        link: '/warehouse'
        },
        {
        name: 'About',
        icon: 'fa-user',
        link: '/about'
        },
      ]
    }
  },
  components: {
    SidebarItem
  },
}
</script>