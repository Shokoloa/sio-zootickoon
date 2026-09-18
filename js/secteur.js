async function chargerSecteur() {
  const [reponseSecteurs, reponseAnimaux] = await Promise.all([
    fetch('data/csv/secteurs.csv'),
    fetch('data/csv/animaux.csv')
  ]);
  const texte = await reponseAnimaux.text();
  const secteurTexte = await reponseSecteurs.text();

  const secteurHash = window.location.hash.substring(1);
  const secteur = secteurTexte.trim().split('\n').slice(1)
    .map(ligne => ligne.split(';'))
    .filter(champs => champs[0] === secteurHash);

  const animauxSecteur = texte.trim().split('\n').slice(1)
    .map(ligne => ligne.split(';'))
    .filter(champs => champs[3] === secteurHash);

  document.getElementById('secteur-titre').innerText = secteur[0][1];
  document.getElementById('secteur-img').src = `data/images/${secteur[0][5]}`;
  document.getElementById('secteur-img').alt = secteur[0][2];
  document.getElementById('secteur-p').innerText = secteur[0][2];

  const sommaire = document.querySelector('#sommaire');
  const fiches = document.querySelector('#fiches');

  sommaire.innerHTML = '';
  fiches.innerHTML = '';

  animauxSecteur.forEach(champs => {
    const [numero, espece, nom, , naissance, regime, statut, description] = champs;

    const id = `animal-${numero}`;
    const enSoins = statut === 'soins';

    // Sommaire
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${id}">${nom}</a>`;
    sommaire.appendChild(li);

    // Date
    const [annee, mois, jour] = naissance.split('-');
    const dateFr = `${jour}/${mois}/${annee}`;

    // Fiche
    const article = document.createElement('article');
    article.id = id;

    if (enSoins) {
      article.classList.add('en-soins');
    }

    article.innerHTML = `
      <h3>${nom}${enSoins ? ' <small>(en soins)</small>' : ''}</h3>
      <p>${espece} — né(e) le ${dateFr} — régime ${regime}.</p>
      <p>${description}</p>
    `;

    fiches.appendChild(article);
  });
}

chargerSecteur();