// console.log(cookies);

const winScreen = document.getElementById("winScreen");
const inputSection = document.getElementById("inputSection");
var winStreak = 0;
var bestStreak = 0;
var gameWon = false;

// Gender variables
var genderArrayCD = [];
var genderArrayCJ = [];
var genderInCommon = [];
var isGenderCookieADevinerSplit = false;
var isGenderCookieJoueurSplit = false;
var genderFound = false;

// Elements variables
var elementsArrayCD = [];
var elementsArrayCJ = [];
var elementsInCommon = [];
var isElementCookieADevinerSplit = false;
var isElementCookieJoueurSplit = false;
var elementFound = false;

// -----------------------------------
// ----------- HOW TO PLAY -----------
// -----------------------------------

const howToPlayScreen = document.getElementById("howToPlayParent");

function showHowToPlay() {
  howToPlayScreen.classList.remove("hidden");
}

function hideHowToPlay() {
  howToPlayScreen.classList.add("hidden");
}

// --------------------------------------------
// ----------- SELECTION DE COOKIES -----------
// --------------------------------------------

function pickRandomCookie(min, max) {
  // Je prends un nombre entier au hasard
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  var randomCookieIndex = Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled,
  );

  // Je link le nombre au cookie de la database
  var cookieADeviner = cookies[randomCookieIndex];

  return cookieADeviner;
}

function splitGenderCookieADeviner(genderCD) {
  genderArrayCD = genderCD.split(" / ");

  isGenderCookieADevinerSplit = true;

  return genderArrayCD;
}

function splitGenderCookieJoueur(genderCJ) {
  genderArrayCJ = genderCJ.split(" / ");

  isGenderCookieJoueurSplit = true;

  return genderArrayCJ;
}

function splitElementCookieADeviner(elementCD) {
  elementsArrayCD = elementCD.split(" / ");

  isElementCookieADevinerSplit = true;

  return elementsArrayCD;
}

function splitElementCookieJoueur(elementCJ) {
  elementsArrayCJ = elementCJ.split(" / ");

  isElementCookieJoueurSplit = true;

  return elementsArrayCJ;
}

// --------------------------------------------
// ----------- COMPARER LES COOKIES -----------
// --------------------------------------------

function compareCookies(cookieADeviner, cookieJoueur, ligneCookie) {
  // Gender
  genderFound = false;

  if (cookieADeviner.gender == cookieJoueur.gender) {
    // ON REGARDE SI LES DEUX gender SONT LES MEMES
    ligneCookie.children[1].classList.add("resultatCookieTrue");
    genderFound = true;
  } else {
    splitGenderCookieADeviner(cookieADeviner.gender);
    splitGenderCookieJoueur(cookieJoueur.gender);

    genderArrayCD.forEach((genderCD) => {
      genderArrayCJ.forEach((genderCJ) => {
        if (genderCD.toLowerCase() == genderCJ.toLowerCase()) {
          ligneCookie.children[1].classList.add("resultatCookieAlmost");
          genderFound = true;
        }
      });
    });

    if (genderFound == false) {
      ligneCookie.children[1].classList.add("resultatCookieWrong");
    }
  }

  // Role
  if (cookieADeviner.role == cookieJoueur.role) {
    ligneCookie.children[2].classList.add("resultatCookieTrue");
  } else {
    ligneCookie.children[2].classList.add("resultatCookieWrong");
  }

  // Position
  if (cookieADeviner.position == cookieJoueur.position) {
    ligneCookie.children[3].classList.add("resultatCookieTrue");
  } else {
    ligneCookie.children[3].classList.add("resultatCookieWrong");
  }

  // Element

  elementFound = false;

  if (cookieADeviner.element == cookieJoueur.element) {
    // ON REGARDE SI LES DEUX ELEMENTS SONT LES MEMES
    ligneCookie.children[4].classList.add("resultatCookieTrue");
    elementFound = true;
  } else {
    // ON SPLIT L'ELEMENT DU COOKIE A DEVINER SI IL Y EN A PLUSIEURS, SINON ON N'Y TOUCHE PAS
    if (cookieADeviner.element.includes(" / ")) {
      splitElementCookieADeviner(cookieADeviner.element);
    } else {
      isElementCookieADevinerSplit = false;
      elementsArrayCD = cookieADeviner.element;
    }
    // ON SPLIT L'ELEMENT DU COOKIE JOUEUR SI IL Y EN A PLUSIEURS, SINON ON N'Y TOUCHE PAS
    if (cookieJoueur.element.includes(" / ")) {
      splitElementCookieJoueur(cookieJoueur.element);
    } else {
      isElementCookieJoueurSplit = false;
      elementsArrayCJ = cookieJoueur.element;
    }
    if (isElementCookieADevinerSplit) {
      if (isElementCookieJoueurSplit) {
        elementsArrayCD.forEach((elementCD) => {
          elementsArrayCJ.forEach((elementCJ) => {
            if (elementCD.toLowerCase() == elementCJ.toLowerCase()) {
              ligneCookie.children[4].classList.add("resultatCookieAlmost");
              elementFound = true;
            }
          });
        });
      }
    }
    if (isElementCookieADevinerSplit) {
      if (isElementCookieJoueurSplit == false) {
        elementsArrayCD.forEach((elementCD) => {
          if (elementCD.toLowerCase() == elementsArrayCJ.toLowerCase()) {
            ligneCookie.children[4].classList.add("resultatCookieAlmost");
            elementFound = true;
          }
        });
      }
    }
    if (isElementCookieJoueurSplit) {
      if (isElementCookieADevinerSplit == false) {
        elementsArrayCJ.forEach((elementCJ) => {
          if (elementCJ.toLowerCase() == elementsArrayCD.toLowerCase()) {
            ligneCookie.children[4].classList.add("resultatCookieAlmost");
            elementFound = true;
          }
        });
      }
    }
    if (elementFound == false) {
      ligneCookie.children[4].classList.add("resultatCookieWrong");
    }
  }

  // Rarity
  if (cookieADeviner.rarity == cookieJoueur.rarity) {
    ligneCookie.children[5].classList.add("resultatCookieTrue");
  } else {
    ligneCookie.children[5].classList.add("resultatCookieWrong");
  }

  // Release
  if (cookieADeviner.release == cookieJoueur.release) {
    ligneCookie.children[6].classList.add("resultatCookieTrue");
  } else {
    ligneCookie.children[6].classList.add("resultatCookieWrong");

    ligneCookie.children[6].innerHTML +=
      cookieADeviner.release > cookieJoueur.release ? " ↑" : " ↓";
  }

  // Nom
  if (cookieADeviner.nom == cookieJoueur.nom) {
    updateStreak(1);
    winGame();
  }
}

