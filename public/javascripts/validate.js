module.exports ={
  signup: function (userFirst, email, pass, passTwo) {
    var errors = [];
    var empty = 'Must have passwords';
    var same = 'Passwords must match';
    var email = 'Email must be filled';
    var first = 'Must provide first name';
    var length = 'Password must be at least four characters';
    if(pass === '' || passTwo === ''){
      errors.push(empty)
    }
    if (pass != passTwo){
      errors.push(same)
    }
    if (pass.length < 5 || passTwo.length < 5){
      errors.push(length)
    }
    if (email === ''){
      errors.push(email)
    }
    if(userFirst === ''){
      errors.push(first)
    }
    return errors
  },

  login: function (user, pass) {
    var errors = [];
    var empty = 'All fields must be filled';
    var same = 'Passwords must match';
    var length = 'Password must be at least four characters';
    if(user === '' || pass === ''){
      errors.push(empty)
    } else if (pass.length < 5){
      errors.push(length)
    }
    return errors
  }
}
