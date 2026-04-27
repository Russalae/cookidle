// -------------------------------------
// ----------- LOCAL STORAGE -----------
// -------------------------------------

// Get Daily Cookie : the cookie wont change for the player everytime they refresh the page

function getDailyCookie() {
  cookieADeviner = localStorage.getItem("cookieADeviner");
  var timeToday = new Date().getTime();
  timeToday = timeToday - (timeToday % 86400000);

  if (!cookieADeviner) {
    setLocalStorageCookie(timeToday);
  } else {
    cookieADeviner = JSON.parse(cookieADeviner);
    storageDate = cookieADeviner[0];
    if (storageDate == timeToday) {
      cookieADeviner = cookieADeviner[1];
    } else {
      setLocalStorageCookie(timeToday);
    }
  }
}

function setLocalStorageCookie(dateToday) {
  cookieADeviner = pickRandomCookie(0, cookies.length);
  localStorage.setItem(
    "cookieADeviner",
    JSON.stringify([dateToday, cookieADeviner]),
  );
}

// Get First Time : see if that's the first time the player launches the game today (patch search issues)

function getPlayerFirstTime() {
  firstTime = localStorage.getItem("firstTime");

  if (!firstTime) {
    localStorage.setItem("firstTime", JSON.stringify(firstTime));
  } else {
    firstTime = JSON.parse(firstTime);
  }
}

function setPlayerFirstTime(firstTime) {
  localStorage.setItem("firstTime", JSON.stringify(firstTime));
}

// Get Player Win Streak : keep win streak through the days

function getPlayerWinStreak() {
  winStreak = localStorage.getItem("winStreak");

  if (!winStreak) {
    localStorage.setItem("winStreak", JSON.stringify(winStreak));
  } else {
    winStreak = JSON.parse(winStreak);
  }
}

function setPlayerWinStreak(winStreak) {
  localStorage.setItem("winStreak", JSON.stringify(winStreak));
}

// Get Player Participation : if they already have played, won't make them play again

function getPlayerParticipation() {
  cookieFound = localStorage.getItem("cookieFound");

  if (!cookieFound) {
    localStorage.setItem("cookieFound", JSON.stringify(cookieFound));
  } else {
    cookieFound = JSON.parse(cookieFound);
  }
}

function setPlayerParticipation(cookieFound) {
  localStorage.setItem("cookieFound", JSON.stringify(cookieFound));
}

// Get Player Cookies : if they searched cookies, keep them in memories for today

function getPlayerAlreadySearched() {
  alreadySearched = localStorage.getItem("alreadySearched");

  if (!alreadySearched) {
    localStorage.setItem("alreadySearched", JSON.stringify(alreadySearched));
  } else {
    alreadySearched = JSON.parse(alreadySearched);
  }
}

function setPlayerAlreadySearched(alreadySearched) {
  localStorage.setItem("alreadySearched", JSON.stringify(alreadySearched));
}

// ---------------------------------
// ----------- VARIABLES -----------
// ---------------------------------

const winScreen = document.getElementById("winScreen");
const inputSection = document.getElementById("inputSection");
var gameWon = false;
var yesterdayCookie;
var winStreak = 0;
var alreadySearched = [];
let cookieADeviner = null;
var cookieFound = false;
var firstTime = true;
var noConfettis = false;

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

// --------------------------------------------
// ----------- COMPARER LES COOKIES -----------
// --------------------------------------------

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
    winGame();
  }
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

function rechercheCookie() {
  tempArray = [];
  cookieResult.replaceChildren();
  clearAvailableCookies();
  if (firstTime == true) {
    alreadySearched = [];
  }

  cookies.forEach((cookie, index) => {
    if (cookie.nom.toLowerCase().includes(inputBar.value.toLowerCase())) {
      if (!alreadySearched || alreadySearched.includes(cookie.nom)) {
      } else {
        tempArray.push(cookie.nom);
        updateAvailableCookies(cookie);
      }
    }
  });

  updateSearchCookies();
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
        setPlayerCookies(playerCookies);
      }
    }
  });
}