// --------------------------------------------
// ------ DISPLAY DE LA LISTE DE COOKIES ------
// --------------------------------------------

function fillMyDiv() {
  const arrayCookies = document.getElementById("resultatCookie");

  cookies.forEach((element) => {
    const ligneCookie = document.createElement("div");
    ligneCookie.classList.add("resultatCookieLigne");
    arrayCookies.appendChild(ligneCookie);

    // IMAGES

    const imgCookie = document.createElement("img");
    imgCookie.src = "./assets/images/CookiesPic/" + element.img + ".png";
    imgCookie.classList.add("resultatCookieImage");
    ligneCookie.appendChild(imgCookie);

    // NOM

    // const nomCookie = document.createElement("p");
    // nomCookie.innerHTML = element.nom;
    // ligneCookie.appendChild(nomCookie);

    // ROLE

    const roleCookie = document.createElement("p");
    roleCookie.innerHTML = element.role;
    roleCookie.classList.add("resultatCookieRole");
    ligneCookie.appendChild(roleCookie);

    // POSITION

    const positionCookie = document.createElement("p");
    positionCookie.innerHTML = element.position;
    positionCookie.classList.add("resultatCookiePosition");
    ligneCookie.appendChild(positionCookie);

    // ELEMENT

    const elementCookie = document.createElement("p");
    elementCookie.innerHTML = element.element;
    elementCookie.classList.add("resultatCookieElement");
    ligneCookie.appendChild(elementCookie);

    // RARETE

    const rarityCookie = document.createElement("p");
    rarityCookie.innerHTML = element.rarity;
    rarityCookie.classList.add("resultatCookieRarity");
    ligneCookie.appendChild(rarityCookie);

    // RELEASE

    const releaseCookie = document.createElement("p");
    releaseCookie.innerHTML = element.release;
    releaseCookie.classList.add("resultatCookieRelease");
    ligneCookie.appendChild(releaseCookie);
  });
}

// --------------------------------------------
// ----------- RECHERCHE DE COOKIES -----------
// --------------------------------------------

const inputBar = document.getElementById("typedCookie");
const result = document.getElementById("result");
const cookieResult = document.getElementById("cookieResult");
const arrayCookies = document.getElementById("resultatCookie");
const availableCookies = document.getElementById("availableCookies");

var tempArray = [];
var alreadySearched = [];

