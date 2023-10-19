const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const togglePassword1 = document.getElementById('toggle-password1');
const togglePassword2 = document.getElementById('toggle-password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length 
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else {
    showSuccess(input);
  } 
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Password strength meter
password.addEventListener('input', updatePasswordStrengthMeter);
password2.addEventListener('input', updatePasswordStrengthMeter);

function updatePasswordStrengthMeter(event) {
  const input = event.target;
  const meter = document.getElementById(`password-strength-meter${input.id === 'password' ? '1' : '2'}`);

  meter.style.display = 'block';

  if (input.value.length > 10) {
    meter.style.background = 'green';
  } else if (input.value.length > 5) {
    meter.style.background = 'orange';
  } else {
    meter.style.background = 'red';
  }

  if (input.value.length === 0) {
    meter.style.display = 'none';
  }
}

// Toggle password visibility
togglePassword1.addEventListener('change', function() {
  togglePasswordVisibility(password, this.checked);
});

togglePassword1.addEventListener('change', function() {
  togglePasswordVisibility(password2, this.checked);
});

function togglePasswordVisibility(input, isChecked) {
  input.type = isChecked ? 'text' : 'password';
}


// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});