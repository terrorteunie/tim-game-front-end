<template>
    <div class="assign-attributes" v-if="character">
        <h1>Assign Attributese</h1>
        <h3>{{ character.name }}</h3>

        <div class="stats">
            <div class="stat">
                <label for="strength">Strength</label>
                <button @click="increaseStrength">+</button>
                <input
                    type="number"
                    v-model="character.strength"
                    id="strength"
                    disabled
                    class="stat-input"
                />
                <button @click="decreaseStrength">-</button>
            </div>
            <div class="stat">
                <label for="dexterity">Dexterity</label>
                <button @click="increaseDexterity">+</button>
                <input
                    type="number"
                    v-model="character.dexterity"
                    id="dexterity"
                    disabled
                    class="stat-input"
                />
                <button @click="decreaseDexterity">-</button>
            </div>
            <div class="stat">
                <label for="intelligence">Intelligence</label>
                <button @click="increaseIntelligence">+</button>
                <input
                    type="number"
                    v-model="character.intelligence"
                    id="intelligence"
                    disabled
                    class="stat-input"
                />
                <button @click="decreaseIntelligence">-</button>
            </div>
            <div class="stat">
                <label for="luck">Luck</label>
                <button @click="increaseLuck">+</button>
                <input
                    type="number"
                    v-model="character.luck"
                    id="luck"
                    disabled
                    class="stat-input"
                />
                <button @click="decreaseLuck">-</button>
            </div>
        </div>
        <span>Attribute points left: {{ pointsLeft }}</span>

        <div class="buttons">
            <button @click="save">Save</button>
            <button @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AssignAttributes",
    components: {},
    data() {
        return {
            character: null,
            originalStrength: null,
            originalIntelligence: null,
            originalDexterity: null,
            originalLuck: null,
            totalPoints: null
        };
    },
    props: {
        characterInput: {
            default: () => {},
        },
    },
    methods: {
        save() {
            this.$axios
                .post(
                    "/character/" + this.character.id + "/saveStats",
                    this.character
                )
                .then((response) => {
                    this.$store.commit('setCharacter', response.data);
                    this.$router.push({
                        name: "Town",
                        params: { charId: this.character.id },
                    });
                });
        },
        cancel() {
            this.$router.push({
                name: "Town",
                params: { charId: this.character.id },
            });
        },
        increaseStrength() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.character.strength++;
        },
        decreaseStrength() {
            if (this.character.strength <= this.originalStrength) {
                return;
            }
            this.character.strength--;
        },
        increaseDexterity() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.character.dexterity++;
        },
        decreaseDexterity() {
            if (this.character.dexterity <= this.originalDexterity) {
                return;
            }
            this.character.dexterity--;
        },
        increaseIntelligence() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.character.intelligence++;
        },
        decreaseIntelligence() {
            if (this.character.intelligence <= this.originalIntelligence) {
                return;
            }
            this.character.intelligence--;
        },
        increaseLuck() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.character.luck++;
        },
        decreaseLuck() {
            if (this.character.luck <= this.originalLuck) {
                return;
            }
            this.character.luck--;
        },
    },
    mounted() {
        this.character = this.$store.getters.getCharacter(
            this.$route.params.charId
        );
        this.originalStrength = this.character.strength;
        this.originalIntelligence = this.character.intelligence;
        this.originalDexterity = this.character.dexterity;
        this.originalLuck = this.character.luck;
        this.totalPoints =
            this.originalStrength +
            this.originalDexterity +
            this.originalIntelligence +
            this.originalLuck +
            this.character.attribute_points_left;
    },
    computed: {
        pointsLeft() {
            return (
                this.totalPoints -
                this.character.strength -
                this.character.dexterity -
                this.character.intelligence -
                this.character.luck
            );
        },
    },
};
</script>

<style scoped lang="scss">
.assign-attributes {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .input {
        margin: 10px;
    }
    .stats {
        display: flex;
        flex-direction: row;
        .stat {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 10px;
            .stat-input {
                width: 30px;
            }
        }
    }
    .buttons {
        button {
            margin: 10px;
        }
    }
}
</style>
