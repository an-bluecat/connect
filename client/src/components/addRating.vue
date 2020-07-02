<template>
    <div>
        <h1>Rate {{this.$route.params.name}}</h1>
        <b-form @submit.prevent="handleSubmit">

            <b-form-group id="exampleInputGroup3" label="rating" label-for="exampleInput3">
                <b-form-select id="exampleInput3" :options="['0','1', '2','3','4','5']" required v-model="formData.rating" />
            </b-form-group>

            <b-form-group id="exampleInputGroup2" label="Review" label-for="exampleInput2">
                <b-form-input
                id="exampleInput2"
                type="text"
                v-model="formData.name"
                required
                placeholder="HERE'S YOUR CHANCE TO BE MORE SPECIFIC" />
            </b-form-group>


            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      formData: {
        comment: '',
        rating: -1
      }
    }
  },
  methods: {
    togglePetForm() {
      this.showPetForm = !this.showPetForm
    },
    handleSubmit() {
      const { species, age, name } = this.formData
      const payload = {
        species,
        pet: {
          name,
          age
        }
      }
    //   this.addPet(payload)

      // reset form after submit
      this.formData = {
        name: '',
        age: 0,
        species: null
      }
    }
  }
}
</script>


