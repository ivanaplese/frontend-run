<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-orange">run!</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="mx-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">About</router-link>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link">Signup</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background-color: white !important;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .text-orange {
    color: #f58634 !important;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
