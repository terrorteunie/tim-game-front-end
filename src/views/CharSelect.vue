<template>
    <div class="char-select">
        <h1>Char Select</h1>
        <div class="characters">
            <div
                class="character"
                v-for="character in characters"
                :key="character.id"
            >
                <h3>{{ character.name }}</h3>
                <div class="stats">
                    <div class="stat">
                        <span class="name">HP</span>
                        <span class="value">{{ character.hp }}</span>
                    </div>
                    <div class="stat">
                        <span class="name">Level</span>
                        <span class="value">{{ character.level }}</span>
                    </div>
                    <div class="stat">
                        <span class="name">XP</span>
                        <span class="value">{{ character.xp }}</span>
                    </div>
                    <div class="stat">
                        <span class="name">Gold</span>
                        <span class="value">{{ character.gold }}</span>
                    </div>

                    <div class="stat">
                        <span class="name">Strength</span>
                        <span class="value">{{ character.strength }}</span>
                    </div>
                    <div class="stat">
                        <span class="name">Dexterity</span>
                        <span class="value">{{ character.dexterity }}</span>
                    </div>

                    <div class="stat">
                        <span class="name">Intelligence</span>
                        <span class="value">{{ character.intelligence }}</span>
                    </div>
                    <div class="stat">
                        <span class="name">Luck</span>
                        <span class="value">{{ character.luck }}</span>
                    </div>
                </div>
                <button @click="select(character)">Select</button>
                <button @click="remove(character)">Delete</button>
            </div>
        </div>
        <div class="create">
            <button @click="create">Create</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CharSelect",
    components: {},
    data() {
        return {
            characters: [],
        };
    },
    mounted() {
        this.getCharacters();
    },
    methods: {
        getCharacters() {
            this.$axios
                .get("/character/getAll")
                .then((response) => (this.characters = response.data));
        },
        create() {
            this.$router.push({ name: "CharCreate" });
        },
        remove(character) {
            this.$axios
                .get("/character/" + character.id + "/delete")
                .then(() => this.getCharacters());
        },
        select(character) {
            this.$router.push({name: 'Town', params: {charId: character.id}});
        }
    },
};
</script>

<style scoped lang="scss">
.char-select {
    .characters {
        display: flex;
        flex-wrap: wrap;
        .character {
            width: calc(50% - 22px);
            height: 200px;
            box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
            border: 1px solid black;
            margin: 10px;
            .stats {
                display: flex;
                flex-wrap: wrap;
                .stat {
                    width: calc(50% - 10px);
                    margin: 5px;
                    font-size: 13px;
                    .name {
                        float: left;
                    }
                    .value {
                        float: right;
                    }
                }
            }
        }
    }
    .create {
    }
}
</style>
