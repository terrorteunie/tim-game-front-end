import { createStore } from 'vuex'

export default createStore({
    state: {
        characters: [],
        inventory: []
    },
    mutations: {
        setCharacters(state, characters) {
            state.characters = characters;
            state.inventory = [];
        },
        setCharacter(state, character) {
            let index = state.characters.indexOf(state.characters.find(c => c.id = character.id));
            state.characters[index] = character;
            state.inventory = [];
        },
        setInventory(state, inventory) {
            state.inventory = inventory;
        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        getCharacter: (state) => (id) => {
            return state.characters.find(character => character.id = id);
        },
        getCharacters(state) {
            return state.characters;
        },
        getInventory(state) {
            return state.inventory;
        }
    }
})
