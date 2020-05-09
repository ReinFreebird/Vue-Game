<template>
  <div class="webgl-content">
      <div id="gameContainer" style="width: 960px; height: 600px"></div>
      <div class="footer">
        <div class="webgl-logo"></div>
        <div class="fullscreen" onclick="gameInstance.SetFullscreen(1)"></div>
        <div class="title">ProjectKoufuku</div>
      </div>
      <button class="btn btn-primary btn-block" @click="getToken()"><i class="fa fa-sign-in fa-lg fa-fw"></i>Get Token</button>
    </div>
    
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      
    }
  },
  methods: {
    getToken() {
      alert(localStorage.getItem('token'))
    },
  },
  
}
</script>

