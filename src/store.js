export default {
    searchTerm: "",
    currentUser: null,
    isAdmin: false,

    checkAdmin() {
        if (this.currentUser && this.currentUser.email === "plese@gmail.com") {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    },
};