const calbtn = document.getElementById("#cal-sgpa");
const bgColour = document.querySelector(".results");
const calSgpa = document.querySelector('.marks-input');
const subMarks = document.querySelectorAll(".marks");
const subCredits = document.querySelectorAll(".credits");
const dispGradePoint = document.querySelectorAll(".grade-point");
const dispRegCredits = document.getElementById("regCredits");
const dispEarnCredits = document.getElementById("ernCredits");
const dispTotal = document.getElementById("total");
const dispsgpa = document.getElementById("finalSgpa");
// importing credit points
const subCredits1 = document.getElementById("credits-sub-1");
const subCredits2 = document.getElementById("credits-sub-2");
const subCredits3 = document.getElementById("credits-sub-3");
const subCredits4 = document.getElementById("credits-sub-4");
const subCredits5 = document.getElementById("credits-sub-5");
const subCredits6 = document.getElementById("credits-sub-6");
var sum = 0;
calSgpa.addEventListener("submit", function (e) {
    calculate(subMarks, subCredits);
    e.preventDefault();
})
function calculate(validMark, validCredits) {
    for (let i = 0; i < validMark.length; i++) {
        const checkMark = validMark[i];
        const checkCredits = validCredits[i];
        // console.log(element.value);
        if (checkMark.value === "" || checkCredits.value === "") {
            alert("Please Enter all the Values");
            return;
        }
        else if (checkMark.value < 0 || checkCredits.value < 0) {
            alert("Invalid entry");
            return;
        }
    }
    calGradePoint(subMarks, dispGradePoint);
    registerCredits();
    earnedCredits();
    finalSgpa();
}
// Registered Credits
function registerCredits() {

    for (let l = 0; l < subCredits.length; l++) {
        const regCred = parseInt(subCredits[l].value);
        sum = sum + regCred;
    }
    // console.log(sum);
    dispRegCredits.value = sum;
}

// Calculating grade point 
function calGradePoint(marks, gradePoint) {
    for (let k = 0; k < marks.length; k++) {
        if (marks[k].value >= 90) {
            gradePoint[k].value = 10;
        }
        else if (marks[k].value < 90 && marks[k].value >= 80) {
            gradePoint[k].value = 9;
        }
        else if (marks[k].value < 80 && marks[k].value >= 70) {
            gradePoint[k].value = 8;
        }
        else if (marks[k].value < 70 && marks[k].value >= 60) {
            gradePoint[k].value = 7;
        }
        else if (marks[k].value < 60 && marks[k].value >= 45) {
            gradePoint[k].value = 6;
        }
        else if (marks[k].value < 45 && marks[k].value >= 40) {
            gradePoint[k].value = 4;
        }
        else {
            gradePoint[k].value = 0;
        }
    }
}
// earned credits
function earnedCredits() {
    var total = 0;
    for (let m = 0; m < subCredits.length; m++) {
        const regSub = parseInt(subMarks[m].value);
        if (regSub >= 40) {
            const earnCred = parseInt(subCredits[m].value);
            total = total + earnCred;
        }
    }
    dispEarnCredits.value = total;
}
function finalSgpa() {
    var subPoints = 0, points = 0;
    for (let n = 0; n < subMarks.length; n++) {
        subPoints = parseInt(dispGradePoint[n].value) * parseInt(subCredits[n].value);
        points = points + subPoints;
    }
    dispTotal.value = points;
    sgpa = points / sum;
    dispsgpa.value = sgpa;
}