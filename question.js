function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Let's see how you did, my fellow Fundservian</h1>";
    gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// Questions
var questions = [
    new Question("What does Fundserv do?", ["Transfer Files", "Create Files","Sell Orders", "Buy Orders"], "Transfer Files"),
    new Question("Is Fundserv a...", ["Dealer", "Manufacturer", "Intermediary", "Neither"], "Neither"),
    new Question("What does TFS stand for?", ["Transaction Forwarding System", "Transfer File System","The Fundserv System", "The Funnel System"], "Transaction Forwarding System"),
    new Question("Which of these codes means fund company reject?", ["N99", "N00", "All", "F99"], "F99"),
    new Question("Fund companies have a..", ["4 letter code", "4 digit code", "3 letter code", "2 digit code"], "3 letter code"),
    new Question("What are the different ways to see an order", ["Access Manager and Oracle", "Webservices and CRT", "Myserv and Messageserv", "The Funnel and Standards"], "Webservices and CRT" ),
    new Question("Who sets up advisor profiles on access manager", ["Tech support", "LRA", "App Support", "They can set themselves up"], "LRA"),
    new Question("What is the command to check channel info on CRT?", ["All information", "Archive", "Chinfo", "LS"], "Chinfo"),
    new Question("How far do our archive files go back on CRT", ["One week", "1 month", "3 months", "1 year"], "3 months"),
    new Question("Where do you go to reset a password?", ["CRT", "Oracle", "Access Manager", "Messageserv"], "Access Manager"),


];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();