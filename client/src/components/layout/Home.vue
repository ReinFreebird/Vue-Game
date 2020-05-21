<template>
  <div id="welcome" style="padding:50px;">
    <div class="col-sm-3">
    <img style="height:500px;" src="./../../../public/ReinSprite.png" alt="Girl in a jacket">
    
    
    </div>
    <div class='col-sm-9'>
    <h1>REIN FREEBIRD</h1>
    <h4 style="animation-delay:1.5s;">TeamArcanaSoul Production</h4>
    <p style="animation-delay:2s;">Programmer | Hobbyist Music Producer | Game Developer</p>
    <p style="font-style:italic;margin-top:25px;animation-delay:2.5s;">"Without Music, Life would be a mistake"- Friedrich Nietcsche</p>
    <p style="margin-top:25px;animation-delay:3s;">I'm a Programmer with a goal on creating solutions that solve problems, especially in the SME sector. Started in the IT world intrested in Mobile Programming, now I am focusing on developing mostly API-based applications. Naturally a problem solver, with knowledge on knowing where to find what is needed to solve a problem at hand. Keen to learn new, broad and various subjects while keep refining skills already acquired. Creative works includes Music Production of various genre, with main focus on game composing, and also creating Unity Game Engine based casual 2d games. Always open for project ideas and other colaborations</p>
    <p style="margin-top:25px;animation-delay:3.5s;">See my works here</p>
        <router-link :to="{ name: 'music' }" style="color:#03fd03;display:block;animation-delay:3.8s;"> &rarr;(Ongoing) Unnamed Music Album</router-link>
        <router-link :to="{ name: 'game' }" style="color:#03fd03;display:block;animation-delay:4.2s;">&rarr;(Ongoing) Project Koufuku (tentative name)</router-link>
      
    <p style="margin-top:25px;animation-delay:4.5s;">Contact me via email: teamarcanasoul@gmail.com</p>
    </div>

    <div class='col-sm-12'><audio id="bgm" loop src="bgm/Main.mp3" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio></div>
  </div>
  

</template>
<script>
export default{
  methods: {
    toggleMute(){
    var audioElm = document.getElementById('bgm'); 
    audioElm.muted = !audioElm.muted;
    },
    getSRC(){
    var audioElm = document.getElementById('bgm'); 
    console.log(audioElm.src);
    }
  },
  mounted() {
    var audioElm = document.getElementById('bgm'); 
    audioElm.play();
  }

}
  
</script>
<style scoped>
a{
  opacity:0;
  font-family: "Lucida Console", Courier, monospace;
   animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
  color:#03fd03;
  animation-delay:1s;
  animation-fill-mode: forwards
}
.vl {
  opacity:0;
  animation-name: vertical-line-fade-in;
  animation-delay:1s;
  animation-fill-mode: forwards;
  border-left: 1px solid #03fd03;
  height: 500px;
}
img{
  display:block;
  margin-left: auto;
  margin-right: auto;
  animation-name: image-fade-in;
  animation-duration: 4s;
  transition: opacity 0.7s;
  position: relative;
  color:white;
}
a{
  color:white;
}
h1 {
  opacity:0;
  font-family: "Lucida Console", Courier, monospace;
  text-align: left;
  animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
  color:#03fd03;
  animation-delay:1s;
  animation-fill-mode: forwards
}
h4{
  opacity:0;
  font-family: "Lucida Console", Courier, monospace;
  text-align: left;
  animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
  color:#03fd03;
  animation-fill-mode: forwards;
}
p{
  opacity:0;
  font-family: "Lucida Console", Courier, monospace;
  text-align: left;
  animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
  color:#03fd03;
  animation-fill-mode: forwards;
}
ul{
    opacity:0;
  font-family: "Lucida Console", Courier, monospace;
  text-align: left;
  animation-name: title-fade-in;
  animation-duration: 2s;
  transition: opacity 0.7s;
  position: relative;
  color:#03fd03;
  animation-fill-mode: forwards;
}
li{
  font-family: "Lucida Console", Courier, monospace;
}
@keyframes title-fade-in {
  from {display:block;opacity:0;top:-20px;}
  to {display:block;opacity:1;top:0px;}
}
@keyframes vertical-line-fade-in {
  from {opacity:0;}
  to {opacity:1;}
}
@keyframes image-fade-in {
  from {opacity:0;left:-30px;}
  to {opacity:1;left:0px;}
}
</style>
