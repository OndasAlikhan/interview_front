<template>
  <card class="main-card">
    <card-header>
      <card-title>Подготовка к собеседованию</card-title>
      <card-description>Выберите интересующую вас тему</card-description>
    </card-header>
    <card-content>
      <select-root autocomplete @update:modelValue="onTopicSelect">
        <select-trigger>
          <select-value placeholder="Выбрать"></select-value>
        </select-trigger>
        <select-content>
          <select-group>
            <select-item value="frontend">
              Frontend
            </select-item>
            <select-item value="backend">
              Backend
            </select-item>
          </select-group>
        </select-content>
      </select-root>
    </card-content>
  </card>
  <card v-if="questions.length" class="mt-5">
    <card-header>
      <card-title>Вопросы</card-title>
      <card-description>Ответы открытом формате</card-description>
    </card-header>
    <card-content>
      <div v-for="item in questions" :key="item.question" class="first:mt-0 mt-3">
        <p class="text-sm font-medium mb-2">{{ item.question }}</p>
        <textarea-cn placeholder="Ответ" />
      </div>
    </card-content>
  </card>
</template>
<script lang="ts" setup>

const questions = ref([]);

function onTopicSelect() {
  console.log('cl')
  questions.value = [
    {
      question: "Что такое event loop?",
    },
    {
      question: "Сколько уровней изоляции в PostgreSql"
    }
  ]
}
</script>
<style>
.main-card {
  margin-top: 100px;
}
</style>