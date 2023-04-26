<template>
  <div
    class="modal fade"
    id="userCard"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">User Information</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <img 
              class="
                rounded-circle
                border
                border-5" 
              :src="person.picture?.large"
              :alt="`${person.name?.first} ${person.name?.last}`"
            />
          </div>
          <div class="mt-4">
            <h4 class="mb-3">
              Name:
              <small class="text-muted">
                {{ `${person.name?.title}. ${person.name?.first} ${person.name?.last}` }}
              </small>
            </h4>
            <div class="row">
              <div class="col text-nowrap">
                <h4>
                  Email:
                  <small class="text-muted">{{ person?.email }}</small>
                </h4>
              </div>
              <div class="
                d-flex
                justify-content-end
                col"
              >
                <a class="btn btn-outline-dark px-2 m-1" :href="`mailto:${person?.email}`">
                  📧
                  <span class="glyphicon glyphicon-earphone"></span>
                </a>
              </div>
            </div>

            <div class="row text-nowrap">
              <div class="col text-nowrap">
                <h4 class="text-nowrap">
                  Phone:
                  <small class="text-muted">{{ person?.phone }}</small>
                </h4>
              </div>
              <div class="d-flex justify-content-end col">
                <a 
                  class="
                    btn
                    btn-outline-dark
                    px-2
                    mx-1" 
                  :href="`tel:${person?.phone}`"
                >
                  📞
                  <span class="glyphicon glyphicon-earphone"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axiosClient from '../axiosClient';
import { onMounted, ref } from 'vue';

const person = ref({});

onMounted(() => {
  axiosClient.get(``)
    .then(({ data }) => {
      person.value = data.results[0];
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>
