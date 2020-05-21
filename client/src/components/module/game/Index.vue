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
import axios from '../../../axios-auth'

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
  mounted(){
    axios.get('/auth/me', {
        headers: {
        "authorization" : "Bearer "+localStorage.getItem('token')
      }
    })
        .then((res) => {
        console.log(res);
        console.log(localStorage.getItem('token'));
        localStorage.setItem('name',res.data.data.name);
        localStorage.setItem('email',res.data.data.email);})
        .catch(err => console.error(err))
    
  }
  
}
</script>

