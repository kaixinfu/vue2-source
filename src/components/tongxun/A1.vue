<template>
  <div class="hello">
    <A11 />
  </div>
</template>

<script>
import A11 from './A11';
export default {
  name: 'A1',
  props: {

  },
  mounted() {
    console.log('......props', this.props);
    console.log('......this.$attr', this.$attrs);
  },
  components: {
    A11
  },
  created() {
    console.log('A1........created');
    this.$bus.$on('go', (val) => {
      console.log('我是祖先 =====>>> A1', val)
    })
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
