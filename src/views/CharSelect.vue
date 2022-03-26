<template>
    <div class="char-select">
        <h1>Char Select</h1>
        <div class="characters">
            <character-tile
                v-for="character in characters"
                :key="character.id"
                :character="character"
                :show-buttons="true"
                @select="select($event)"
                @remove="remove($event)"
            />
        </div>
        <div class="create">
            <button @click="create">Create</button>
        </div>
    </div>
</template>

<script>
import CharacterTile from '../components/CharacterTile.vue';

export default {
    name: "CharSelect",
    components: {
        CharacterTile
    },
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
    }
}
</style>