function rechercheCookie() {
  // result.innerHTML = inputBar.value;

  tempArray = [];
  cookieResult.replaceChildren();
  clearAvailableCookies();

  cookies.forEach((cookie, index) => {
    if (cookie.nom.toLowerCase().includes(inputBar.value.toLowerCase())) {
      if (alreadySearched.includes(cookie.nom)) {
      } else {
        tempArray.push(cookie.nom);
        updateAvailableCookies(cookie);
      }
    }
  });

  updateSearchCookies();

  // result.innerHTML = tempArray;
}

function updateSearchCookies() {
  tempArray.forEach((element) => {
    const resultatRechercheCookie = document.createElement("option");
    resultatRechercheCookie.innerHTML = element;
    cookieResult.appendChild(resultatRechercheCookie);
  });
}

function updateAvailableCookies(cookie) {
  availableCookies.classList.remove("hidden");

  const ligneAvailableCookies = document.createElement("div");
  ligneAvailableCookies.classList.add("resultatAvailableCookies");
  ligneAvailableCookies.id = "resultatAvailableCookies";
  ligneAvailableCookies.onclick = function () {
    createLigneCookie(cookie);
  };
  availableCookies.appendChild(ligneAvailableCookies);

  // IMAGES

  const imgAvailableCookie = document.createElement("img");
  imgAvailableCookie.src = "./assets/images/CookiesPic/" + cookie.img + ".png";
  imgAvailableCookie.classList.add("resultatAvailableCookieImage");
  ligneAvailableCookies.appendChild(imgAvailableCookie);

  // NOM

  const nomAvailableCookie = document.createElement("p");
  nomAvailableCookie.innerHTML = cookie.nom;
  ligneAvailableCookies.appendChild(nomAvailableCookie);
}

function clearAvailableCookies() {
  availableCookies.classList.add("hidden");
  while (availableCookies.firstChild) {
    availableCookies.removeChild(availableCookies.firstChild);
  }
}

function verifyCookie() {
  cookies.forEach((cookie, index) => {
    if (inputBar.value == cookie.nom) {
      if (alreadySearched.includes(cookie.nom)) {
      } else {
        createLigneCookie(cookie);
        inputBar.value = "";
      }
    }
  });
}

function createLigneCookie(cookieRentré) {
  if (cookieADeviner.nom == cookieRentré.nom) {
    gameWon = true;
  }

  alreadySearched.push(cookieRentré.nom);
  updateTries(1);

  const ligneCookie = document.createElement("div");
  ligneCookie.classList.add("resultatCookieLigne");
  ligneCookie.id = "resultatCookieLigne";
  arrayCookies.appendChild(ligneCookie);

  // IMAGES

  const imgCookie = document.createElement("img");
  imgCookie.src = "./assets/images/CookiesPic/" + cookieRentré.img + ".png";
  imgCookie.classList.add("resultatCookieImage");
  imgCookie.classList.add("fadeIn");
  ligneCookie.appendChild(imgCookie);

  // NOM

  // const nomCookie = document.createElement("p");
  // nomCookie.innerHTML = cookieRentré.nom;
  // ligneCookie.appendChild(nomCookie);

  // GENDER

  const genderCookie = document.createElement("p");
  genderCookie.innerHTML = cookieRentré.gender;
  genderCookie.classList.add("resultatCookieTexte");
  genderCookie.classList.add("fadeIn");
  ligneCookie.appendChild(genderCookie);

  // ROLE

  const roleCookie = document.createElement("p");
  roleCookie.innerHTML = cookieRentré.role;
  roleCookie.classList.add("resultatCookieTexte");
  roleCookie.classList.add("fadeIn");
  ligneCookie.appendChild(roleCookie);

  // POSITION

  const positionCookie = document.createElement("p");
  positionCookie.innerHTML = cookieRentré.position;
  positionCookie.classList.add("resultatCookieTexte");
  positionCookie.classList.add("fadeIn");
  ligneCookie.appendChild(positionCookie);

  // ELEMENT

  const elementCookie = document.createElement("p");
  elementCookie.innerHTML = cookieRentré.element;
  elementCookie.classList.add("resultatCookieTexte");
  elementCookie.classList.add("fadeIn");
  ligneCookie.appendChild(elementCookie);

  // RARETE

  const rarityCookie = document.createElement("p");
  rarityCookie.innerHTML = cookieRentré.rarity;
  rarityCookie.classList.add("resultatCookieTexte");
  rarityCookie.classList.add("fadeIn");
  ligneCookie.appendChild(rarityCookie);

  // RELEASE

  const releaseCookie = document.createElement("p");
  releaseCookie.innerHTML = cookieRentré.release;
  releaseCookie.classList.add("resultatCookieTexte");
  releaseCookie.classList.add("fadeIn");
  ligneCookie.appendChild(releaseCookie);

  compareCookies(cookieADeviner, cookieRentré, ligneCookie);
  clearSearchSection();
}

