<template>
  <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="nav-section">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/requests" class="navbar-item">Anträge</router-link>
            <router-link to="/history" class="navbar-item">Verlauf</router-link>
          </div>
        </div>

        <div class="nav-section">
          <h1 class="title navbar-item">Helpy</h1>
        </div>

        <div class="nav-section">
          <div class="navbar-end">
            <div class="navbar-item" v-if="this.$route.path !== '/requests/create'">
              <router-link to="/requests/create">
                <button class="button is-outlined is-rounded">Antrag erstellen</button>
              </router-link>
            </div>

            <div class="navbar-item">
              Points: [insert here]
            </div>
            <div class="profile-picture">
              <router-link to="/profile">
                <figure class="image is-48x48 is-centered">
                  <img class="is-rounded" src="https://payload.cargocollective.com/1/23/749547/12784313/IDK_800.png" alt="Profilbild">
                </figure>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section main-content">
      <div class="container">
        <router-view />
      </div>
    </section>


    <footer class="footer">
      <div class="content has-text-centered">
        © {{ new Date().getYear() + 1900 }} Helpy
      </div>
    </footer>
  </div>
</template>

<style lang="less">
@import url("../node_modules/normalize.css/normalize.css");
@import url("../node_modules/bulma/css/bulma.min.css");

#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.nav-section {
  flex: 1;
}

.profile-picture {
  margin: 10px;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

.title {
  justify-content: center;
}

section.main-content {
  flex: 1;
}

.navbar-start {
  font-size: 20px;
}
</style>
