<template>
    <div class="user-profile">
      <h2>Profil korisnika</h2>
  
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          readonly />
      </div>
  
      <div class="form-group">
        <label for="displayName">Name and Surname:</label>
        <input
          type="text"
          id="displayName"
          v-model="displayName"
          class="form-control" />
      </div>
  
      <button @click="updateProfile" class="btn btn-primary">
        Ažuriraj profil
      </button>
    </div>
  </template>
  
  <script>
  import { auth } from "@/firebase.js";
  import { onAuthStateChanged, updateProfile } from "firebase/auth";
  export default {
    data() {
      return {
        email: "",
        displayName: "",
      };
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          this.displayName = user.displayName || "";
        }
      });
    },
    methods: {
      updateProfile() {
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: this.displayName,
        })
          .then(() => {
            alert("Profil uspješno ažuriran.");
          })
          .catch((error) => {
            console.error(
              "Došlo je do greške prilikom ažuriranja profila",
              error
            );
            alert("Došlo je do greške. Pokušajte ponovo.");
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .btn {
    margin-top: 10px;
  }
  </style>