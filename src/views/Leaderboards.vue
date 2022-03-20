<template>
    <div class="leaderboards">
        <h1>Leaderboards</h1>
        <button @click="goToTown">Town</button>
        <div class="characters">
            <div class="character" v-for="(character, index) in characters" :key="character.id">
                <span>#{{index+1}}. {{character.name}} level {{character.level}} (xp: {{character.xp}})</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Leaderboards",
    components: {},
    data() {
        return {
            characters: []
        };
    },
    mounted() {
        this.$axios.get('/leaderboards').then(response => this.characters = response.data);
    },
    methods: {
        goToTown() {
            this.$router.push({ name: "Town", params: this.$route.params });
        },
    },
};
</script>

<style scoped lang="scss">
.leaderboards {
}
</style>