function createLigneCookie(cookieRentré) {
  if (cookieADeviner.nom == cookieRentré.nom) {
    gameWon = true;
  }

  if (alreadySearched.includes(cookieRentré.nom)) {
  } else {
    alreadySearched.push(cookieRentré.nom);
    updateTries(1);
    setPlayerAlreadySearched(alreadySearched);
    firstTime = false;
    setPlayerFirstTime(firstTime);
  }

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
const displayCluesQuote = document.getElementById("displayCluesQuote");
const displayCluesSkill = document.getElementById("displayCluesSkill");
const winStreakDailyText = document.getElementById("winStreakDaily");
const quoteButton = document.getElementById("quoteButton");
const skillButton = document.getElementById("skillButton");
const quoteInTries = document.getElementById("quoteInTries");
const skillInTries = document.getElementById("skillInTries");
var numberOfTries = 0;
var quoteCountdown = 5;
var skillCountdown = 10;
var quoteHidden = true;
var skillHidden = true;

function updateTries(addTry) {
  numberOfTries = numberOfTries + addTry;

  if (quoteCountdown > 1) {
    quoteCountdown -= 1;
    quoteInTries.innerHTML = "Quote in " + quoteCountdown + " tries";
  } else {
    quoteInTries.innerHTML = "Quote available!";
  }

  if (skillCountdown > 1) {
    skillCountdown -= 1;
    skillInTries.innerHTML = "Skill in " + skillCountdown + " tries";
  } else {
    skillInTries.innerHTML = "Skill available!";
  }

  displayTries.innerHTML = numberOfTries + " tries";

  if (numberOfTries == 5) {
    unlockQuote();
  }

  if (numberOfTries == 10) {
    unlockSkill();
  }

  if (numberOfTries == 15) {
    normalSkillTransformUnlock();
  }

  if (numberOfTries == 20) {
    normalSkillColorUnlock();
  }
}

function unlockQuote() {
  quoteButton.classList.remove("blackAndWhite");
  quoteButton.onclick = function () {
    toggleDisplayQuote();
  };
}

function toggleDisplayQuote() {
  if (quoteHidden) {
    if (skillHidden == false) {
      displayCluesSkill.classList.add("hidden");
      skillHidden = true;
    }
    displayCluesQuote.classList.remove("hidden");
    quoteHidden = false;
  } else {
    displayCluesQuote.classList.add("hidden");
    quoteHidden = true;
  }
}

function unlockSkill() {
  skillButton.classList.remove("blackAndWhite");
  skillButton.onclick = function () {
    toggleDisplaySkill();
  };
}

function toggleDisplaySkill() {
  if (skillHidden) {
    if (quoteHidden == false) {
      displayCluesQuote.classList.add("hidden");
      quoteHidden = true;
    }
    displayCluesSkill.classList.remove("hidden");
    skillHidden = false;
  } else {
    displayCluesSkill.classList.add("hidden");
    skillHidden = true;
  }
}

function normalSkillTransformUnlock() {
  displayCluesSkill.classList.remove("rotated");
}

function normalSkillColorUnlock() {
  displayCluesSkill.classList.remove("blackAndWhite");
}

// ---------------------------------------------
// ----------- INITIALISATION DU JEU -----------
// ---------------------------------------------

function initializeGame() {
  if (cookieFound) {
    // Faire la sauvegarde de rangs
  } else {
    startGame(0);
  }
}

function startGame() {
  getDailyCookie();
  getPlayerWinStreak();
  getPlayerParticipation();
  getPlayerAlreadySearched();
  getPlayerFirstTime();
  gameWon = false;

  quoteCountdown = 5;
  skillCountdown = 10;
  displayTries.innerHTML = numberOfTries + " tries";

  var quoteHidden = true;
  var skillHidden = true;
  displayCluesQuote.classList.add("hidden");
  displayCluesSkill.classList.add("hidden");
  quoteButton.classList.add("blackAndWhite");
  skillButton.classList.add("blackAndWhite");
  displayCluesSkill.classList.add("rotated");
  displayCluesSkill.classList.add("blackAndWhite");

  displayCluesSkill.src =
    "./assets/images/CookiesSkills/" + cookieADeviner.skill + ".png";
  displayCluesQuote.innerHTML = cookieADeviner.quote;

  if (winStreak == null) {
    winStreakDailyText.innerHTML = "Win streak : 0";
  } else {
    winStreakDailyText.innerHTML = "Win streak : " + winStreak;
  }

  winScreen.classList.add("hidden");
  inputSection.classList.remove("hidden");
}

function clearTableau() {
  var ligneCookie = document.getElementById("resultatCookie");
  while (ligneCookie.firstChild) {
    ligneCookie.removeChild(ligneCookie.firstChild);
  }
}

initializeGame();

// -----------------------------------
// ----------- DAILY RESET -----------
// -----------------------------------

const yesterdayCookieText = document.getElementById("yesterdayCookie");

function runAtSpecificTimeOfDay(hour, minutes, func) {
  const twentyFourHours = 86400000;
  const now = new Date();
  let eta_ms =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minutes,
      0,
      0,
    ).getTime() - now;
  if (eta_ms < 0) {
    eta_ms += twentyFourHours;
  }
  setTimeout(function () {
    //run once
    func();
    // run every 24 hours from now on
    setInterval(func, twentyFourHours);
  }, eta_ms);
}

