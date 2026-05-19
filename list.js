const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('.cycles');

const T_INIT = 25 * 60; // 25 minutes
const T_REP = 5 * 60;   // 5 minutes

let tempsTravail = T_INIT;
let tempsRepos = T_REP;
let chrono = null;
let enPause = false;
let nbCycles = 0;

// Fonction pour formater le temps en mm:ss
function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
}
// Mise à jour affichage
function updateDisplay() {
    affichageTravail.textContent = formatTime(tempsTravail);
    affichagePause.textContent = formatTime(tempsRepos);
    cycles.textContent = `Nombre de cycles : ${nbCycles}`;
}

// Démarrer le chrono
btnGo.addEventListener('click', () => {
    if (!chrono) {
        chrono = setInterval(() => {
            if (!enPause) {
                if (tempsTravail > 0) {
                    tempsTravail--;
                } else {
                    enPause = true;
                    tempsRepos = T_REP;
                }
            } else {
                if (tempsRepos > 0) {
                    tempsRepos--;
                } else {
                    enPause = false;
                    tempsTravail = T_INIT;
                    nbCycles++;
                }
            }
            updateDisplay();
        }, 1000);
    }
});

// Mettre en pause
btnPause.addEventListener('click', () => {
    if (chrono) {
        clearInterval(chrono);
        chrono = null;
    }
});

// Réinitialiser
btnReset.addEventListener('click', () => {
    clearInterval(chrono);
    chrono = null;
    tempsTravail = T_INIT;
    tempsRepos = T_REP;
    enPause = false;
    nbCycles = 0;
    updateDisplay();
});

// Initialisation
updateDisplay();
