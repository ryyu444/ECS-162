<script lang="ts">
  import AuthContext from './lib/context/AuthContext.svelte';
  import Navbar from './lib/components/navbar/navbar.svelte';
  import Articles from './lib/components/articles/Articles.svelte';
  import Footer from './lib/components/footer/footer.svelte';
  import './app.css';

</script>

<svelte:head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New York Times Clone</title>
</svelte:head>

<div class="homepage">
  <AuthContext>
    <!-- Header has date, title, & stock-->
    <Navbar />

    <!-- Main: load articles from NYT API into here, which is why it is empty -->
    <Articles />

    <!-- Footer: No links added + contains some names of pages the footer leads to -->
    <Footer footerTitle="The New York Times" />
  </AuthContext>
</div>
