<template>
  <div>
    <h3>富文本编辑器</h3>
    <div id="editor"></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {};
  },
  mounted() {
    const editor = new E("#editor");
    editor.config.height = 500;
    editor.config.uploadImgShowBase64 = true;
    editor.config.customAlert = function (s) {
      console.log("上传失败： " + s);
    };
    editor.create();
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 40px;
}
#editor {
  width: 1000px;
  margin: 40px auto 0;
}
</style>