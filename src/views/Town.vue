<template>
    <div class="town">
        <h1>Town</h1>
        <button @click="goToSelect">Select character</button>
        <button @click="goToLeaderboards">Leaderboards</button>
        <button @click="goToInventory">Inventory</button>
    </div>
</template>

<script>
export default {
    name: "Town",
    components: {},
    data() {
        return {};
    },
    mounted() {
        
    },
    methods: {
        goToSelect() {
            this.$router.push({ name: "CharSelect" });
        },
        goToInventory() {
            this.$router.push({ name: "Inventory", params: this.$route.params });
        },
        goToLeaderboards() {
            this.$router.push({ name: "Leaderboards", params: this.$route.params });
        },
    },
};
</script>

<style scoped lang="scss">
.town {
}
</style>
