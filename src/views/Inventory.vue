<template>
    <div class="inventory">
        <h1>Inventory</h1>
        <button @click="goToTown">Town</button>
    </div>
</template>

<script>
export default {
    name: "Inventory",
    components: {},
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        goToSelect() {
            this.$router.push({ name: "Town", params: this.$route.params });
        },
    },
};
</script>

<style scoped lang="scss">
.inventory {
}
</style>
