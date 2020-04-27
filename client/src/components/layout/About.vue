<template>
  <main class="app-content">
    <h1>About</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta id necessitatibus optio repudiandae sed odit sit molestias, dignissimos explicabo velit consequatur nostrum corrupti recusandae ducimus, blanditiis aperiam voluptate tempore quis voluptatem, qui itaque esse inventore maxime suscipit. Natus enim perspiciatis, corrupti nihil voluptatum quia quaerat atque iusto deleniti laborum, similique, et minima maxime saepe iste porro ratione ut nam voluptas doloribus facere. Cupiditate alias iure dolore odio praesentium cum perferendis assumenda blanditiis. Reprehenderit rerum aspernatur ut adipisci aliquam dolorem, beatae numquam id fugit. Nihil vitae ex laborum quod, hic, debitis iste ipsam adipisci, repudiandae perspiciatis at sunt cumque dolorem odio.</p>
  </main>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      formHidden: true,
      currentPassword: '',
      newPassword: '',
      rePassword: ''
    }
  },
  methods: {
    showForm() {
      this.formHidden = !this.formHidden
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>