runAtSpecificTimeOfDay(0, 0, () => {
  dailyReset();
});

function dailyReset() {
  cookieFound = false;
  setPlayerParticipation(cookieFound);
  clearTableau();
  alreadySearched = [];
  setPlayerAlreadySearched(alreadySearched);
  updateYesterdayCookie();
  initializeGame();
  numberOfTries = 0;
}

function updateYesterdayCookie() {
  yesterdayCookie = cookieADeviner;
  yesterdayCookieText.innerHTML = yesterdayCookie.nom;
}

// ----------------------------------------------------
// ----------- VICTOIRE / DEFAITE DU JOUEUR -----------
// ----------------------------------------------------

const canvas = document.querySelector("#confetti-canvas");
const winCookieName = document.getElementById("winCookieName");
const winCookieImage = document.getElementById("winCookieImage");
const didItText = document.getElementById("didItText");
const itWasText = document.getElementById("itWasText");
const foundInText = document.getElementById("foundInText");
const winStreakDailyText02 = document.getElementById("winStreakDaily02");

function winGame() {
  if (noConfettis == false) {
    confettis();
  }
  inputSection.classList.add("hidden");
  winScreenInitialize(cookieADeviner);
  winStreak += 1;
  setPlayerWinStreak(winStreak);
  cookieFound = true;
  setPlayerParticipation(cookieFound);
  winStreakDailyText.innerHTML = "Win streak : " + winStreak;
  winStreakDailyText02.innerHTML = "Win streak : " + winStreak;
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

  winScreen.scrollIntoView({
    behavior: "smooth",
  });

  didItText.innerHTML = "You did it! :D";

  winCookieImage.src =
    "./assets/images/CookiesPic/" + cookieADeviner.img + ".png";

  itWasText.innerHTML = "You found";
  winCookieName.innerHTML = cookieADeviner.nom;
  foundInText.innerHTML = "Found in " + numberOfTries + " tries";
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
}

function continueGame() {
  clearTableau();
  startGame(1);
}

// ------------------------------------------------
// ----------- ALREADY SEARCHED COOKIES -----------
// ------------------------------------------------

function refreshCreateLigne() {
  noConfettis = false;
  if (alreadySearched == null) {
    alreadySearched = [];
  } else {
    alreadySearched.forEach((cookie) => {
      cookies.forEach((cookieInData) => {
        if (cookieInData.nom == cookie) {
          if (cookie == cookieADeviner.nom) {
            noConfettis = true;
            winStreak = winStreak - 1;
          }
          createLigneCookie(cookieInData);
          updateTries(1);
        }
      });
    });
  }
}

refreshCreateLigne();
