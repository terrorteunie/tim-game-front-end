<template>
    <div class="character">
        <h3>{{ character.name }}</h3>
        <div class="stats">
            <div class="stat">
                <span class="name">HP</span>
                <span class="value"
                    >{{ character.hp }}/{{ character.max_hp }}</span
                >
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
        <template v-if="showButtons">
            <button @click="$emit('select', character)">Select</button>
            <button @click="$emit('remove', character)">Delete</button>
        </template>
        <template v-if="character.attribute_points_left > 0 && showAttributes">
            <button @click="goToAssign()">Assign Attributes</button>
        </template>
    </div>
</template>

<script>
export default {
    name: "CharacterTile",
    components: {},
    data() {
        return {};
    },
    props: {
        character: {
            default: () => {},
        },
        showButtons: {
            default: false,
        },
        showAttributes: {
            default: false
        }
    },
    methods: {
        goToAssign() {
            this.$router.push({name: 'AssignAttributes', params: {'charId': this.character.id}})
        }
    }
};
</script>

<style scoped lang="scss">
.character {
    width: calc(100% - 22px);
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
</style>
