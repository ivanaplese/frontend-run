<template>
    <div
      class="login-container d-flex align-items-center justify-content-center min-vh-100">
      <div class="login-content d-flex flex-row shadow-lg">
        <div class="welcome-section p-5 d-none d-md-block">
          <h1>Login to <span class="brand">run!</span></h1>
          <p>If you don’t have an account</p>
          <p>You can <a href="#" class="signup-link">Sign up here!</a></p>
        </div>
        <div class="login-form-section p-5">
          <h3 class="text-center mb-4">Login</h3>
          <form>
            <div class="mb-3">
              <input
                type="email"
                class="form-control custom-input"
                id="email"
                placeholder="Enter email" />
            </div>
            <div class="mb-4 position-relative">
              <input
                type="password"
                class="form-control custom-input"
                id="password"
                placeholder="Password" />
              <span class="password-toggle position-absolute"
                ><i class="bi bi-eye"></i
              ></span>
            </div>
            <button type="submit" class="btn btn-primary custom-btn w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
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
    color: #f58634; /* Orange color to match the button */
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
  