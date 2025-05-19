<script lang="ts">
  import './navbar.css';
  import User from './user/User.svelte';
  let {
    navbarTitle = 'The New York Times',
  } = $props();

  // set date
  const date = new Date();
  const day = date.toLocaleString('en-us', { weekday: 'long' });
  const dateString = date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  let navbarDate = day + ', ' + dateString;
</script>

<header class="navbar">
  <section class="navbarLeft">
    <h2 class="navbarDate">{navbarDate}</h2>
    <a href="https://www.nytimes.com/section/todayspaper">
      <p>Today's Paper</p>
    </a>
  </section>./user/User.svelte
  <h1 class="navbarTitle">{navbarTitle}</h1>
  <section class="navbarRight">
    <User />
  </section>
</header>
