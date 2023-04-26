<template>
  <div class="d-flex justify-content-center">
    <h3 
      v-bind:class="[status === 'success' ? 'text-success' : 'text-danger']"
      v-if="showMessage"
    >
      {{ message }}
    </h3>
  </div>
  <div 
    class="modal fade"
    id="generateUser"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Generate New User
          </h5>
          <button 
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
          </button>
        </div>
        <div class="modal-body">
          <label class="mb-2">
            Choose a gender:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="selectedGender"
            placeholder="Choose a gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="generateUser(selectedGender)"
            data-bs-dismiss="modal"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="createUser"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create New User
          </h5>
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
                border
                rounded-circle
                mb-3" 
              :src="avatarSrc"
              alt="Avatar"
              width="100"
              height="100"
              style="object-fit: cover;" 
            />
          </div>
          <div class="input-group mb-3">
            <input
              name="imgAvatar"
              type="file"
              class="form-control"
              id="inputAvatar"
              @change="handleFileChange"
            >
          </div>
          <div>
            <div class="row">
              <div class="col mb-3">
                <input 
                  name="name"
                  v-model="newName"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  aria-label="Name"
                  required
                >
              </div>
            </div>
            <div class="mb-3">
              <select
                name="gender"
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled>Choose a gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div class="row">
              <div class="col mb-3">
                <input
                  name="phone"
                  type="tel"
                  v-model="newPhone"
                  class="form-control"
                  placeholder="+38(0__)___-__-__"
                  aria-label="Tel"
                  id="phone"
                  required
                >
              </div>
              <div class="col mb-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="newEmail"
                  class="form-control"
                  placeholder="email@example.com"
                  aria-label="Email"
                  required
                >
              </div>
            </div>

            <div>
              <input
                name="address"
                type="text"
                v-model="newAddress"
                class="form-control"
                id="inputAddress"
                placeholder="Adsress"
              >
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="addUser"
            data-bs-dismiss="modal"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>

  <table class="
    table
    table-striped
    table-hover
    mt-4"
  >
    <thead>
      <tr>
        <th scope="col">Avatar</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(list, index) in lists" :key="index">
        <td class="align-middle">
          <img
            class="rounded-circle"
            :src="list.avatar"
            alt="Avatar"
            width="50"
            height="50"
            style="object-fit: cover;" />
        </td>
        <td class="align-middle"> {{ list.name }}</td>
        <td class="align-middle">{{ list.email }}</td>
        <td class="align-middle">{{ list.phone }}</td>
        <td class="align-middle">
          <button 
            type="button"
            class="btn btn-outline-dark mx-2"
            data-bs-toggle="modal"
            data-bs-target="#userCard"
            @click="openUserCard(list)"
            :key="index"
          >
            More
          </button>
          <UserCard :user="selectedUser"/>
        </td>
      </tr>
    </tbody>

    <tbody>
      <tr v-for="(user, index) in users">
        <td class="align-middle">
          <img
            class="rounded-circle"
            :src="person.picture?.medium"
            alt="Avatar"
            width="50"
            height="50"
            style="object-fit: cover;"
          />
        </td>
        <td class="align-middle">
          {{ `${person.name?.first} ${person.name?.last}` }}
        </td>
        <td class="align-middle">{{ person?.email }}</td>
        <td class="align-middle">{{ person?.phone }}</td>
        <td class="align-middle">
          <button
            type="button"
            class="btn btn-outline-dark mx-2"
            data-bs-toggle="modal"
            data-bs-target="#userCard"
            @click="openUserCard"
            :key="index"
          >
            More
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import axiosClient from '../axiosClient';
import { onMounted, ref } from 'vue';
import UserCard from './UserCard.vue';

const person = ref({});

const avatarSrc = ref('https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg');

function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    avatarSrc.value = reader.result;
  };
}

$(document).ready(function () {
  $('#phone').inputmask("+38(099)999-99-99");
});

$(document).ready(function () {
  $('#email').inputmask("@example.com");
});

onMounted(() => {
  axiosClient.get(``)
  .then(({ data }) => {
    person.value = data.results[0];
  })
  .catch((error) => {
    console.log(error);
  });
});

const openUserCard = () => {
  document.querySelector('#userCard').classList.add('show');
};
</script>

<script>
export default {
  components: {
    UserCard,
  },

  name: "addUser",
  props: {
    avatarSrc: String,
    name: String,
    email: String,
    phone: String,
    action: String,
  },

  data() {
    return {
      lists: [],
      users: [],
      selectedGender: '',
      newName: '',
      newPhone: `+38 (045) 456-48-44`,
      newEmail: '',
      newAddress: '',
      imgAvatar: 'https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg',
      selectedUser: null,
      showMessage: false,
      status: '',
      message: '',
    };
  },

  methods: {
    openUserCard(list) {
      this.$refs.userCard.open(list);
    },
    async generateUser(gender) {
      try {
        const response = gender === 'male' 
        ? await axiosClient.get('?gender=male')
        : await axiosClient.get('?gender=female');
        const newUser = response.data.results[0];
        this.lists.unshift({
          avatar: newUser.picture.medium,
          name: newUser.name.first + ' ' + newUser.name.last,
          email: newUser.email,
          phone: newUser.phone
        });
        this.status = 'success';
        this.message = 'User was generated!';
      } catch (error) {
        this.status = 'error';
        this.message = error.message;
        console.error(error);
      } finally {
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      }
    },

    addUser() {
      if (this.newName === '' && this.newEmail === ''
        && this.newPhone === '' && this.newAddress === '') {
        return;
      }
      const newList = {
        avatar: this.imgAvatar,
        name: this.newName,
        email: this.newEmail,
        phone: this.newPhone,
        address: this.newAddress,
      };
      this.lists.unshift(newList);

      this.newName = '';
      this.newEmail = '';
      this.newPhone = '';
      this.newAddress = '';
    },
  },
};
</script>

<style>
#phone {
  outline: 0;
}

#phone:valid {
  border-color: green;
}

#phone:focus:invalid {
  border-color: red;
}
</style>