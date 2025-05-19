<script>
  import { getContext, onDestroy } from 'svelte';
  import { ChevronDown, X } from '@lucide/svelte';
  import './User.css';
  let session = getContext('session');

  let sideBarOpen = $state(false);

  function toggleSideBar() {
    sideBarOpen = !sideBarOpen;
    if (sideBarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  onDestroy(() => {
    document.body.classList.remove('no-scroll');
  });

  async function handleLoginout() {
    window.location.href = !session.isLoggedIn
      ? 'http://localhost:8000/login'
      : 'http://localhost:8000/logout';
  }
</script>

{#if !session.isLoggedIn}
  <button class="loginButton" onclick={handleLoginout}>LOG IN</button>
{:else}
  <button class="accountDropdown" onclick={toggleSideBar}>
    <p>Account</p>
    <ChevronDown size={16} />
  </button>
  {#if sideBarOpen}
    <div class="accountBackground">
      <div class={'accountSideBar' + (sideBarOpen ? ' open' : '')}>
        <div class="accountSideBarHeader">
          <h2>{session.user.name}</h2>
          <X size={24} onclick={toggleSideBar} />
        </div>
        <div class="accountSideBarContent">
          <p>Good Afternoon</p>
          <button class="logoutButton" onclick={handleLoginout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}
