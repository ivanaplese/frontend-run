<template>
  <div
    class="signup-container d-flex align-items-center justify-content-center min-vh-100">
    <div class="signup-content p-5 shadow-lg rounded">
      <h2 class="text-center mb-4">Create an Account</h2>
      <form>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="inputFirstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="inputFirstName"
              placeholder="Enter your first name"
                v-model="firstName"
              required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputLastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="inputLastName"
              placeholder="Enter your last name"
               v-model="lastName"
              required />
          </div>
        </div>
        <div class="mb-3">
          <label for="inputBirthDate" class="form-label">Date of Birth</label>
          <input
            type="date"
            class="form-control"
            id="inputBirthDate"
             v-model="birthDate"
            required />
        </div>
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="Enter your username"
            v-model="userName"
            required />
        </div>
        <div class="mb-3">
          <label for="inputEmail" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Enter your email"
            v-model="email"
            required />
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="inputPassword" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Enter your password"
              v-model="password"
              required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputConfirmPassword" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              id="inputConfirmPassword"
              placeholder="Confirm your password"
               v-model="passwordRepeat"
              required />
          </div>
        </div>
        <!-- <button type="submit" class="btn btn-primary w-100">Sign Up</button> -->
        <button type="button" @click="signup" class="btn btn-primary w-100">
          Sign Up
        </button>
      </form>
      <div class="text-center mt-3">
        <p>
          Already have an account?
          <router-link to="/login">Log in here</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { auth } from "@/firebase.js";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  name: "SignupView",

  data() {
    return {
      firstName: "",
      lastName: "",
      birthDate: "",
      userName: "",
      email: "",
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    signup() {
      // Provera da li se lozinke poklapaju
      if (this.password !== this.passwordRepeat) {
        alert("Lozinke se ne poklapaju!");
        return;
      }
      // Kreiranje korisničkog naloga
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert("Uspješna registracija. Molimo, prijavite se.");
      // Odjavljivanje korisnika nakon registracije
      return signOut(auth);
        })
        .then(() => {

          // Preusmeravanje korisnika na login stranicu
          this.$router.push("/login");
        })
        .catch((error) => {
          if (this.password.length < 6) {
            alert("Lozinka mora imati najmanje 6 znakova.");
            return;
          }
          console.error("Došlo je do greške", error);
        });
     
    },
  },
  
};

</script>

<style scoped>
.signup-container {
  background-color: #f8f9fa;
}

.signup-content {
  background-color: white;
  max-width: 500px;
}

.signup-content h2 {
  font-weight: bold;
}

.signup-content .form-control {
  border-radius: 5px;
  height: 45px;
}

.signup-content .btn-primary {
  background-color: #f58634;
  border: none;
  height: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
}

.signup-content .btn-primary:hover {
  background-color: #d97329;
}

.signup-content p {
  font-size: 0.9rem;
}

.signup-content a {
  color: #f58634;
  font-weight: bold;
  text-decoration: none;
}

.signup-content a:hover {
  text-decoration: underline;
}
</style>

