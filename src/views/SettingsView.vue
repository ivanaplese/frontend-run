<template>
    <div class="user-settings">
      <h2>Postavke korisnika</h2>
  
      <div class="form-group">
        <label for="currentPassword">Trenutna lozinka:</label>
        <input
          v-model="currentPassword"
          type="password"
          id="currentPassword"
          class="form-control" />
      </div>
  
      <div class="form-group">
        <label for="newPassword">Nova lozinka:</label>
        <input
          v-model="newPassword"
          type="password"
          id="newPassword"
          class="form-control" />
      </div>
  
      <div class="form-group">
        <label for="confirmPassword">Potvrdite novu lozinku:</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="form-control" />
      </div>
  
      <button @click="changePassword" class="btn btn-primary">
        Promijeni lozinku
      </button>
    </div>
  </template>
  
  <script>
  import {
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
  } from "firebase/auth";
  import { auth } from "@/firebase.js";
  export default {
    data() {
      return {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert("Nove lozinke se ne poklapaju!");
          return;
        }
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          this.currentPassword
        );
        reauthenticateWithCredential(user, credential)
          .then(() => {
            return updatePassword(user, this.newPassword);
          })
          .then(() => {
            alert("Lozinka uspješno promijenjena.");
            this.currentPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
          })
          .catch((error) => {
            console.error("Došlo je do greške prilikom promjene lozinke", error);
            if (error.code === "auth/wrong-password") {
              alert("Trenutna lozinka nije ispravna.");
            } else {
              alert("Došlo je do greške. Pokušajte ponovo.");
            }
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .user-settings {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .btn {
    margin-top: 10px;
    background-color: #f58634;
  }
  </style>