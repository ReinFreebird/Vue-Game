<template>
  <div id="welcome">
    <h1>Welcome to Phire Studio Pond of Wisdom</h1>
    <p class="p1">Human </p>
    <p class="p2">yes</p>
    <p class="p3">Would you like to join us?</p>
    
  </div>
</template>

<style scoped>

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
