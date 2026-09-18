async function chargerSecteurs() {
  const [repSecteurs, repAnimaux] = await Promise.all([
    fetch('data/csv/secteurs.csv'),
    fetch('data/csv/animaux.csv')
  ]);
  const texteSecteurs = await repSecteurs.text();
  const texteAnimaux = await repAnimaux.text();

  const lignesSecteurs = texteSecteurs.trim().split('\n').slice(1);
  const lignesAnimaux = texteAnimaux.trim().split('\n').slice(1);

  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  lignesSecteurs.forEach(ligne => {
    const [code, nom, , surface, capacite] = ligne.split(';');
    const nbAnimaux = lignesAnimaux.filter(l => l.split(';')[3] === code).length;

    const tr = document.createElement('tr');
    tr.id = code;
    tr.innerHTML =
      `<td>${nom}</td><td>${surface}</td><td>${capacite}</td><td>${nbAnimaux}</td>`;
    tbody.appendChild(tr);
  });
}

chargerSecteurs();