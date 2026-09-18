// Remplit bootstrap/secteur.html (la savane) en lisant ../data/csv/animaux.csv
async function chargerSavane() {
  const reponse = await fetch('../data/csv/animaux.csv');
  const texte = await reponse.text();

  const animauxSavane = texte.trim().split('\n').slice(1)
    .map(ligne => ligne.split(';'))
    .filter(champs => champs[3] === 'SAV');

  const fiches = document.querySelector('#fiches');
  fiches.innerHTML = '';

  animauxSavane.forEach(champs => {
    const [numero, espece, nom, , naissance, regime, statut, description] = champs;
    const enSoins = statut === 'soins';

    const [annee, mois, jour] = naissance.split('-');
    const dateFr = `${jour}/${mois}/${annee}`;

    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100 ${enSoins ? 'en-soins' : ''}">
        <div class="card-body">
          <h3 class="card-title h5">${nom}</h3>
          <p class="card-text">${espece} — né(e) le ${dateFr} — régime ${regime}.</p>
          ${enSoins ? `<div class="alert alert-warning mb-0" role="alert">${description}</div>` : ''}
        </div>
      </div>
    `;
    fiches.appendChild(col);
  });
}

chargerSavane();
