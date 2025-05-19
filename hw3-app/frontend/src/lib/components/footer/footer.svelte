<script lang="ts">
  import FooterSection from './footerSection/footerSection.svelte';
  import './footer.css';

  let { footerTitle } = $$props;
  let footerInfo = [
    {
      title: 'NEWS',
      links: ['Home Page', 'U.S.', 'World'],
    },
    {
      title: 'ARTS',
      links: ['Dance', 'Movies', 'Music', 'Visual Arts'],
    },
    {
      title: 'LIFESTYLE',
      links: ['Food', 'Health', 'Travel', 'Fashion'],
    },
    {
      title: 'OPINION',
      links: ['Opinion', 'Editorials', 'Op-Ed', 'Letters'],
    },
    {
      title: 'MORE',
      links: ['Games', 'Cooking', 'Live Events'],
    },
  ];
</script>

<footer class="footer">
  <h2 class="footerTitle">{footerTitle}</h2>
  <div class="footerContent">
    {#each footerInfo as section}
      <FooterSection title={section.title} links={section.links} />
    {/each}
  </div>
</footer>
