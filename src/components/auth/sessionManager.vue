<script setup>
    import { ref } from 'vue';
    import { useAuth } from '@/composables/useAuth';
    const currUser = ref(null)
    const { user, logout } = useAuth()
    currUser.value = user
</script>

<template>
    <label for="drawer-control" class="drawer-toggle persistent"></label>
    <input type="checkbox" id="drawer-control" class="drawer persistent">
    
    <!-- Drawer content -->
    <div>
    <label for="drawer-control" class="drawer-close"></label>
        <div class="drawer-content">
        <h4>{{ user.email }}</h4>
        <button @click="logout" class="secondary">déconnexion</button>
    </div>
    </div>
</template>

<style scoped>
    .drawer-toggle {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1em;
        background-color: #e9ecef;
        transition: ease 0.3s;
    }

    .drawer-toggle:hover {
        cursor: pointer;
        background-color: rgb(226, 226, 226);
    }

    .drawer-content {
        margin-top: 3rem;
    }
</style>