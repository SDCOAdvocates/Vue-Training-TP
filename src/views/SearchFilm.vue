<template>
   <main>
      <button id="logout-btn" @click="logout">Se déconnecter</button>

       <form @submit.prevent="searchFilms">
      <label for="query">
        Chercher un film
      </label>
      <input
        id="query"
        v-model="query"
        type="search"
        name="query"
        required
      >

      <button type="submit">
        Chercher
      </button>
    </form>

    <p class="error" v-if="error">{{error}}</p>
    <ul class="films" v-else >
      <FilmCard v-for="film in films" :key="film.title" :film="film" />
    </ul>
  </main>
</template>

<script>
import FilmCard from "@/components/FilmCard.vue"
import FilmService from "@/services/FilmService.js";

export default {
  name: "SearchFilm",
  components: {
    FilmCard
  },
  data(){
      return {
          query: "",
          films: [],
          error: null
      }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/login')
    },
    searchFilms(){
      FilmService.search(this.query).then(result => {
        this.films = [result];
        this.error = null;
      }).catch(error => {
        this.error = error.toString();
      })
    }
  }
}
</script>