<script>
    import { Link, page, useForm } from '@inertiajs/svelte';

    let { email } = $props();

    const form = useForm({ code: '' });
    const resend = useForm({});

    function submit(event) {
        event.preventDefault();

        form.post('/login/codigo');
    }

    function sendAnother() {
        resend.post('/login/codigo/reenviar', {
            onSuccess: () => form.reset('code'),
        });
    }
</script>

<svelte:head>
    <title>Revisa tu correo · {import.meta.env.VITE_APP_NAME}</title>
</svelte:head>

<main class="card">
    {#if page.props.status}<p class="notice" role="status">{page.props.status}</p>{/if}

    <h1>Revisa tu correo</h1>
    <p class="lead">Te hemos enviado seis cifras a <strong>{email}</strong>.</p>

    <form onsubmit={submit}>
        <label for="code">Código</label>
        <input id="code" type="text" bind:value={form.code} required inputmode="numeric" autocomplete="one-time-code" pattern={'[0-9]{6}'} maxlength="6" placeholder="000000" class="code">
        {#if form.errors.code || resend.errors.code}<p class="error">{form.errors.code || resend.errors.code}</p>{/if}

        <button type="submit" disabled={form.processing}>
            {form.processing ? 'Comprobando…' : 'Entrar'}
        </button>
    </form>

    <div class="actions">
        <Link href="/login">Usar otro email</Link>
        <button type="button" class="link" disabled={resend.processing} onclick={sendAnother}>Enviar otro código</button>
    </div>

    <p class="hint">Caduca en diez minutos y solo sirve una vez. Si no lo ves, mira en spam.</p>
</main>
