<template>
  <div v-if="movie.title" class="wrapper">
    <div class="title">{{ movie.title }}</div>
    <div class="genre">{{ movie.genre + ", " + movie.year }}</div>
    <div class="sypnosis">{{ movie.sypnosis }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      movie: {}
    }
  },
  mounted () {
    this.fetchMovie(this.$route.params.code)
  },
  methods: {
    async fetchMovie (code) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/movies/${code}`, {
      })
      const data = await res.json()
      this.movie = data.data.movie
      document.title = this.movie.title + ' | Movie App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 80%;
  padding: 20px 10px;
  margin: 30px auto;
  border-radius: 20px;
  box-shadow:  0 1px 3px 1px rgba(0, 0, 0, 0.235);
  cursor: pointer;
  font-size: 16px;
  transition: all .2s;
}
.title {
  font-size: 24px;
  font-weight: bolder;
  margin: 10px 0;
}
.genre {
  font-size: 14px;
  font-style: italic;
  margin: 10px 0;
}
.sypnosis {
  font-weight: lighter;
  margin: 10px 0;
}
</style>
