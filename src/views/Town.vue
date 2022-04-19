<template>
    <wilderness-popup
        v-show="showWildernessPopup"
        @close="showWildernessPopup = false"
        @venture="ventureOut($event)"
    />
    <div class="town">
        <character-tile
            class="character-tile"
            v-if="character !== null"
            :character="character"
            show-attributes="true"
        />
        <div class="buttons">
            <div class="button" @click="goToSelect">
                <img
                    src="../assets/button-background.png"
                    class="image-button"
                />
                <span>Select character</span>
            </div>
            <div class="button" @click="goToLeaderboards">
                <img
                    src="../assets/button-background.png"
                    class="image-button"
                />
                <span>Leaderboards</span>
            </div>
            <div class="button" @click="goToInventory">
                <img
                    src="../assets/button-background.png"
                    class="image-button"
                />
                <span>Inventory</span>
            </div>
            <div class="button" @click="healFromInn">
                <img
                    src="../assets/button-background.png"
                    class="image-button"
                />
                <span>Inn</span>
            </div>
            <div class="button" @click="showWildernessPopup = true">
                <img
                    src="../assets/button-background-special.png"
                    class="image-button"
                />
                <span class="wilderness">Wilderness</span>
            </div>
        </div>
    </div>
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
        healFromInn() {
            this.$axios
                .get("/character/" + this.character.id + "/healFromInn")
                .then((response) => {
                    this.$store.commit("setCharacter", response.data);
                    this.character = this.$store.getters.getCharacter(
                        this.$route.params.charId
                    );
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
    height: 100%;
    background-image: url("../assets/town-background-2.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    .buttons {
        margin-top: auto;
        .button {
            position: relative;
            display: inline-block;
            margin: 10px;
            .image-button {
                width: 165px;
            }
            span {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-weight: bold;
                width: 100%;
                color: white;
                font-size: 20px;
                -webkit-text-stroke: 1px black;
                &.wilderness {
                    top: calc(50% - 5px);
                }
            }
        }
    }
}
</style>
