<script lang="ts">
  import './footerSection.css';
  let { title, links } = $$props;
</script>

<section class="footerSection">
  <h3>{title}</h3>
  <div class="footerSectionLinks">
    {#each links as link}
      <p>{link}</p>
    {/each}
  </div>
</section>
