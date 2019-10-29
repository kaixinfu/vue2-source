<template>
  <div class="hello">
    <A111 />
  </div>
</template>

<script>
import A111 from './A111';
export default {
  inject: ['info'],
  name: 'A11',
  props: {

  },
  mounted() {
    console.log('A11......this.info', this);
  },
  components: {
    A111
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
