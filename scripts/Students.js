(function(window) {
  'use strict';
  var App = window.App || {};

  // data model,   view is to create dynamic option from the data model.
  function Students() {
    if(this.id==undefined){
      this.id=0;
    }
    this.sts={};

    // this.stID ={this.id:{}} ;
    console.log("in model id=:",this.id);

  };

  //
  // "firstName": "property",
  // "lastName": "property",
  // "grades": "collection"


  Students.prototype.addStudent = function(fn, ln) {
    console.log("in add fn id=:",this.id);
    this.sts[this.id]={};
    this.sts[this.id].firstName=fn;
    this.sts[this.id].lastName=ln;
    this.sts[this.id].grades={};
    this.id++;
  };


  Students.prototype.addGrade = function(course, gpa) {
    this.sts[this.id-1].grades[course] = gpa;
    // console.log(this.sts[this.id-1].grades);
  };
  Students.prototype.allStudents = function() {
    if (Object.keys(this.sts).length != 0) {
      for (var id in this.sts) {
        console.log('st No:', id);
        for (var k in this.sts[id]) {
          console.log(k, ":", this.sts[id][k]);
        }
      }
    } else {
      console.log('no student list');
    }

  };




  /* testing
  var sts=App.Students;
  var st=new sts();
  st.addStudent('zhi');
  st.addGrade('zhi','math',33);
  st.addGrade('zhi','eng',55);
  st.addStudent('bbk');
  st.addGrade('bbk','math',100);
  st.allStudents();
  */
  Students.prototype.searchLName = function(ln) {
    var result={};
    for (var id in this.sts) {
        if(this.sts[id].lastName==ln) {
        result[id]=this.sts[id];
      }
    }
    if (Object.keys(result).length==0) {
      console.log('no match')
      alert('no this name, check input please');
    }
    else{
      return result;
    }

  };


  Students.prototype.gradeOfCSUFID = function(csufid) {
    return this.sts[csufid].grades;

  };



  App.Students = Students;
  window.App = App;
})(window);

// • Models manage data. When data changes, the model tells anyone who is listening.
