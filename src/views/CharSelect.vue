<template>
  <div class="char-select">
      <h1>Char Select</h1>
  </div>
</template>

<script>

export default {
  name: 'CharSelect',
  components: {
    
  },
  data() {
      return {
          
      }
  },
  mounted() {
      this.$axios.get('/users').then(response => console.log(response));
  }
}
</script>

<style scoped lang="scss">
.char-select {
    
}
</style>