function clearSearchSection() {
  clearAvailableCookies();
  inputBar.value = "";
}

// --------------------------------------------
// ----------- NOMBRE DE RECHERCHES -----------
// --------------------------------------------

const displayTries = document.getElementById("numberOfTries");
const displayStreak = document.getElementById("winStreak");
const displayBestStreak = document.getElementById("bestStreak");
var numberOfTries = 0;
var maxTries = 5;

function updateTries(addTry) {
  numberOfTries = numberOfTries + addTry;
  displayTries.innerHTML = numberOfTries + "/" + maxTries + " tries";

  if (numberOfTries == maxTries && gameWon == false) {
    loseGame();
  }
}

// ---------------------------------------------
// ----------- INITIALISATION DU JEU -----------
// ---------------------------------------------

function initializeGame() {
  startGame(0);
  winStreak = 0;
}

function startGame() {
  cookieADeviner = pickRandomCookie(0, cookies.length);
  alreadySearched = [];
  gameWon = false;

  numberOfTries = 0;
  displayTries.innerHTML = numberOfTries + "/" + maxTries + " tries";
  displayBestStreak.innerHTML = "Best streak : " + bestStreak;
  displayStreak.innerHTML = "Win streak : " + winStreak;

  winScreen.classList.add("hidden");
  inputSection.classList.remove("hidden");
}

function updateStreak(addStreak) {
  winStreak += addStreak;

  displayStreak.innerHTML = "Win streak : " + winStreak;
}

function clearTableau() {
  var ligneCookie = document.getElementById("resultatCookie");
  while (ligneCookie.firstChild) {
    ligneCookie.removeChild(ligneCookie.firstChild);
  }
}

initializeGame();

// ----------------------------------------------------
// ----------- VICTOIRE / DEFAITE DU JOUEUR -----------
// ----------------------------------------------------

const canvas = document.querySelector("#confetti-canvas");
const winCookieName = document.getElementById("winCookieName");
const winCookieImage = document.getElementById("winCookieImage");
const didItText = document.getElementById("didItText");
const itWasText = document.getElementById("itWasText");
const foundInText = document.getElementById("foundInText");
const currentStreakText = document.getElementById("currentStreakText");
const bestStreakTextWinScreen = document.getElementById(
  "bestStreakTextWinScreen",
);

function winGame() {
  confettis();
  inputSection.classList.add("hidden");
  winScreenInitialize(cookieADeviner);
}

function confettis() {
  var myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  });
  myConfetti({
    particleCount: 100,
    spread: 160,
  });
}

function loseGame() {
  inputSection.classList.add("hidden");
  loseScreenInitialize(cookieADeviner);
}

function winScreenInitialize(cookieADeviner) {
  winScreen.classList.remove("hidden");

  if (winStreak > bestStreak) {
    bestStreak = winStreak;
  }

  winScreen.scrollIntoView({
    behavior: "smooth",
  });

  didItText.innerHTML = "You did it! :D";

  winCookieImage.src =
    "./assets/images/CookiesPic/" + cookieADeviner.img + ".png";

  itWasText.innerHTML = "You found";
  winCookieName.innerHTML = cookieADeviner.nom;
  foundInText.innerHTML = "Found in " + numberOfTries + " tries";
  currentStreakText.innerHTML = "Current streak : " + winStreak;
  bestStreakTextWinScreen.innerHTML = "Best streak : " + bestStreak;
}

function loseScreenInitialize(cookieADeviner) {
  winScreen.classList.remove("hidden");

  winScreen.scrollIntoView({
    behavior: "smooth",
  });

  didItText.innerHTML = "Maybe next time!";

  winCookieImage.src =
    "./assets/images/CookiesPic/" + cookieADeviner.img + ".png";

  itWasText.innerHTML = "It was";
  winCookieName.innerHTML = cookieADeviner.nom;
  foundInText.innerHTML = "Not found!";
  currentStreakText.innerHTML = "Current streak : " + winStreak;
  bestStreakTextWinScreen.innerHTML = "Best streak : " + bestStreak;

  winStreak = 0;
}

function continueGame() {
  clearTableau();
  startGame(1);
}
