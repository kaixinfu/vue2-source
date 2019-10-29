<template>
  <div class="hello">
    <A1 :msg="msg" />
    <A2 :msg="msg" />
  </div>
</template>

<script>
import A1 from './A1';
import A2 from './A2';
export default {
  provide() {
    return {
      info: this
    }
  },
  name: 'A',
  props: {

  },
  data() {
    return {
      msg: 'AAAAAA'
    }
  },
  components: {
    A1,
    A2,
  },
  created() {
    console.log('A........created');
    this.$bus.$on('go', (val) => {
      console.log('我是祖先 =====>>> A', val)
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
