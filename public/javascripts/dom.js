var addMember = function () {
  // var myInput = []
  var newDiv = document.createElement('div');
  var newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = 'email'
  newDiv.innerHTML = "Member";
  newDiv.appendChild(newInput);
  document.getElementById('dynamicInput').appendChild(newDiv);
};

var addContestant = function () {

  var newDiv = document.createElement('div');
  var newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = 'contestantName'
  newDiv.innerHTML = "Contestant Name";
  newDiv.appendChild(newInput)

  var secondDiv = document.createElement('div');
  var picture = document.createElement("input");
  picture.type = "url";
  picture.name = 'contestantPic'
  secondDiv.innerHTML = "Contestant Picture";
  secondDiv.appendChild(picture);
  newDiv.appendChild(secondDiv);


  var thirdDiv = document.createElement('div');
  var bachelor = document.createElement("input");
  bachelor.type = "checkbox";
  bachelor.value = 'off'
  bachelor.name = 'bachelor'
  thirdDiv.innerHTML = "Bachelor";
  thirdDiv.appendChild(bachelor)
  newDiv.appendChild(thirdDiv);

  document.getElementById('dynamicInput').appendChild(newDiv);
};
