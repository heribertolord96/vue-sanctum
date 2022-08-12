<template>
  <div class="about">
    <!-- <button @click="me()">Me</button> -->

    <div v-if="user">
      <!-- <button @click="logout()">Log out</button> -->
      <!-- <h1>Usuartio actual : {{ user.email }}</h1> -->
    </div>
    <!-- <pre>{{ user }}</pre> -->
    <form action="" @submit.prevent="login" v-else>
      <input type="email" v-model="form.email" placeholder="email" />
      <input type="password" v-model="form.password" placeholder="password" />
      <br />
      <button>Login</button>
    </form>
  </div>
  <div></div>
</template>
<script>
export default {
  data: () => ({
    // user: null,
    form: {
      email: "jl@gmail.com",
      password: "password",
    },
  }),

  methods: {
    /*     logout() {
      axios.post("/logout").then(() => {
        this.user = null;
        console.log("exit");
      });
      console.log("Enviando login", this.form);
    }, */
    async login() {
      await this.$store.dispatch("login", this.form);
    },
    /*  me() {
      
    }, */
  },
};
</script>
