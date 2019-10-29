<template>
  <div id="app">
    <div>
      <router-link to="/">BBBB</router-link> |
      <router-link to="/C">CCCC</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import A from './components/tongxun/A.vue'

export default {
  name: 'app',
  components: {
    A
  },
  beforeCreate() {
    console.log('APP ........ beforeCreate')
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
