<script lang="ts">
  import './navbar.css';
  import Button from "./Button.svelte"
  let {
    navbarTitle = 'The New York Times',
    navbarDate = 'Wednesday, May 17, 2025',
  } = $props();
</script>

<header class="navbar">
  <section class="navbarLeft">
    <h2 class="navbarDate">{navbarDate}</h2>
    <a href="https://www.nytimes.com/section/todayspaper">
      <p>Today's Paper</p>
    </a>
  </section>
  <h1 class="navbarTitle">{navbarTitle}</h1>
  <section class="navbarRight">
    <Button variant="nyt">Sign In</Button>
  </section>
</header>