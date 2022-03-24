<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal-body">
                How deep into the wilderness do you want to go?
                <input type="number" v-model="distance"/>
            </div>
            <button type="button" @click="close">
                Cancel
            </button>
            <button type="button" @click="ventureOut">
                Venture out!
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "WildernessPopup",
    data() {
        return {
            distance: 1
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        ventureOut() {
            this.$emit("venture", this.distance);
        }
    },
};
</script>

<style scoped lang="scss">
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
}
.modal-body {
    position: relative;
    padding: 20px 10px;
}
</style>
