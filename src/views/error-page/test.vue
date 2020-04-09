<template>
  <div>
    <h1>test 页面</h1>
    <div class="box">
      <div>scss</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Test'
  }
</script>

<style scoped lang="scss">
  .box {
    div {
      color: red;
      font-size: (50vw/9.6);
    }
  }
</style>
