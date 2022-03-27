<template>
    <div class="char-create">
        <h1>Char Create</h1>
        <label for="name">Name</label>
        <input class="input" type="text" id="name" v-model="name"/>

        <div class="stats">
            <div class="stat">
                <label for="strength">Strength</label>
                <button @click="increaseStrength">+</button>
                <input type="number" v-model="strength" id="strength" disabled class="stat-input"/>
                <button @click="decreaseStrength">-</button>
            </div>
            <div class="stat">
                <label for="dexterity">Dexterity</label>
                <button @click="increaseDexterity">+</button>
                <input type="number" v-model="dexterity" id="dexterity" disabled class="stat-input"/>
                <button @click="decreaseDexterity">-</button>
            </div>
            <div class="stat">
                <label for="intelligence">Intelligence</label>
                <button @click="increaseIntelligence">+</button>
                <input type="number" v-model="intelligence" id="intelligence" disabled class="stat-input"/>
                <button @click="decreaseIntelligence">-</button>
            </div>
            <div class="stat">
                <label for="luck">Luck</label>
                <button @click="increaseLuck">+</button>
                <input type="number" v-model="luck" id="luck" disabled class="stat-input"/>
                <button @click="decreaseLuck">-</button>
            </div>
        </div>
        <span>Attribute points left: {{ pointsLeft }}</span>

        <div class="buttons">
            <button @click="create">Create</button>
            <button @click="goToSelect">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CharCreate",
    components: {},
    data() {
        return {
            name: '',
            strength: 3,
            dexterity: 3,
            intelligence: 3,
            luck: 3,
            totalPoints: 16
        };
    },
    methods: {
        create() {
            this.$axios.post('/character/create', {
                name: this.name,
                strength: this.strength,
                dexterity: this.dexterity,
                intelligence: this.intelligence,
                luck: this.luck
            }).then((response) => {
                if (response.data.id) {
                    this.goToSelect();
                }
            });
        },
        goToSelect() {
            this.$router.push({ name: "CharSelect" });
        },
        increaseStrength() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.strength++;
        },
        decreaseStrength() {
            if (this.strength < 1) {
                return;
            }
            this.strength--;
        },
        increaseDexterity() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.dexterity++;
        },
        decreaseDexterity() {
            if (this.dexterity < 1) {
                return;
            }
            this.dexterity--;
        },
        increaseIntelligence() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.intelligence++;
        },
        decreaseIntelligence() {
            if (this.intelligence < 1) {
                return;
            }
            this.intelligence--;
        },
        increaseLuck() {
            if (this.pointsLeft < 1) {
                return;
            }
            this.luck++;
        },
        decreaseLuck() {
            if (this.luck < 1) {
                return;
            }
            this.luck--;
        },
    },
    computed: {
        pointsLeft() {
            return this.totalPoints - this.strength - this.dexterity - this.intelligence - this.luck;
        }
    }
};
</script>

<style scoped lang="scss">
.char-create {
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
