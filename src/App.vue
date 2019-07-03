<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Vue.js App"/>
    <mForm caption="Task Manager"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import mForm from './components/form.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    mForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
