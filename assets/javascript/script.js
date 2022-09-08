
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
        document.getElementById("question-area").style.backgroundColor = "green";
    } else {
        counter -= 5;
        //alert('Incorrect');
        document.querySelector(".message").textContent = "Incorrect"
        document.getElementById("question-area").style.backgroundColor = "red";
    }

    var pauseTimer = setInterval
        (function() {
            questionNum+=1;
            if (questionNum < numQuestions) {
                setQuestion(questionNum);
                document.getElementById("question-area").style.backgroundColor = "white";
        
            } else {
                // Do game over man!
                gameOver();
            }
            clearInterval(pauseTimer);
        }, 1000);

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
    scoreSpan.textContent = score
}

// save initials and score to local storage
// link to high scores page
function saveHighScore() {
    var userInitials = document.getElementById("initials").value;
    if (userInitials !== "") {
        console.log(localStorage.getItem("highScores"));
        var scores = JSON.parse(localStorage.getItem("highScores"));
        highScores = scores != null ? scores : [];
        var newHighScore = {
            score: score,
            initials: userInitials
        }
        highScores.push(newHighScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href = "highscores.html";
    }
}

function displayScores() {
    var scores = JSON.parse(localStorage.getItem("highScores"));
    var scoreDiv = document.getElementById("scores");
    if (scores == null) {
        scoreDiv.textContent = "Be the first to post a High Score!";
    } else {
        var scoreHtml = "<p>Initials----------Score</p>";
        scores.sort(function (a, b) {
            return b.score - a.score;
        })
        for (i = 0; i < scores.length; i++) {
            var score = scores[i].score;
            var initials = scores[i].initials;

            scoreHtml += `<p>${initials}------------------${score}`;
        }
        scoreDiv.innerHTML = scoreHtml;
    }
}
