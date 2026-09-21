<script setup>

    import { onMounted, ref } from 'vue';
    import amendementContainer from './amendementContainer.vue';
    import addAmendement from './addAmendement.vue';
    import { getFromSupabase } from '../supabase.js';

    const datas = ref(null);
    const uniqueScenari = ref([]);
    

    onMounted(async () => {
      datas.value = await getFromSupabase('test_integration');
      console.log(datas.value)
      datas.value.map(d => {
          let ScenarioToPush = d.SCENARIO ? d.SCENARIO:4;
          if(!uniqueScenari.value.includes(ScenarioToPush)) {
              uniqueScenari.value.push(ScenarioToPush)
              uniqueScenari.value.sort()
          }
      });
    });

</script>


<template>

  <div class="spinner-container" v-if="!datas">
    <div class="spinner primary"></div>  
  </div>

<div v-else class="collapse">
 <template v-for="i in uniqueScenari" :key="i">
    <input
      type="checkbox"
      :id="`collapse-section${i}`"
      :checked="i === 1"
      aria-hidden="true"
    >

    <label
      :for="`collapse-section${i}`"
      aria-hidden="true"
    >
       {{i===4 ? "Amendements hors scénario":`Scénario ${i}` }}
    </label>
    <div>
      <addAmendement :scenario="i" :datas="datas" />
      <amendementContainer :scenario="i" :datas="datas" />
    </div>
  </template>
</div>

</template>


<style scoped>

  .collapse {
    width: 50%;
    margin: auto;
  }

  .collapse div {
    align-items: left;
  }

  .spinner-container {
    position: absolute;
    top:0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scale: 1.5;
  }
</style>