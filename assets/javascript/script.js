
const numQuestions = questions.length;
var numAnswers = 3;

var score = 0;
var counter = 30;
var questionNum = 0;


var ansclass = document.getElementsByClassName("ans");


var ansclicked = function(e) {
    if (choose(e)) {
       // alert('Correct!');
        score+=1;
    } else {
        counter -= 5;
        //alert('Incorrect');
    }

    questionNum+=1;
    if (questionNum < numQuestions) {
        setQuestion(questionNum);
    } else {
        // Do game over man!
    }
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
}