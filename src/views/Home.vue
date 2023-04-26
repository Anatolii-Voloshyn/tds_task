<template>
  <div>
    <div v-if="loading" class="spinner">
      <div class="
        d-flex
        justify-content-center
        mt-5"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <Navbar />
        <div class="container-fluid">
          <MainTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import MainTable from '../components/MainTable.vue'

const loading = ref(true)

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const init = async () => {
  await delay(1000)
  loading.value = false
}

init()
</script>
