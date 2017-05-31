require("./lib/social"); //Do not delete
var closest = require("./lib/closest");

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var N = questionsData.length;
var Nlist = Array.apply(null, {length: N}).map(Number.call, Number);
// var Gradinglist = new Array(N);
// Gradinglist = Gradinglist.fill(-1);
var Gradinglist = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

Nlist.forEach(function(nn){
  document.getElementById("answer-box-"+nn).addEventListener("click", function(e) {
    var item = closest(e.target, (".answer"));
    if (!item) return;
    if ( Gradinglist[nn] == -1 ){ // this is the "if statement" that doesn't let you re-check answers
      $(".answer"+nn).removeClass("active");
      item.className += " active";
      if (hasClass(item,"x")) {
        if (questionsData[nn]["image"] && (questionsData[nn]["type"] == "answer")) {
          var str = "<i class='fa fa-check-circle-o' aria-hidden='true'></i> That's right! <div class='inline-img inline-answer'><img src='http://ww2.hdnux.com/photos/54/11/64/"+questionsData[nn]["image"]+"/3/600x0.jpg'><div class='caption'>"+questionsData[nn]["caption"]+" <span class='byline'>"+questionsData[nn]["credit"]+"</span></div></div>";
          document.querySelector("#result"+nn).innerHTML = str;
          Gradinglist[nn] = 1;
        } else {
          document.querySelector("#result"+nn).innerHTML = "<i class='fa fa-check-circle-o' aria-hidden='true'></i> That's right!";
          Gradinglist[nn] = 1;
        }
      } else {
        var correctAnswer = answersData.filter(function(el){if(el.id == nn && el.correct == "x"){return el}})[0];
        console.log(correctAnswer);
        if (questionsData[nn]["image"] && (questionsData[nn]["type"] == "answer")) {
          var str = "<i class='fa fa-times-circle-o' aria-hidden='true'></i> Wrong! The correct answer is: "+ correctAnswer["answer"]+".<div class='inline-img inline-answer'><img src='http://ww2.hdnux.com/photos/54/11/64/"+questionsData[nn]["image"]+"/3/600x0.jpg'><div class='caption'>"+questionsData[nn]["caption"]+" <span class='byline'>"+questionsData[nn]["credit"]+"</span></div></div>";
          document.querySelector("#result"+nn).innerHTML = str;
          Gradinglist[nn] = 0;
        } else {
          document.querySelector("#result"+nn).innerHTML = "<i class='fa fa-times-circle-o' aria-hidden='true'></i> Wrong! The correct answer is: "+ correctAnswer["answer"]+".";
          Gradinglist[nn] = 0;
        }
      }
    }
  });
});

document.getElementById("grade-check").addEventListener("click",function(){

  if (Gradinglist.indexOf(-1) > -1){
    document.querySelector("#grade").innerHTML = "<div class='grade small'>You missed a question! Finish filling out the quiz and check back!</div>";
  } else {
    var sum = Gradinglist.reduce(function(a, b) { return a + b; }, 0);
    var html_str = "<div class='grade'>You got "+sum+" / "+N+"!</div>";
    gradeData.forEach(function(g){
      if ((sum <= g["max"]) && (sum >= g["min"])) {
        html_str +="<div class='grade-gif'><img src='./assets/gifs/"+g["gif"]+"'></div>";
        html_str +="<div class='grade-commentary'>"+g["answer"]+"</div>";

        // putting in specialized sharing links
        html_str +="<div class='social-block'>"

        // twitter link
        html_str += "<div class='link social-final'><a id='twitter-icon' title='Share on Twitter' href='https://twitter.com/intent/tweet?url=http%3A%2F%2Fprojects.sfchronicle.com%2F2016%2Fgeography-quiz&text=I got "+sum+" / 16 on the 2017 Chronicle MBA Finals Quiz! Take the test to challenge your Warriors fanship. '><i class='fa fa-twitter'></i></a></div>";

        // facebook link
        html_str += "<div class='link social-final'><a id='facebook-icon' title='Share on Facebook' href='#' target='_blank' onclick='window.open(\"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fprojects.sfchronicle.com%2F2016%2Fgeography-quiz\", \"facebook-share-dialog\", \"width=626,height=436\"); return false;'><i class='fa fa-facebook'></i></a></div>";

        // email link
        html_str +="<div class='link social-final'><a id='mail-icon' title='Share via email' href='mailto:?subject=2017 Travel Geography Quiz: Test your global savvy&body=I got "+sum+" / 16 on the 2016 Chronicle Travel Geography Quiz! Take the test to to challenge your global knowledge. http%3A%2F%2Fprojects.sfchronicle.com%2F2016%2Fgeography-quiz'><i class='fa fa-envelope' aria-hidden='true'></i></a></div>";

        html_str += "</div>"

      }
    });
    document.querySelector("#grade").innerHTML = html_str;
  }
  document.getElementById("grade").className = "active";

});
