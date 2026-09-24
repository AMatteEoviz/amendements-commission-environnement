<script setup>

import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth.js';
import { sendToSupabase } from './../supabase.js';

const props = defineProps({
    scenario: {
        type: Object,
        required: true
    }
});

const currUser = ref(null);
const { user } = useAuth();
currUser.value = user;

let choix_NAT_AMEND;

if(props.scenario.SCENARIO_CODE !== 0) {
    choix_NAT_AMEND = [
    "Créer un nouveau sous-scénario",
    "Modifier un sous-scénario existant",
    "Amendement qui s'applique à tout le scénario",
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
    ADMIN: "",
    PORT: currUser.value._value.email,
    FINALISE: true,
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
                        <label for="TITRE_AMEND">Titre de l'amendement*</label>
                        <input type="text" name="" id="TITRE_AMEND" v-model="detailAmendement.TITRE_AMEND" placeholder="En une phrase courte, écrivez l'idée de l'amendement" />

                        <label for="NATURE_AMEND">Nature de l'amendement</label>
                        <select :disabled="scenario.SCENARIO_CODE===0 ? true:false" id="NAT_AMEND" v-model="curr_NAT_AMEND">
                            <option v-for="choix in choix_NAT_AMEND" :value="choix">{{ choix }}</option>
                        </select>

                        <label for="TEXT_AMEND">Décrivez le contenu de l'amendement</label>
                        <textarea name="" id="TEXTE_AMEND" v-model="detailAmendement.TEXTE_AMEND" placeholder="Écrivez la proposition telle que vous voudriez la voir ajoutée au scénario. Précisez les passages actuels du scénario que vous voudriez enlever ou remplacer."></textarea>

                        <label for="JUSTIFICATION">Justification de l'amendement</label>
                        <textarea name="" id="JUSTIFICATION" v-model="detailAmendement.JUSTIFICATION" placeholder="Expliquez pourquoi cet amendement vous semble souhaitable. S'il s'inscrit dans un scénario existant, expliquez en quoi il correspond à la logique d'ensemble du scénario (i.e. pourquoi dans ce scénario et pas un autre)."></textarea>

                        <label for="RISQUE">Risques anticipés</label>
                        <textarea id="RISQUE" v-model="detailAmendement.RISQUE" placeholder="Quels inconvénients ou quels risques d'échec envisagez-vous pour cette mesure ?"></textarea>

                        <label for="ADMIN">Implémentation administrative</label>
                        <textarea id="ADMIN" v-model="detailAmendement.ADMIN" placeholder="Précisez quel entité (direction, conseil de labo, gestionnaire, etc.) prend en charge l'application, et si besoin avec quels outils. Soyez aussi spécifique que possible."></textarea>
                        
                        <p>Finalisé</p>
                        <div>
                            <label for="TRUE" value="true">Oui</label>
                            <input type="radio" name="FINALISE" @click="detailAmendement.FINALISE=true" checked>
                        </div>
                        <div>
                            <label for="FALSE" value="false" @click="detailAmendement.FINALISE=false">Non</label>
                            <input type="radio" name="FINALISE">
                        </div>

                        <p><small>* Champs obligatoires</small></p>
                        <button :disabled="detailAmendement.TITRE_AMEND ? false:true">
                            <span v-if="!detailAmendement.TITRE_AMEND" class="tooltip" aria-label="Il manque des champs obligatoires">Soumettre la proposition</span>
                            <span v-else>Soumettre la proposition</span>
                        </button>
                    </fieldset>

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
        min-height: 90%;
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