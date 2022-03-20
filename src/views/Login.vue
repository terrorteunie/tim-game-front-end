<template>
    <div class="login">
        <h1>Luceat</h1>
        <div class="username">
            <label for="username">Username</label><br />
            <input
                type="text"
                placeholder="username"
                v-model="username"
                id="username"
            />
        </div>
        <div class="password">
            <label for="password">Password</label><br />
            <input type="password" v-model="password" id="password" />
        </div>
        <div class="error" v-if="error !== ''">
            <span class="error-message">
                {{ error }}
            </span>
        </div>
        <div class="buttons">
            <div class="login">
                <button @click="login">Login</button>
            </div>
            <div class="register">
                <button @click="register">Register</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    components: {},
    data() {
        return {
            username: "",
            password: "",
            error: ""
        };
    },
    mounted() {
        let token = localStorage.getItem("token");
        if (token) {
            this.$router.push({name: 'CharSelect'});
        }
    },
    methods: {
        login() {
            if (this.username !== "" && this.password !== "") {
                this.error = '';
                this.$axios
                    .post("/login", {
                        name: this.username,
                        password: this.password,
                    })
                    .then((response) => {
                        if (response.data.token) {
                            localStorage.setItem("token", response.data.token);
                            this.$router.push({name: 'CharSelect'});
                        }
                        if (response.data.error) {
                            this.error = response.data.error;
                        }
                    });
            }
        },
        register() {
            if (this.username !== "" && this.password !== "") {
                this.error = '';
                this.$axios
                    .post("/register", {
                        name: this.username,
                        password: this.password,
                    })
                    .then((response) => {
                        if (response.data.token) {
                            localStorage.setItem("token", response.data.token);
                            this.$router.push({name: 'CharSelect'});
                        }
                        if (response.data.error) {
                            this.error = response.data.error;
                        }
                    });
            }
        }
    },
};
</script>

<style scoped lang="scss">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .username {
        margin: 10px;
    }
    .password {
        margin: 10px;
    }
    .buttons {
        .login {
            display: inline-block;
            margin: 10px;
        }
        .register {
            display: inline-block;
            margin: 10px;
        }
    }
    .error {
        .error-message {
            color: red;
        }
    }
}
</style>
