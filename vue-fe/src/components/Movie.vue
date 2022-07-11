<template>
  <div class="wrapper" @click="goDetails(data.code)">
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div>{{ data.genre + ", " + data.year }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    data: Object
  },
  methods: {
    goDetails (code) {
      this.$router.push('/' + code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 30%;
  padding: 20px 10px;
}
.content {
  padding: 20px 10px;
  border-radius: 20px;
  box-shadow:  0 1px 3px 1px rgba(0, 0, 0, 0.235);
  cursor: pointer;
  font-size: 12px;
  transition: all .2s;
}
.content:hover {
  box-shadow:  0 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.title {
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 5px;
}

@media only screen and (max-device-width: 767px) {
  .wrapper {
    width: 100%;
    padding: 20px 10px;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .wrapper {
    width: 45%;
    padding: 20px 10px;
  }
}
</style>
