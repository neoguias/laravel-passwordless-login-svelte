<script>
    import { useForm } from '@inertiajs/svelte';
    import { Captcha } from '@laracaptcha/svelte';

    // Lo que devuelve Captcha::props() en el servidor: proveedor, clave pública y script.
    let { captcha } = $props();

    const form = useForm({ email: '', captcha: '' });
    let captchaWidget;

    function submit(event) {
        event.preventDefault();

        form.post('/login', {
            // Cloudflare acepta cada token una sola vez: si el servidor rechaza el envío, hace falta otro.
            onError: () => captchaWidget?.reset(),
        });
    }
</script>

<svelte:head>
    <title>Entrar · {import.meta.env.VITE_APP_NAME}</title>
</svelte:head>

<main class="card">
    <h1>Entrar</h1>
    <p class="lead">Sin contraseña: te enviamos un código a tu email.</p>

    <form onsubmit={submit}>
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={form.email} required autocomplete="username" maxlength="255">
        {#if form.errors.email}<p class="error">{form.errors.email}</p>{/if}

        <Captcha bind:this={captchaWidget} {...captcha} language="es" bind:token={form.captcha} />
        {#if form.errors.captcha}<p class="error">{form.errors.captcha}</p>{/if}

        <button type="submit" disabled={form.processing}>
            {form.processing ? 'Enviando…' : 'Enviarme el código'}
        </button>
    </form>

    <p class="hint">¿Aún no tienes cuenta? Escribe tu email: el mismo formulario la crea.</p>
</main>
