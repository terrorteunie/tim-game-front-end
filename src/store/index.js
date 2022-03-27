import { createStore } from 'vuex'

export default createStore({
    state: {
        characters: []
    },
    mutations: {
        setCharacters(state, characters) {
            state.characters = characters
        },
        setCharacter(state, character) {
            let index = state.characters.indexOf(state.characters.find(c => c.id = character.id));
            state.characters[index] = character;
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
        }
    }
})
