<template>
<!-- src="./../../../public/bgm/Main.mp3"-->
  <div id="welcome" style="padding:50px;">
    <div class='col-sm-12'><audio id="audio" controls controlsList="nodownload" type="audio/mpeg">

    </audio></div>
    <table style="width:100%">
      <tr><td style="width:5%">No</td><td style="width:50%">Title</td><td colspan="2">Genre</td></tr>
      <tr v-for="(music,index) in getMusicList" :key="index">
      <td style="width:5%">{{index+1}}</td><td style="width:50%">{{music.title}}</td><td style="width:40%">{{music.genre}}</td><td style="width:5%"><button @click="changeBGM(music.title)">Play</button></td>
      </tr>
    </table>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
export default{

  data() {
    return {
      audio: null,
    };
  },
  methods: {
    async changeBGM(title){
    var bgmTitle="bgm/"+title+".mp3"
    var audioElm = document.getElementById('audio'); 
    audioElm.pause();
    audioElm.currentTime = 0;
    audioElm.src = bgmTitle;
    console.log(audioElm.src)
    audioElm.play();

    }
  }
  ,
  computed: {
    ...mapGetters(['getMusicList'])
  }

}
  
</script>
<style scoped>
audio{
  margin-left:25%;
  margin-bottom:25px;
  width: 50%;
  }
td{
  border:1px solid #03fd03;
  border-colapse:colapse;
  color:#03fd03;
  padding:15px;
  font-size:15px;
}
h1 {
  text-align: center;
  animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
}
h1:hover{
  opacity:0.5;

}
p{
  
  text-align: center;
  position: relative;
}
.p1{
  animation-name: p1-fade-in;
  animation-duration: 2s;
  position: relative;
}
.p2{
  animation-name: p2-fade-in;
  animation-duration: 3s;
  position: relative;
}
.p3{
  animation-name: p3-fade-in;
  animation-duration: 4.5s;
  position: relative;
}
@keyframes title-fade-in {
  from {opacity:0;top:-20px;}
  to {opacity:1;top:0px;}
}
@keyframes p1-fade-in {
  0% {opacity:0;top:-20px;}
  40% {opacity:0;top:-20px;}
  100%  {opacity:1;top:0px;}
}
@keyframes p2-fade-in {
  0% {opacity:0;top:-20px;}
  60% {opacity:0;top:-20px;}
  100%  {opacity:1;top:0px;}
}
@keyframes p3-fade-in {
  0% {opacity:0;top:-20px;}
  70% {opacity:0;top:-20px;}
  100%  {opacity:1;top:0px;}
}
</style>
