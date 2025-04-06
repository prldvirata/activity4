<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <span class="navbar-brand">Subscriptions</span>
        <ul class="nav justify-content-center">
            <li class="nav-item active" v-if="loggedIn === 'false'">
                <a class="nav-link" @click="register">Register</a>
            </li>
            <li class="nav-item" v-if="loggedIn === 'true'">
                <a class="nav-link" @click="logout">Logout</a>
            </li>
        </ul>
    </nav>
</template>
<script>
import { getAuth } from "firebase/auth";
import auth from '../firebaseDb'

export default {
    name: 'Navbar',
    data() {
        return {
            loggedIn: 'false',
        }
    },
    beforeCreate() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    updated() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    mounted() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    methods: {
        logout() {
            auth = getAuth();
            auth.signOut().then(() => {
                this.loggedIn = 'false';
                //localStorage.removeItem("log_user");
                this.$router.push('/');
            })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
        register() {
            this.$router.push('/register')
        },
    },
}
</script>

<style lang="scss">

  *  {
    margin: 10;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira Sans', san-serif;
}
// Set custom nav bar colors
.navbar-brand,
.navbar-text,
.navbar {
    background-color: #44515e;
    padding: .5em;

    span {
        color: #42B883;
    }
}
a {
    color: black;
    padding: .5em;

    &.router-link-exact-active {
        color: #08492c;
    }
}
</style>
