<script lang="ts">
  import { setContext } from 'svelte';

  let { children } = $props();
  let session = $state({
    user: {},
    isLoggedIn: false,
  });

  // get the session from the backend
  const getUser = async () => {
    let sessionInfo = await fetch('http://localhost:8000/api/session', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await sessionInfo.json();

    console.log(sessionInfo);
    console.log(data);

    if (data.user) {
      session.user = data.user;
      session.isLoggedIn = true;
    } else {
      session.user = {};
      session.isLoggedIn = false;
    }
  };

  setContext('session', session);
</script>

<div class="auth-context">
  {#await getUser() then}
    {@render children()}
  {/await}
</div>

<style>
  .auth-context {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
