<script setup>

    import { onMounted, ref } from 'vue';
    import { getFromSupabase } from '../supabase.js';

    const props = defineProps({
        scenario: Text,
    });

    const amendements = ref(null);

    onMounted(async () => {
        const datas = await getFromSupabase('amendements');
        amendements.value = datas.filter(d => d.id_scenario == props.scenario);
    });

</script>

<template>
    <ul v-if="amendements">
        <li v-for="amendement in amendements">
            <div class="amend-row">
                <strong>{{ amendement.TITRE_AMEND }}</strong>
                <label :for="`modal-control_${amendement.id}`" class="modal-open">Voir l'amendement</label>
            </div>
            <Teleport to="body">
                <input type="checkbox" :id="`modal-control_${amendement.id}`" class="modal">
                <div>
                    <div class="card modal-card">
                        <label :for="`modal-control_${amendement.id}`" class="modal-close"></label>
                        <h3>{{ amendement.TITRE_AMEND }}</h3>
                        <div class="amend-content">
                            <p>{{ amendement.TEXTE_AMEND }}</p>
                        </div>
                        <table class="amend-metas">
                            <tbody>
                                <tr>
                                    <td><strong>Nature</strong></td>
                                    <td>{{ amendement.NAT_AMEND }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Justification</strong></td>
                                    <td>{{ amendement.JUSTIFICATION }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Risque</strong></td>
                                    <td>{{ amendement.RISQUE }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Statut</strong></td>
                                    <td>{{ amendement.FINALISE ? "Finalisé":"En cours" }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Teleport>
        </li>
    </ul>
</template>

<style scoped>

    ul {
        margin-left: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .amend-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 90%;
        margin: 0 auto;
        min-height: 1.5rem;
    }

    .amend-row strong {
        width: 100%;
        height: 100%;
        border-bottom: rgb(170, 170, 170) solid;
        border-bottom-width: 1px;
        margin: 0;
        margin-right: 0.5em;
        padding-bottom: 0.1em;
    }

    .amend-row label {
        margin-right: 0;
        width: 20%;
        text-align: center;
    }

    .modal-open {
        margin: 2px;
        background-color: #4dabf7;
        color: #fff;
        transition: ease 0.3s;
    }
    .modal-open:hover {
        cursor: pointer;
        background-color: #579cd4;
    }

    .modal-open-modif {
        background-color: #f59f00;
    }
    .modal-open-modif:hover {
        cursor: pointer;
        background-color: #da930f;
    }

    .modal-card {
        width: 75%;
        max-width: calc(100vw - 2rem);
        min-height: 70%;
        box-sizing: border-box;
        overflow-x: hidden;
    }

    .amend-content {
        max-height: 45%;
        width: 90%;
        margin: 1% auto 1%;
        border: solid rgb(170, 170, 170);
        border-width: 1px;
        overflow-y: scroll;
    }
    .amend-metas {
        width: 90%;
        max-height: 50%;
        table-layout: fixed;
        overflow-x: hidden;
        margin: auto;
    }

    .amend-metas tbody {
        border-top: solid rgb(170, 170, 170);
        border-top-width: 1px;
    }

    .amend-metas td:first-child {
        max-width: 25%;
    }

    .amend-metas td:last-child {
        max-width: 75%;
        overflow-wrap: anywhere;
    }

</style>