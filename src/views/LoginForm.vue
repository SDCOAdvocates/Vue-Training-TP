<template>
  <div id="login-form">
    <form @submit.prevent="login">
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous connecter.</p>
      <hr>

      <label for="email">
        <b>Email</b>
      </label>
      <input
        id="email"
        v-model="email"
        type="text"
        placeholder="Entrez votre courriel"
        name="email"
        required
      >

      <label for="password">
        <b>Mot de passe</b>
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        name="password"
        required
      >

      <p>
        <button type="submit">Se connecter</button>
        <button @click.prevent="register">S'inscrire</button>
      </p>
      <p class="error" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

export default {
    name: "LoginForm",
    data(){
        return {
            title: "Authentification",
            email: "",
            password: "",
            error: null
        }
    },
    methods: {
      async register () {
        try {
          const response = await UserService.register({
            email: this.email,
            password: this.password,
            firstname: "John",
            lastname: "Smith"
          })
          this.$store.dispatch('setUser', response.user)
          this.$store.dispatch('setToken', response.token)
          this.$router.push('/search')
        } catch (error) {
          this.error = error.toString()
        }
      },
      async login () {
        try {
          const response = await UserService.login({ email: this.email, password: this.password })
          this.$store.dispatch('setUser', response.user)
          this.$store.dispatch('setToken', response.token)
          this.$router.push('/search')
        } catch (error) {
          this.error = error.toString()
        }
      }
    }
}
</script>