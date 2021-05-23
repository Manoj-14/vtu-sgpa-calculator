const btn = document.querySelector(".getInputs");
const apendinp = document.querySelector(".input");
const bgColour = document.querySelector(".results");
const hideDisplay = document.querySelector(".entry");
btn.addEventListener("submit", function (e) {
  const getInp = document.getElementById("getInp");

  if (getInp.value == false) {
    alert("Enter number of Subjects");
  } else {
    markCreditsInp(getInp.value);
    hideDisplay.style.display = "none";
    getInp.value = "";
    e.preventDefault();
  }
});
goBack = () => {
  document.location.reload();
};
markCreditsInp = (numSub) => {
  const divOne = document.querySelector(".submit-btn");

  for (let i = 1; i <= numSub; i++) {
    const marksDiv = document.createElement("div");
    marksDiv.setAttribute("class", "marks-card");

    const markinp = document.createElement("input");
    markinp.setAttribute("type", "number");
    markinp.setAttribute("placeholder", `Marks of sub ${i}`);
    markinp.setAttribute("Id", `marks-sub-${i}`);
    markinp.setAttribute("class", "marks");
    markinp.setAttribute("max", 100);

    const creditinp = document.createElement("input");
    creditinp.setAttribute("type", "number");
    creditinp.setAttribute("placeholder", `Credits of sub ${i}`);
    creditinp.setAttribute("Id", `credits-sub-${i}`);
    creditinp.setAttribute("class", "credits");
    creditinp.setAttribute("max", 4);

    marksDiv.appendChild(markinp);
    marksDiv.appendChild(creditinp);

    apendinp.insertBefore(marksDiv, divOne);
  }
  apendinp.style.display = "block";
};

const body = document.querySelector("body");

const calbtn = document.getElementById("#cal-sgpa");

const calSgpa = document.querySelector(".marks-input");
const dispGradePoint = document.querySelectorAll(".grade-point");
const dispRegCredits = document.getElementById("regCredits");
const dispEarnCredits = document.getElementById("ernCredits");
const dispTotal = document.getElementById("total");
const dispsgpa = document.getElementById("finalSgpa");

var totalSum = 0;
var subjectMarks, subjectCredits;
calSgpa.addEventListener("submit", function (e) {
  const subMarks = document.querySelectorAll(".marks");
  subjectMarks = subMarks;
  const subCredits = document.querySelectorAll(".credits");
  subjectCredits = subCredits;
  calculate(subjectMarks, subjectCredits);
  e.preventDefault();
});

function calculate(validMark, validCredits) {
  for (let i = 0; i < validMark.length; i++) {
    const checkMark = validMark[i];
    const checkCredits = validCredits[i];

    if (checkMark.value === "" || checkCredits.value === "") {
      alert("Please Enter all the Values");
      return;
    } else if (checkMark.value < 0 || checkCredits.value < 0) {
      alert("Invalid entry");
      return;
    }
  }

  gradeSub(subjectMarks);

  registerCredits();
  earnedCredits();
  finalSgpa();
  body.style.height = "auto";
  bgColour.style.display = "flex";
}

function registerCredits() {
  var sum = 0;
  for (let l = 0; l < subjectCredits.length; l++) {
    const regCred = parseInt(subjectCredits[l].value);
    sum = sum + regCred;
  }

  dispRegCredits.value = sum;
  totalSum = sum;
}
subGrade = [];
function gradeSub(marks) {
  for (let l = 0; l < marks.length; l++) {
    if (marks[l].value >= 90) {
      subGrade[l] = 10;
    } else if (marks[l].value < 90 && marks[l].value >= 80) {
      subGrade[l] = 9;
    } else if (marks[l].value < 80 && marks[l].value >= 70) {
      subGrade[l] = 8;
    } else if (marks[l].value < 70 && marks[l].value >= 60) {
      subGrade[l] = 7;
    } else if (marks[l].value < 60 && marks[l].value >= 45) {
      subGrade[l] = 6;
    } else if (marks[l].value < 45 && marks[l].value >= 40) {
      subGrade[l] = 4;
    } else {
      subGrade[l] = 0;
    }
  }
}

function earnedCredits() {
  var total = 0;
  for (let m = 0; m < subjectCredits.length; m++) {
    const regSub = parseInt(subjectMarks[m].value);
    if (regSub >= 40) {
      const earnCred = parseInt(subjectCredits[m].value);
      total = total + earnCred;
    }
  }
  dispEarnCredits.value = total;
}
function finalSgpa() {
  var subPoints = 0,
    points = 0;
  for (let n = 0; n < subjectMarks.length; n++) {
    subPoints = parseInt(subGrade[n]) * parseInt(subjectCredits[n].value);
    points = points + subPoints;
  }
  dispTotal.value = points;
  sgpa = points / totalSum;
  dispsgpa.value = sgpa.toFixed(2);
}
