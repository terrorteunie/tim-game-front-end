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
    <character-tile
        v-if="character !== null"
        :character="character"
        show-attributes="true"
    />
</template>

<script>
import WildernessPopup from "../components/WildernessPopup.vue";
import CharacterTile from "../components/CharacterTile.vue";

export default {
    name: "Town",
    components: { WildernessPopup, CharacterTile },
    data() {
        return {
            showWildernessPopup: false,
            character: null,
        };
    },
    mounted() {
        this.character = this.$store.getters.getCharacter(
            this.$route.params.charId
        );
    },
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
                    distance,
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
