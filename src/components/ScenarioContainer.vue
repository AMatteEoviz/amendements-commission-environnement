<script setup>

    import { onMounted, ref } from 'vue';
    import amendementContainer from './amendementContainer.vue';
    import addAmendement from './addAmendement.vue';
    import { getFromSupabase } from '../supabase.js';

    const scenarios = ref(null);
    const uniqueScenari = ref([]);
    

    onMounted(async () => {
      scenarios.value = await getFromSupabase('scenarios');
      scenarios.value.map(d => {
          let ScenarioToPush = d;
          if(!uniqueScenari.value.includes(ScenarioToPush)) {
              uniqueScenari.value.push(d)
              uniqueScenari.value.sort()
          }
      });
    });

</script>


<template>

  <div class="spinner-container" v-if="!scenarios">
    <div class="spinner primary"></div>  
  </div>

<div v-else class="collapse">
 <template v-for="i in uniqueScenari" :key="i.SCENARIO_CODE">
    <input
      type="checkbox"
      :id="`collapse-section${i.SCENARIO_CODE}`"
      aria-hidden="true"
    >

    <label
      :for="`collapse-section${i.SCENARIO_CODE}`"
      aria-hidden="true"
    >
       {{i.SCENARIO_CODE !== 0 ? `Scénario ${i.SCENARIO_CODE} : ${i.SCENARIO_TITRE}`:"Amendements hors scénario" }}
       <a v-if="i.SCENARIO_CODE !==0" :href="`/amendements-commission-environnement/scenarios_pdf/scenario_${i.SCENARIO_CODE}.pdf`">Lire le contenu du scénario</a>
    </label>
    <div>
      <addAmendement :scenario="i" />
      <amendementContainer :scenario="i.id" />
    </div>
  </template>
</div>

</template>


<style scoped>

  .collapse {
    width: 60%;
    margin: auto;
    margin-bottom: 5%;
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