<template>
  <div id="app" class="container">
    <!--img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Vue.js App"/>
    <mForm caption="Task Manager"/-->
    <br>
      
    <cubesTest/>
    <br>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import mForm from './components/form.vue'
import cubesTest from './components/cubesTest.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    mForm,
    cubesTest,
  },
  data() {
    return {
      number: 0
    }
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
}
</style>
