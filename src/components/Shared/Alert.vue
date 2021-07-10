<template>
  <v-alert error dismissible @input="onClose" :value="true" width="100%">
    {{ text }}
  </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        // emit event
        this.$emit('dismissed')
      }
    }
  }
</script>
