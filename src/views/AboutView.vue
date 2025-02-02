<template>
     <div class="about-container">
    <h1>O nama</h1>
    <p>
      Dobrodošli na <strong>run!</strong> – vašu novu platformu za praćenje
      trkačkih događanja. Naša aplikacija je stvorena s ciljem da svim trkačima,
      bilo početnicima ili iskusnim maratoncima, pružimo jednostavan način za
      pregled nadolazećih utrka, planiranje trkačke sezone i povezivanje s
      drugim ljubiteljima trčanja. Također, nova verzija aplikacije nudi mogućnost dodavanja utrka tako da svi organizatori imaju jednostavan način oglašavanja u točno određenoj publici koja im treba.
    </p>

    <h2>Naša Misija</h2>
    <p>
      Trčanje nije samo sport, to je način života. Naša misija je promovirati
      zdrav i aktivan način života kroz trčanje, te olakšati svima pristup
      informacijama o trkačkim događajima u vašoj blizini. Vjerujemo da trčanje
      može promijeniti život na bolje i želimo pomoći što većem broju ljudi da
      postignu svoje osobne ciljeve.
    </p>

    <h2>Što Nudimo</h2>
    <ul>
      <li>Pregled nadolazećih maratona, polumaratona i trail utrka.</li>
      <li>
        Detaljne informacije o svakom događaju, uključujući datum, lokaciju i
        vrstu staze.
      </li>
      <li>Mogućnost prijave na utrke direktno iz aplikacije.</li>
      <li>
        Povezivanje s drugim trkačima kroz naše društvene funkcionalnosti.
      </li>
    </ul>

    <h2>Naš Tim</h2>
    <p>
      Sastojimo se od tima entuzijasta koji su strastveni trkači i tehnološki
      profesionalci. Zajedno smo udružili snage kako bismo kreirali platformu
      koja će biti korisna svim trkačima, bez obzira na njihovu razinu iskustva.
    </p>

    <h2>Kontaktirajte Nas</h2>
    <p>
      Uvijek smo otvoreni za povratne informacije, prijedloge i suradnju. Ako
      imate bilo kakva pitanja ili ideje, slobodno nam se obratite putem naše
      kontakt forme ili nas pratite na društvenim mrežama.
    </p>
    <p>Vidimo se na stazi!</p>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #f58634;
  font-weight: bold;
}
h2 {
  font-size: 1.75rem;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #f58634;
  font-weight: bold;
}
p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}
ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}
li {
  margin-bottom: 10px;
}
</style>