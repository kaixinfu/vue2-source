<template>
  <div id="app">
    <input
      @change="fileChange($event)"
      type="file"
      accept="image/*"
    > //上传图片类型
    <div class="add">
      <input
        @change="fileChange($event)"
        type="file"
        accept="image/*"
      >
      <div class="add-image">
        <div class="add-ico">
          <!-- <img src="../../../static/info3.png" alt=""> -->
        </div>
        <img
          class="add-img"
          v-show="imgL"
          :src="imgL"
          alt=""
        >
      </div>
      <p class="font13">点击上传名片</p>
    </div>
  </div>
</template>

<script>
import A from "./components/tongxun/A.vue";
import { fileAdd } from "./a.js";

export default {
  name: "app",
  data() {
    return {
      imgL: false
    };
  },
  components: {
    A
  },
  beforeCreate() {
    // console.log("APP ........ beforeCreate");
  },
  mounted() {},
  methods: {
    //判断是否图片类型
    fileChange(el) {
      // console.log(el.target.files[0].size)
      if (!el.target.files[0].size) {
        this.$msgbox("请选择图片文件");
        return;
      } else {
        this.fileList(el.target);
        el.target.value = "";
      }
    },
    //判断是否为文件夹文件
    fileList(fileList) {
      let files = fileList.files;
      //判断是否为文件夹
      if (files.type != "") {
        fileAdd(files[0]);
      } else {
        this.$msgbox("请选择图片文件");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
