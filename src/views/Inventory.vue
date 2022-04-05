<template>
    <div class="inventory">
        <h1>Inventory</h1>
        <button @click="goToTown">Town</button>
        <br />
        <div class="inventory-tile-container">
            <div
                class="inventory-tile"
                v-for="inventory in inventories"
                :key="inventory.id"
                :class="{ equipped: inventory.equipped }"
                @click="toggleEquip(inventory)"
            >
                {{ inventory.item.name }}
                {{ inventory.equipped }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Inventory",
    components: {},
    data() {
        return {
            inventories: [],
            character: null,
        };
    },
    mounted() {
        this.inventories = this.$store.getters.getInventory;
        this.$axios
            .get("character/" + this.$route.params.charId + "/inventory")
            .then((response) => {
                this.$store.commit("setInventory", response.data.inventories);
                this.inventories = this.$store.getters.getInventory;
            });
    },
    methods: {
        goToTown() {
            this.$router.push({ name: "Town", params: this.$route.params });
        },
        toggleEquip(inventory) {
            let changedInventories = [];
            inventory.equipped = !inventory.equipped;
            changedInventories.push(inventory.id);
            if (!inventory.equipped) {
                this.sendToggles(changedInventories);
                return;
            }
            let itemType = inventory.item.type;
            let currentlyEquipedItemsOfType = this.inventories.filter((inv) => {
                return (
                    inv.equipped &&
                    inv.item.type === itemType &&
                    inv.id !== inventory.id
                );
            });
            let allowedEquipedItems = 1;
            if (itemType === "ring") {
                allowedEquipedItems = 2;
            }
            if (currentlyEquipedItemsOfType.length >= allowedEquipedItems) {
                currentlyEquipedItemsOfType[0].equipped =
                    !currentlyEquipedItemsOfType[0].equipped;
                changedInventories.push(currentlyEquipedItemsOfType[0].id);
            }
            this.sendToggles(changedInventories);
        },
        sendToggles(toggles) {
            this.$axios
                .post(
                    "/character/" + this.$route.params.charId + "/toggleEquips",
                    {
                        equipToggles: toggles,
                    }
                )
                .then((response) => {
                    this.$store.commit(
                        "setInventory",
                        response.data.inventories
                    );
                });
        },
    },
};
</script>

<style scoped lang="scss">
.inventory {
    .inventory-tile-container {
        display: flex;
        flex-wrap: wrap;
        .inventory-tile {
            width: calc(33% - 41px);
            height: 80px;
            border: solid 1px black;
            margin: 10px;
            background-color: #eeeeee;
            padding: 10px;
            &.equipped {
                background-color: #bbbbbb;
            }
        }
    }
}
</style>
