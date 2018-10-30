(function(window) {
  'use strict';
  var App = window.App || {};

  // view model,   view is to create dynamic option from the data model.
  function LinkView(selector) {
    console.log("in view:");
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.root = document.querySelector(selector);
    if (this.root.length === 0) {
      throw new Error('could not find element with selector: ' + selector);
    }
    while (this.root.hasChildNodes()) {
      this.root.removeChild(this.root.lastChild);
    }
  };

  // var fe = document.querySelector('[st="st list"]');
  // <input type='button' class="button" value="name1">
  LinkView.prototype.addChildLink = function(fn, ln, csufid) {
    this.child = document.createElement('input');
    this.child.setAttribute('type', 'button');
    this.child.setAttribute('class', 'button');
    this.child.setAttribute('csufid', csufid);
    this.child.setAttribute('value', fn + ' ' + ln);
    this.root.appendChild(this.child);
  };

LinkView.prototype.addTableTitle = function(name) {
  var node= document.createElement('h3');
  node.innerHTML= 'Grades for '+name+':';
  this.root.appendChild(node);
};

  LinkView.prototype.addChildTable = function(course, gpa) {
    if(this.parent==undefined || this.parent==null){
      this.parent = document.createElement('table');
    }

    if(this.tableHeader==undefined || this.tableHeader==null){

      this.tableHeader=document.createElement('tr');
      var gchild=document.createElement('th');
      gchild.innerHTML= 'Course';
      this.tableHeader.appendChild(gchild);
      gchild=document.createElement('th');
      gchild.innerHTML= 'GPA';
      this.tableHeader.appendChild(gchild);
      this.parent.appendChild(this.tableHeader);
    };

    var child=document.createElement('tr');
    var gchild=document.createElement('td');
    gchild.innerHTML= course;
    child.appendChild(gchild);
    gchild=document.createElement('td');
    gchild.innerHTML=gpa;
    // ('value', gpa.toString());
    child.appendChild(gchild);
    this.parent.appendChild(child);

    this.root.appendChild(this.parent);
  };

  App.LinkView = LinkView;
  window.App = App;
})(window);


// • Views manage the user interface.
// handle presentation of models and listen for any changes.
// when UI events fire in response to user input,
// they call handler functions in the controller.
