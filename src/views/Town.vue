<template>
    <wilderness-popup
        v-show="showWildernessPopup"
        @close="showWildernessPopup = false"
        @venture="ventureOut($event)"
    />
    <div class="town">
        <h1>Town</h1>
        <button @click="goToSelect">Select character</button>
        <button @click="goToLeaderboards">Leaderboards</button>
        <button @click="goToInventory">Inventory</button>
        <br />
        <button @click="showWildernessPopup = true">Wilderness</button>
    </div>
</template>

<script>
import WildernessPopup from "../components/WildernessPopup.vue";

export default {
    name: "Town",
    components: { WildernessPopup },
    data() {
        return {
            showWildernessPopup: false,
        };
    },
    mounted() {},
    methods: {
        goToSelect() {
            this.$router.push({ name: "CharSelect" });
        },
        goToInventory() {
            this.$router.push({
                name: "Inventory",
                params: this.$route.params,
            });
        },
        goToLeaderboards() {
            this.$router.push({
                name: "Leaderboards",
                params: this.$route.params,
            });
        },
        ventureOut(distance) {
            this.showWildernessPopup = false;
            this.$router.push({
                name: "Wilderness",
                params: {
                    ...this.$route.params,
                    distance
                },
            });
        },
    },
};
</script>

<style scoped lang="scss">
.town {
}
</style>
