<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 3em;
  height: 3em;
}
.loader {
  margin: 30px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.3em solid rgba(180, 180, 180, 0.2);
  border-right: 0.3em solid rgba(180, 180, 180, 0.2);
  border-bottom: 0.3em solid rgba(180, 180, 180, 0.2);
  border-left: 0.3em solid #000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1s infinite linear;
  animation: load8 1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
