<template>
  <s-card class="main-card">
    <s-card-header>
      <s-card-title>Подготовка к собеседованию</s-card-title>
      <s-card-description>Выберите интересующую вас тему</s-card-description>
    </s-card-header>
    <s-card-content>
      <s-popover v-model:open="open">
        <s-popover-trigger as-child>
          <s-button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-[200px] justify-between"
          >
            Выбрать
            <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </s-button>
        </s-popover-trigger>
        <s-popover-content class="w-[200px] p-0">
          <s-command>
            <s-command-input class="h-9" placeholder="Поиск..." />
            <s-command-empty>Нет результата.</s-command-empty>
            <s-command-list>
              <s-command-group>
                <s-command-item
                    v-for="category in categories?.data || []"
                    :key="category.id"
                    :value="category.id"
                    @select="(ev) => {
                      onTopicSelect(ev.detail.value)
                      open = false
                    }"
                >
                  {{ category.name }}
                  <CheckIcon
                      :class="cn(
                  'ml-auto h-4 w-4',
                  value === category.id ? 'opacity-100' : 'opacity-0',
                )"
                  />
                </s-command-item>
              </s-command-group>
            </s-command-list>
          </s-command>
        </s-popover-content>
      </s-popover>
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
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import {cn} from "~/lib/utils";

const questions = ref([]);
const open = ref(false)
const value = ref();

const { data: categories } = useAPI("/api/v1/categories");
console.log("categories", categories.value);

function onTopicSelect(value) {
  navigateTo(`/categories/${value}/quiz`)
}
</script>
<style>
.main-card {
  margin-top: 20px;
}
</style>