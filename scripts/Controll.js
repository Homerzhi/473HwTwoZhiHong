(function(window) {
  'use strict';
  // var INPUT_SELECTOR='[data="option-input"]';
  var App = window.App || {};
  var Students = App.Students;
  var sts = new Students();

  // generate random integer
  function rn(max) {
    return function() {
      return Math.floor(Math.random() * (max));
    }
  }

  //randomly combine names, courses and gpas.
  //add to model.
  var courses = ["HCOM 100", "ENGL 101", "PHIL 106", "PHYS 225", "BIOL 101", "MATH 150", "CHEM 313", "FIN 310", "ART 333", "ECON 202", "HIST 201"];
  var gpas = [4.0, 3.7, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];
  var fns = ["James", "Michael", "Robert", "Maria", "David", "Christopher", "Daniel", "Matthew", "Anthony", "Andrew", "Steven", "Joshua", "Kevin", "Mary", "Emma", "Olive", "EmilySofia"];
  var lns = ["Smith", "Davis", "Jones", "Jackson", "Adams", "Price"];
  var gindex = rn(gpas.length);
  var lindex = rn(lns.length);
  var cindex = rn(courses.length);
  for (var i = 0; i < fns.length; i++) {   //loop first name
    sts.addStudent(fns[i], lns[lindex()]);  //randomly add last name.
    var cs = [];
    var temp = 0;
    for (var j = 0; j < 5; j++) {           //generate a number set  0-5
      temp = cindex();
      if (temp in cs == false) {
        cs.push(temp);
      }
    };
    for (var j = 0; j < cs.length; j++) {   //randomly add course, gpas
      sts.addGrade(courses[cs[j]], gpas[gindex()]);
    };
  }


  var INPUT_SELECTOR = '[data="input"]';
  var LINK_SELECTOR = '[st="st list"]'
  var LinkView = App.LinkView;


  // add event listener to search;
  var formElement = document.querySelector(INPUT_SELECTOR);
  formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('input is ');
    console.log(event.target[0].value);
    var ln = event.target[0].value;
    var r = sts.searchLName(ln);
    var linkView = new LinkView(LINK_SELECTOR);
    for (const [k, v] of Object.entries(r)) {
      linkView.addChildLink(v.firstName, v.lastName, k);
    }

    event.target.reset();
    event.target[0].focus();
  });
  //add event listen to name list area.
  document.querySelector(LINK_SELECTOR).addEventListener('mouseover', function(event) {
    event.preventDefault();
    var stid = parseInt(event.target.attributes.getNamedItem('csufid').value);
    var grade = sts.gradeOfCSUFID(stid);
    var dg = new LinkView('[grade="gpa"]');

    dg.addTableTitle(event.target.value);
    for (var k in grade) {
      dg.addChildTable(k, grade[k]);
    }

  });

})(window);
