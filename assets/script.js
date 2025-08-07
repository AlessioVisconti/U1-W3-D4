//1)Aggiungere reset in caso di partita finita per ricominciare
//2)Aggiungere funzionalità ambo-terno etc. con tanto di suono di qualcuno che parla
//3)Aggiungere Numero alle cartelline per identificale + possibilità di farle scegliere al cliente quindi ci vuole un overview
//4)Aggiungere smorfie
//5)Aggiungere smorfie parlate
//6)Dare stile alle varie scritte
//CREO TUTTI I NUMERI DELLA TOMBOLA
const numeriDisponibili = [];

for (let i = 1; i <= 90; i++) {
  numeriDisponibili.push(i);
}
console.log("Numeri disponibili", numeriDisponibili);

let numeriEstratti = [];
let cartellaCounter = 0;

//DOM ref
const tabellone = document.getElementById("tabellone");
const numeroCorrente = document.getElementById("numeroCorrente");
const numeriEstrattiDiv = document.getElementById("numeriEstratti");
const estraiBtn = document.getElementById("estraiBtn");
const resetBtn = document.getElementById("resetBtn");
const cartellaDiv = document.getElementById("cartella");
const generaCartellaBtn = document.getElementById("generaCartellaBtn");
const cartelleContainer = document.getElementById("cartelleContainer");

// Genera il tabellone
const generaTabellone = () => {
  for (let i = 1; i <= 90; i++) {
    const cella = document.createElement("div");
    cella.classList.add("cella");
    cella.id = "numero" + i;
    cella.innerText = i;
    tabellone.appendChild(cella);
  }
};

// Genera Cartella
const generaCartella = () => {
  cartellaCounter++;
  const cartella = document.createElement("div");
  cartella.classList.add("cartella");
  cartella.id = "cartella-" + cartellaCounter;

  // Genera 15 numeri da 1 a 90
  let numeriCartella = [];
  while (numeriCartella.length < 15) {
    let n = Math.floor(Math.random() * 90) + 1;
    if (!numeriCartella.includes(n)) numeriCartella.push(n); //qui controllo se il numero nuovo è uguale ad uno dei vecchi nel caso non lo sia viene messo in cartella
  }
  numeriCartella.sort((a, b) => a - b); //qui li ordina per grandezza

  for (let cellaVerticale = 0; cellaVerticale < 3; cellaVerticale++) {
    //cellaVerticale sarebbe la i che usiamo in genere da counter, chiamata cellaVerticale perchè genera la cellaVerticale
    const row = document.createElement("div");
    row.classList.add("cellaVerticale-cartella");

    // Scegliamo 5 posizioni casuali diverse tra 0 e 8(ricordati sempre del -1)
    let posizioni = [];
    while (posizioni.length < 5) {
      let pos = Math.floor(Math.random() * 9);
      if (!posizioni.includes(pos)) posizioni.push(pos);
    }
    posizioni.sort((a, b) => a - b);

    for (let cellaOrizzontale = 0; cellaOrizzontale < 9; cellaOrizzontale++) {
      const cella = document.createElement("div");
      cella.classList.add("cella-cartella");

      if (posizioni.includes(cellaOrizzontale)) {
        // Prendiamo un numero dalla lsita numeri cartella dichiarata sopra che ormai avrà dei numeri dentro e lo assegnamo
        let numero = numeriCartella.shift();
        cella.innerText = numero;
        // Diamo un id per evidenziare dopo
        cella.id = cartella.id + "-numero-" + numero;
      } else {
        // Celle vuote
        cella.innerText = "";
      }
      row.appendChild(cella);
    }
    cartella.appendChild(row);
  }

  cartelleContainer.appendChild(cartella);
};

// Estrai un numero
const estraiNumero = () => {
  if (numeriDisponibili.length === 0) {
    alert("Tutti i numeri sono stati estratti!");
    return;
  }

  const indiceCasuale = Math.floor(Math.random() * numeriDisponibili.length); //essendo l'array numeriDisponibili composto da 90 elementi che però l'ultimo è conteggiato all'89, arrotondando per difetto il numero massimo che si ottiene è 89 che è l'ultimo punto in cui puntare nell'array.
  const numeroEstratto = numeriDisponibili.splice(indiceCasuale, 1)[0]; //lo splice fa tagliare da() a(), abbiamo detto di tagliare dal numero dato da indiceCasuale e di tagliare 1 elemento che poi ritornerà questo singolo elemento in numero estratto, l'elemento tagliato con splice sparisce come elemento nell'array originale e quindi evita la ripetizione
  numeriEstratti.push(numeroEstratto);

  // Mostra il numero corrente
  numeroCorrente.innerText = numeroEstratto;

  // Evidenzia sul tabellone
  const cella = document.getElementById("numero" + numeroEstratto);
  if (cella) {
    cella.classList.add("estratto");
  }

  // Aggiungi allo storico
  const storicoNumero = document.createElement("span");
  storicoNumero.classList.add("pallina");
  storicoNumero.innerText = numeroEstratto;
  numeriEstrattiDiv.appendChild(storicoNumero);

  // Evidenzia il numero nella cartella
  const tutteLeCelle = document.getElementsByTagName("div");
  for (let i = 0; i < tutteLeCelle.length; i++) {
    if (tutteLeCelle[i].id && tutteLeCelle[i].id.indexOf("-numero-" + numeroEstratto) !== -1) {
      //ricordati, indexof controlla l'id, se risulta hce l'id della cella è diverso da -1 aggiunge la classe che poi evidenzia
      tutteLeCelle[i].classList.add("evidenziata");
    }
  }
};

//Scatenatori di eventi
estraiBtn.addEventListener("click", estraiNumero);
generaCartellaBtn.addEventListener("click", generaCartella);
//Da qui inizia tutto
window.addEventListener("DOMContentLoaded", generaTabellone);
