<template>
  <s-card class="main-card">
    <s-card-header>
      <s-card-title>Подготовка к собеседованию</s-card-title>
      <s-card-description>Выберите интересующую вас тему</s-card-description>
    </s-card-header>
    <s-card-content>
      <s-select-root autocomplete @update:modelValue="onTopicSelect">
        <s-select-trigger>
          <s-select-value placeholder="Выбрать"></s-select-value>
        </s-select-trigger>
        <s-select-content>
          <s-select-group>
            <s-select-item v-for="category in categories?.data" :value="category.id">
              {{ category.name }}
            </s-select-item>
          </s-select-group>
        </s-select-content>
      </s-select-root>
    </s-card-content>
  </s-card>
  <s-card v-if="questions.length" class="mt-5">
    <s-card-header>
      <s-card-title>Вопросы</s-card-title>
      <s-card-description>Ответы открытом формате</s-card-description>
    </s-card-header>
    <s-card-content>
      <div v-for="item in questions" :key="item.question" class="first:mt-0 mt-3">
        <p class="text-sm font-medium mb-2">{{ item.question }}</p>
        <s-textarea placeholder="Ответ" />
      </div>
    </s-card-content>
  </s-card>
</template>
<script lang="ts" setup>

const questions = ref([]);

const { data: categories } = useAPI("/api/v1/categories");

function onTopicSelect(value) {
  console.log('cl', value)
  navigateTo(`/categories/${value}/quiz`)
}
</script>
<style>
.main-card {
  margin-top: 20px;
}
</style>