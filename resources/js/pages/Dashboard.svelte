<script>
    import { page, router } from '@inertiajs/svelte';
</script>

<svelte:head>
    <title>Panel · {import.meta.env.VITE_APP_NAME}</title>
</svelte:head>

<main class="card">
    <h1>Hola, {page.props.auth.user.name}</h1>
    <p class="lead">Has entrado como <strong>{page.props.auth.user.email}</strong>, sin contraseña.</p>

    <button type="button" onclick={() => router.post('/logout')}>Cerrar sesión</button>
</main>
