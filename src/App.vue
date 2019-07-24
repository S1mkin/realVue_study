<template>
  <div id="app" class="container">

    <cubes/>

  </div>
</template>

<script>

import cubes from './components/cubes.vue'

export default {
  name: 'app',
  components: {
    cubes
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px 0;
  margin-top: 20px;
}
</style>
