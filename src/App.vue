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

        <div class="nav-section"></div>
      </div>
    </nav>

    <section class="section main-content">
      <div class="container">
        <router-view />
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        © {{ new Date().getFullYear()}} Helpy
      </div>
    </footer>
  </div>
</template>

<style lang="less">
@import url("../node_modules/normalize.css/normalize.css");
@import url("../node_modules/bulma/css/bulma.min.css");

#app {
  width: 75%;
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
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
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
