<script setup>

import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth.js';
import { sendToSupabase } from './../supabase.js';

const props = defineProps({
    scenario: {
        type: Object,
        required: true
    }
})

const currUser = ref(null);
const { user } = useAuth();
currUser.value = user

let choix_NAT_AMEND;

if(props.scenario.id !== 4) {
    choix_NAT_AMEND = [
    "Amendement de scénario - SANS nouvelle option de vote",
    "Amendement de scénario - AVEC nouvelle option de vote"
    ]
} else {
    choix_NAT_AMEND = [
        "Création ou suppression de scénario (choix unique)"
    ]
};

const curr_NAT_AMEND = ref(choix_NAT_AMEND[0])

const detailAmendement = ref({
    TITRE_AMEND: "",
    NAT_AMEND: "",
    id_scenario: props.scenario.id,
    TEXTE_AMEND: "",
    JUSTIFICATION: "",
    RISQUE: "",
    PORT: currUser.value._value.email,
    FINALISE: false,
    user_id: currUser.value._value.id
});

const sendMessage = async () => {

    const data = await sendToSupabase(
        'amendements',
        detailAmendement.value
    );

    alert("Amendement enregistré !");
    location.reload();
}


</script>

<template>
    <label :for="`modal-control_scenario_${scenario.id}`" class="modal-open">Ajouter un amendement pour ce scénario</label>

    <Teleport to="body">
        <input type="checkbox" :id="`modal-control_scenario_${scenario.id}`" class="modal">
        <div>
            <div class="card modal-card">
                <label :for="`modal-control_scenario_${scenario.id}`" class="modal-close" ></label>
                <h3 class="section">
                    {{
                        scenario.SCENARIO_CODE === 0 ?
                            "Proposer un amendement hors scénario"
                            :`Proposer un amendement pour le scénario ${scenario.SCENARIO_CODE}`
                    }}
                </h3>
                <form @submit.prevent="sendMessage">
                    <fieldset>
                        <label for="TITRE_AMEND">Libellé de l'amendement*</label>
                        <input type="text" name="" id="TITRE_AMEND" v-model="detailAmendement.TITRE_AMEND" />

                        <label for="NATURE_AMEND">Nature de l'amendement</label>
                        <select :disabled="scenario===4 ? true:false" id="NAT_AMEND" v-model="curr_NAT_AMEND">
                            <option v-for="choix in choix_NAT_AMEND" :value="choix">{{ choix }}</option>
                        </select>

                        <label for="TEXT_AMEND">Décrivez le contenu de l'amendement</label>
                        <textarea name="" id="TEXTE_AMEND" v-model="detailAmendement.TEXTE_AMEND"></textarea>

                        <label for="JUSTIFICATION">Justification de l'amendement</label>
                        <input type="text" name="" id="JUSTIFICATION" v-model="detailAmendement.JUSTIFICATION" />

                        <label for="RISQUE">Risque anticipé</label>
                        <input type="text" name="" id="RISQUE" v-model="detailAmendement.RISQUE" />

                        <p><small>* Champs obligatoires</small></p>
                    </fieldset>
                    <button :disabled="detailAmendement.TITRE_AMEND ? false:true">
                        <span v-if="!detailAmendement.TITRE_AMEND" class="tooltip" aria-label="Il manque des champs obligatoires">Soumettre la proposition</span>
                        <span v-else>Soumettre la proposition</span>
                    </button>
                </form>
            </div>
        </div>
    </Teleport>

</template>

<style scoped>

    .modal-open {
        background-color: #e9ecef;
        transition: ease 0.3s;
    }

    .modal-open:hover {
        cursor: pointer;
        background-color: rgb(226, 226, 226);
    }

    .modal-card {
        min-width: 70%;
        min-height: 80%;
    }

    .modal-card fieldset {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-top: 10px;
    }

    form button {
        background-color: #2f9e44;
        color: #fff
    }
</style>