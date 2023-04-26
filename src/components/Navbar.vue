<template>
  <nav class="navbar" style="background-color: #ececec">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">
        <img
          class="navbar-brand"
          width="100"
          src="../images/logo-1.webp"
          alt="tds logo"
        />
      </router-link>
      <form class="d-flex" role="search">
        <button
          type="button"
          class="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#generateUser"
        >
          Generate New User
        </button>
        <button
          type="button"
          class="
            btn
            btn-outline-dark
            mx-2" 
          data-bs-toggle="modal"
          data-bs-target="#createUser"
        >
          Create New User
        </button>
      </form>
    </div>
  </nav>
</template>

<script setup>
</script>