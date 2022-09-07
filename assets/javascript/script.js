
const numQuestions = questions.length;
var numAnswers = 3;

var score = 0;
var counter = 30;
var questionNum = 0;
var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", saveHighScore);

var ansclass = document.getElementsByClassName("ans");


var ansclicked = function(e) {
    if (choose(e)) {
       // alert('Correct!');
        score+=5;
        document.querySelector(".message").textContent = "Correct!"
        // document.getElementById("question-area").style.backgroundColor = "green";
        // document.getElementById("question-area").setAttribute("style", "background-color=green");
    } else {
        counter -= 5;
        //alert('Incorrect');
        document.querySelector(".message").textContent = "Incorrect"
    }

    questionNum+=1;
    if (questionNum < numQuestions) {
        setQuestion(questionNum);
    } else {
        // Do game over man!
        gameOver();
    }
    console.log(score);
}

for (i = 0; i < ansclass.length; i++) {
    ansclass[i].addEventListener("click", ansclicked, false);
}

var startBtn = document.getElementById("start");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";

    
    var timer = setInterval    
    (function() {
        counter--;
        document.getElementById("counter").textContent = counter;
        if (counter <= 0) {
            clearInterval(timer);
            // do game over
            gameOver();
        }
    }, 1000);

    setQuestion(questionNum);
}

function setQuestion(questionNumber) {
    document.getElementById("question").textContent = questions[questionNumber].title;

    var ans = Math.ceil(Math.random() * numAnswers);
    document.getElementById("ans" + ans).textContent = questions[questionNumber].answer;
    count = 0;
    for (i = 1; i <= numAnswers; i++) {
        if (i == ans)
            continue;

        document.getElementById("ans" + i).textContent = questions[questionNumber].choices[count];
        count++;
    }
}

function choose(e) {
    var answer = questions[questionNum].answer;
    return (answer == e.target.textContent);
    
}

function gameOver() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    // show total score
    var total = document.getElementsByTagName("h3").textContent = score;
    var scoreSpan = document.getElementById("total-score");
    //scoreSpan.appendChild(total);
    scoreSpan.textContent = score
    // enter initials
    // save both to local storage
   

    // var userInitials = saveScore.
    // link to high scores page
}
function saveHighScore() {
    var userInitials = document.getElementById("initials").value;
    if (userInitials !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores") || []);
        var newHighScore = {
            score: score,
            initials: userInitials
        }
        highScores.push(newHighScore);
        localStorage.setItem("highScores", JSON.stringify(newHighScore));
        window.location.href = "highscores.html";
    }
}