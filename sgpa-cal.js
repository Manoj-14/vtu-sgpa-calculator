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

var totalSum = 0;
calSgpa.addEventListener("submit", function (e) {
    calculate(subMarks, subCredits);
    e.preventDefault();
})
function calculate(validMark, validCredits) {
    for (let i = 0; i < validMark.length; i++) {
        const checkMark = validMark[i];
        const checkCredits = validCredits[i];
        
        if (checkMark.value === "" || checkCredits.value === "") {
            alert("Please Enter all the Values");
            return;
        }
        else if (checkMark.value < 0 || checkCredits.value < 0) {
            alert("Invalid entry");
            return;
        }
    }
    
    gradeSub(subMarks);
    
    registerCredits();
    earnedCredits();
    finalSgpa();
    bgColour.style.display = "flex";
}

function registerCredits() {
    var sum = 0;
    for (let l = 0; l < subCredits.length; l++) {
        const regCred = parseInt(subCredits[l].value);
        sum = sum + regCred;
    }
    
    dispRegCredits.value = sum;
    totalSum = sum;
}
subGrade=[];
function gradeSub(marks){
    for (let l = 0; l < marks.length; l++) {
        if (marks[l].value >= 90) {
            subGrade[l] = 10;
        }
        else if (marks[l].value < 90 && marks[l].value >= 80) {
            subGrade[l] = 9;
        }
        else if (marks[l].value < 80 && marks[l].value >= 70) {
            subGrade[l] = 8;
        }
        else if (marks[l].value < 70 && marks[l].value >= 60) {
            subGrade[l] = 7;
        }
        else if (marks[l].value < 60 && marks[l].value >= 45) {
            subGrade[l] = 6;
        }
        else if (marks[l].value < 45 && marks[l].value >= 40) {
            subGrade[l] = 4;
        }
        else {
            subGrade[l] = 0;
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
        subPoints = parseInt(subGrade[n]) * parseInt(subCredits[n].value);
        points = points + subPoints;
    }
    dispTotal.value = points;
    sgpa = points / totalSum;
    dispsgpa.value = sgpa.toFixed(2);
}