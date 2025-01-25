<template>
  <div
  class="login-container d-flex align-items-center justify-content-center min-vh-100"
  >
    <div class="login-content d-flex flex-row shadow-lg">
      <div class="welcome-section p-5 d-none d-md-block">
        <h1>Login to <span class="brand">run!</span></h1>
        <p>If you don’t have an account</p>
        <p>
          You can
          <router-link to="/signup" class="signup-link"
            >Sign up here!</router-link
          >
        </p>
      </div>
      <div class="login-form-section p-5">
        <h3 class="text-center mb-4">Login</h3>
        <form>
          <div class="mb-3">
            <input
              type="email"
              v-model="email"
              class="form-control custom-input"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div class="mb-4 position-relative">
            <input
              type="password"
              v-model="password"
              class="form-control custom-input"
              id="password"
              placeholder="Password"
            />
            <span class="password-toggle position-absolute"
              ><i class="bi bi-eye"></i
            ></span>
          </div>
          <button
            type="button"
            @click="login()"
            class="btn btn-primary custom-btn w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import api from "@/connection";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
       
        const authResponse = await api.post("/authAdmin", {
          email: this.email,
          password: this.password,
        });

        // On successful login, save the token and user data
        if (!store.currentUser) {
          store.currentUser = {
            id: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }; // Initialize the user object if it is null
        }

        const userData = await api.get(`/admin/email/${this.email}`);
        console.log(userData);

        // Store the user data (guest or admin
        store.currentUser = userData.data;
        console.log("podaci nakon prijave", store.currentUser);
        // Redirect the user to the home pa
        console.log("Login successful", authResponse.data.token);
        store.saveToken(authResponse.data.token);
        
        this.$router.push("/");
      } catch (error) {
        // Handle different error cases
        if (error.message === "Email not found as guest or admin") {
          this.errorMessage = "Email nije pronađen kao gost ili administrator.";
        } else {
          this.errorMessage =
            "Krivo ste upisali email ili lozinku. Molimo pokušajte ponovno.";
        }
        console.error("Login error:", error);
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  background-color: #f8f9fa;
}

.login-content {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
}

.welcome-section {
  background-color: #ffffff;
  width: 100%;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.brand {
  color: #f58634;
}

.signup-link {
  color: #f58634;
  font-weight: bold;
}

.login-form-section {
  width: 100%;
}

.custom-input {
  background-color: #f4f4f4;
  border: none;
  height: 45px;
  font-size: 1rem;
  border-radius: 10px;
  padding-left: 15px;
}

.custom-btn {
  background-color: #f58634;
  border: none;
  height: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
}

.custom-btn:hover {
  background-color: #d97329;
}

.password-toggle {
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
}

@media (max-width: 768px) {
  .welcome-section {
    display: none;
  }

  .login-content {
    flex-direction: column;
    width: 90%;
  }
}
</style>
