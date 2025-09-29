const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// sidebar open/close
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Close sidebar 
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// toggle sidebar
const dropdownToggles = sidebar.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', e => {
    e.preventDefault();
    const parent = toggle.parentElement;
    parent.classList.toggle('open');
  });
});


//form validation--------

const form = document.querySelector("#form");
const inputs = form.querySelectorAll("input, textarea");
const data = {};

//error message

function setError(id, message) {
    const errorElement = document.getElementById("error-" + id);
    if (errorElement) {
        errorElement.innerText = message;
    }
}

function clearError(id) {
    setError(id, "");
}

function startWithCharOrnot(value) {
    const firstChar = value[0];
    return (
        (firstChar >= 'a' && firstChar <= 'z') ||
        (firstChar >= 'A' && firstChar <= 'Z')
    );
}

//First Name validation

function fnameValidation(value) {
    if (!value.trim()) {
        setError("fname", "This field is required");
        return false;
    }
    if (value.length < 5) {
        setError("fname", "First Name should be min 6 length");
        return false;
    }
    if (!startWithCharOrnot(value)) {
        setError("fname", "Please enter a valid name");
        return false;
    }
    clearError("fname");
    return true;
}

//Last Name validation

function lnameValidation(value) {
    if (!value.trim()) {
        setError("lname", "This field is required");
        return false;
    }
    if (value.length < 4) {
        setError("lname", "Last Name should be min 4 length");
        return false;
    }
    if (!startWithCharOrnot(value)) {
        setError("lname", "Please enter a valid name");
        return false;
    }
    clearError("lname");
    return true;
}

//Email validation

function checkValidGmail(email) {
    const atIndex = email.indexOf('@');
    if (atIndex < 1 || !email.includes('.') || email.slice(atIndex).length < 3) {
        return false;
    }
    return true;
}

function emailValidation(value) {
    if (!value.trim()) {
        setError("email", "This field is required");
        return false;
    }
    if (!checkValidGmail(value)) {
        setError("email", "Please enter a valid email");
        return false;
    }
    clearError("email");
    return true;
}

//Phone Number validation
function phoneValidation(value) {
    if (!value.trim()) {
        setError("phone", "This field is required");
        return false;
    }
    if (value.length !== 10 || ![...value].every(isDigit)) {
        setError("phone", "Phone number should be 10 digits");
        return false;
    }
    clearError("phone");
    return true;
}

//Check enter number should be Digit

function isDigit(char) {
    return char >= '0' && char <= '9';
}

//DOB validation

function dobValidation(value) {
    if (!value.trim()) {
        setError("dob", "This field is required");
        return false;
    }
    clearError("dob");
    return true;
}

//Gender validation

function genderValidation() {
    const radios = document.getElementsByName("gender");
    for (let radio of radios) {
        if (radio.checked) {
            clearError("gender");
            return radio.value;
        }
    }
    setError("gender", "This field is required");
    return false;
}

//Hobby validation

function hobbiesValidation() {
    const checkboxes = document.getElementsByName("Hobby");
    const selected = [];
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selected.push(checkbox.nextElementSibling.innerText.trim());
        }
    }
    if (selected.length === 0) {
        setError("hobby", "Please select at least one hobby");
        return false;
    }
    clearError("hobby");
    return selected;
}

//Message Validation

function messageValidation(value) {
    if (!value.trim()) {
        setError("message", "This field is required");
        return false;
    }
    clearError("message");
    return true;
}

//Check validation condition  

function conditionsValidation() {
    const checkboxes = document.getElementsByName("conditions");
    const selected = [];
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selected.push(checkbox.nextElementSibling.innerText.trim());
        }
    }
    if (selected.length === 0) {
        setError("conditions", "Please select at least one option");
        return false;
    }
    clearError("conditions");
    return selected;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("DOB").value.trim();
    const message = document.getElementById("Message").value.trim();

    if (!fnameValidation(fname)) isValid = false;
    else data["fname"] = fname;

    if (!lnameValidation(lname)) isValid = false;
    else data["lname"] = lname;

    if (!emailValidation(email)) isValid = false;
    else data["email"] = email;

    if (!phoneValidation(phone)) isValid = false;
    else data["phone"] = phone;

    if (!dobValidation(dob)) isValid = false;
    else data["DOB"] = dob;

    const gender = genderValidation();
    if (!gender) isValid = false;
    else data["gender"] = gender;

    const hobbies = hobbiesValidation();
    if (!hobbies) isValid = false;
    else data["hobbies"] = hobbies;

    if (!messageValidation(message)) isValid = false;
    else data["message"] = message;

    const conditions = conditionsValidation();
    if (!conditions) isValid = false;
    else data["Allow"] = conditions;

    if (isValid) {
        console.log("Form Submitted Successfully");
        console.log(data);
        localStorage.setItem("formData", JSON.stringify(data));
    } else {
        console.log("Form has errors. Fix them first.");
    }
});
