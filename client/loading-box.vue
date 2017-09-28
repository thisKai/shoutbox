<template>
  <div class="wrapper">
    <slot></slot>
    <template v-if="loading">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
      <div class="circle circle4"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped>
.wrapper{
  position: relative;
}
.circle{
  position: absolute;
  width: 32px;
  height: 32px;
  left: 50%;
  top: 50%;
  margin-left: -16px;
  margin-top: -16px;
  border-radius: 50%;
  background-color: rgb(0,64,180);
  transform: scale(0);
  animation-name: circle;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
.circle2{
  animation-delay: 0.5s;
}
.circle3{
  animation-delay: 1s;
}
.circle4{
  animation-delay: 1.5s;
}
@keyframes circle{
  0%{
    transform: scale(0);
  }
  100%{
    transform: none;
    opacity: 0;
    color: #000;
  }
}
</style>
