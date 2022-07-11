<template>
  <div>
    <div>
      <input
        placeholder="Search for movie title..."
        v-model="title"
        @keyup.enter="fetchMovies()">
      <input
        style="width: 50px; text-align: center;"
        placeholder="year"
        v-model="year"
        @keyup.enter="fetchMovies()">
      <button class="ml" @click="fetchMovies()">Search</button>
      <button @click="reset()">Reset</button>
    </div>
    <div class="genre_wrapper">
      <div v-for="(v,k) in genres" :key="k">
        <div
          @click="genreToggler(v.title)"
          :class="{ selected: selected_genres.includes(v.title) }">
          {{ v.title }}
        </div>
      </div>
    </div>
    <div class="home">
      <Movie
        v-for="(v,k) in movies"
        :key="k"
        :data="v" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from '@/components/Movie.vue'

export default {
  name: 'HomeView',
  components: {
    Movie
  },
  data () {
    return {
      title: '',
      year: '',
      selected_genres: [],
      genres: [],
      movies: []
    }
  },
  mounted () {
    this.fetchGenres()
    this.fetchMovies()
  },
  methods: {
    reset () {
      this.title = ''
      this.year = ''
      this.selected_genres = []
      this.fetchMovies()
    },
    genreToggler (title) {
      !this.selected_genres.includes(title) ? this.selected_genres.push(title) : this.selected_genres = this.selected_genres.filter((x) => x !== title)
    },
    async fetchGenres () {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/genres`)
      const data = await res.json()
      this.genres = data.data.genres
    },
    async fetchMovies () {
      const filter = {
        title: this.title,
        year: this.year,
        genre: this.selected_genres.length > 0 ? this.selected_genres : ''
      }
      const formData = {
        filter_options: filter
      }
      const res = await fetch(`${process.env.VUE_APP_API_URL}/movies`, {
        method: 'POST',
        headers: new Headers({
          // 'auth_key': process.env.NEXT_PUBLIC_AUTH_KEY,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      this.movies = data.data.movies
    }
  }
}
</script>

<style scoped>
  .home{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding: 15px;
  }
  input, button {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.336);
    border-radius: 5px;
    padding: 10px;
    margin: 10px 5px;
    background-color: #fff;
  }
  button {
    cursor: pointer;
    transition: all .2s;
    background-color: rgba(0, 0, 0, 0.144);
    border: 1px solid transparent;
    color: #fff;
  }
  .ml {
    margin-left: 20px;
  }
  button:hover {
    background-color: rgba(128, 128, 128, 0.24);
  }
  .genre_wrapper {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }
  .genre_wrapper div div {
    border: 1px solid rgba(0, 0, 0, 0.336);
    font-size: 12px;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
  }
  .genre_wrapper div div.selected {
    background-color: rgba(128, 128, 128, 0.24);
    border: 1px solid rgba(128, 128, 128, 0.24);
    color: #fff;
  }

  @media only screen and (max-device-width: 767px) {
    input, button {
      font-size: 11px;
      margin: 5px 10px 5px 5px;
    }
    .genre_wrapper div div {
      font-size: 10px;
    }
  }

</style>
