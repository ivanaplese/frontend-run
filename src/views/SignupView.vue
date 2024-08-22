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
                required />
            </div>
            <div class="col-md-6 mb-3">
              <label for="inputLastName" class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="inputLastName"
                placeholder="Enter your last name"
                required />
            </div>
          </div>
          <div class="mb-3">
            <label for="inputBirthDate" class="form-label">Date of Birth</label>
            <input
              type="date"
              class="form-control"
              id="inputBirthDate"
              required />
          </div>
          <div class="mb-3">
            <label for="inputUsername" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="inputUsername"
              placeholder="Enter your username"
              required />
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="Enter your email"
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
                required />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Sign Up</button>
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
  export default {
    name: "SignupView",
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