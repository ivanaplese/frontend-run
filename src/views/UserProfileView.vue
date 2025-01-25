<template>
  <div class="user-profile">
    <h2>User Profile</h2>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="form-control"
        readonly
      />
    </div>

    <div class="form-group">
      <label for="displayName">Name and Surname:</label>
      <input
        type="text"
        id="displayName"
        v-model="displayName"
        class="form-control"
      />
    </div>

    <button @click="updateProfile" class="btn btn-primary">
      Update Profile
    </button>

    <h2 class="mt-4">User Settings</h2>

    <div class="form-group">
      <label for="currentPassword">Current Password:</label>
      <input
        v-model="currentPassword"
        type="password"
        id="currentPassword"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="newPassword">New Password:</label>
      <input
        v-model="newPassword"
        type="password"
        id="newPassword"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm New Password:</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        class="form-control"
      />
    </div>

    <button @click="changePassword" class="btn btn-primary">
      Change Password
    </button>
  </div>
</template>


<script>
import api from "@/connection";
import store from "@/store";

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  computed: {
    email() {
      return store.currentUser.email || "";
    },
    displayName: {
      get() {
        return store.currentUser.username || "";
      },
      set(newName) {
        store.currentUser.username = newName;
      },
    },
  },

  methods: {
    async updateProfile() {
      try {
        console.log(this.displayName);
        console.log(this.email);
        const changeResponse = await api.put("/admin", {
          _id: store.currentUser._id,
          email: this.email,
          username: this.displayName,
        });
        alert("Profile successfully updated.");
      } catch (error) {
        console.error("An error occurred while updating the profile", error);
        alert("An error occurred. Please try again.");
      }
    },

    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("The new passwords do not match!");
        return;
      }
      try {
        const authResponse = await api.post("/authAdmin", {
          email: store.currentUser.email,
          password: this.currentPassword,
        });


        const passChangeResponse = await api.put("/passAdmin", {
          _id: store.currentUser._id,
          password: this.newPassword,
        });
    console.log("Password changed successfully", passChangeResponse);
      } catch (error) {
        console.error("An error occurred while changing the password", error);
        if (error.code === "auth/wrong-password") {
          alert("The current password is incorrect.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
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
  background-color: #f58634;
  border-color: #f58634;
  color: white;
}
.mt-4 {
  margin-top: 40px;
}
</style>