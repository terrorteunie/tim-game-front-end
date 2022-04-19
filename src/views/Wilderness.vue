<template>
    <div class="wilderness">
        <template v-if="character">
            <button v-if="finished && !character.dead" @click="goTo('Town')">
                Town
            </button>
            <button
                v-if="finished && character.dead"
                @click="goTo('CharSelect')"
            >
                Character Select
            </button>
        </template>
        <br />
        <div
            class="next-event-container"
            :class="nextEventClass"
            @click="nextEvent"
        ></div>
        <div class="log-container" :class="{ empty: hideLog }">
            <div class="log-body">
                {{ currentDescription }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Wilderness",
    components: {},
    data() {
        return {
            charId: this.$route.params.charId,
            distance: this.$route.params.distance,
            adventureLogs: [],
            currentEventIndex: -1,
            showNextEvent: true,
            character: null,
        };
    },
    mounted() {
        this.$axios
            .get(
                "/wilderness/" +
                    this.charId +
                    "/createAdventure?distance=" +
                    this.distance
            )
            .then((response) => {
                this.adventureLogs = response.data.logs;
                this.character = response.data.character;
                this.$store.commit('setCharacter', this.character);
            });
    },
    methods: {
        goTo(route) {
            this.$router.push({ name: route, params: this.$route.params });
        },
        nextEvent() {
            this.showNextEvent = false;
            this.currentEventIndex++;
            setTimeout(() => {
                this.showNextEvent = true;
            }, 1500);
        },
    },
    computed: {
        finished() {
            if (this.adventureLogs.length === 0) {
                return false;
            }
            return !this.adventureLogs[this.currentEventIndex + 1];
        },
        nextEventClass() {
            if (
                !this.showNextEvent ||
                !this.adventureLogs[this.currentEventIndex + 1]
            ) {
                return "hide";
            }
            return this.adventureLogs[this.currentEventIndex + 1].rarity;
        },
        currentDescription() {
            if (!this.adventureLogs[this.currentEventIndex]) {
                return "";
            }
            return this.adventureLogs[this.currentEventIndex].description;
        },
        hideLog() {
            return this.currentDescription === "";
        },
    },
};
</script>

<style scoped lang="scss">
.wilderness {
    background-image: url("../assets/Cartoon_Forest_BG_03.png");
    height: 100%;
    background-size: cover;
    background-position: center;
    .next-event-container {
        background-size: contain;
        width: 120px;
        height: 120px;
        background-repeat: no-repeat;
        display: inline-block;
        &.hide {
            visibility: hidden;
        }
        &.Common {
            background-image: url("../assets/common-encounter.png");
        }
        &.Uncommon {
            background-image: url("../assets/uncommon-encounter.png");
        }
        &.Rare {
            background-image: url("../assets/rare-encounter.png");
        }
        &.Epic {
            background-image: url("../assets/epic-encounter.png");
        }
        &.Legendary {
            background-image: url("../assets/legendary-encounter.png");
        }
    }
    .log-container {
        display: inline-block;
        margin-top: 75px;
        background-image: url("../assets/Worn-Parchment-BG-2.png");
        background-repeat: no-repeat;
        background-size: contain;
        height: 206px;
        width: 310px;
        padding: 35px;
        &.empty {
            background-image: none;
        }
        .log-body {
            display: inline-block;
            max-height: 165px;
            overflow: scroll;
            white-space: break-spaces;
            text-align: left;
            font-weight: bold;
        }
    }
}
</style>
