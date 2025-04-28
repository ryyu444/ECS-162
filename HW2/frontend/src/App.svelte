<script lang="ts">
  import Navbar from './lib/components/navbar/navbar.svelte';
  import Footer from './lib/components/footer/footer.svelte';
  import initialSetup from './lib/helpers/initialSetup';
  import './app.css';

  window.addEventListener('load', initialSetup);
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New York Times Clone</title>
</svelte:head>

<div class="homepage">
  <!-- Header has date, title, & stock-->
  <Navbar />

  <!-- Main: load articles from NYT API into here, which is why it is empty -->
  <main class="articles"></main>

  <!-- Footer: No links added + contains some names of pages the footer leads to -->
  <Footer footerTitle="The New York Times" />
</div>
