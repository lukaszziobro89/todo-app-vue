<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Title -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="Title">Title</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="title"
              v-model="title"
              placeholder="Title"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Content -->
          <VCol
            cols="12"
            md="3"
          >
            <label for="Content">Content</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VTextField
              id="Content"
              v-model="content"
              placeholder="Content"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

