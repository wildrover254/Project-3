//Element targets
const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#mail');
const jobRole = document.querySelector('#title');
const other = document.querySelector('#other-title');
const design = document.querySelector('#design');
const shirtDiv = document.querySelector('#shirt-colors');
const color = document.querySelector('#color');
const activities = document.getElementsByClassName('activities')[0];
const checkboxes = document.querySelectorAll('.activities input');
const payment = document.querySelector('#payment');
const payOpts = document.querySelectorAll('#payment option')
const creditCard = document.querySelector('#credit-card')
const ccNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//Focus on the Name input field by default
const focus = document.querySelector('#name').focus();

//hide certain fields by deafult
other.style.display='none';
shirtDiv.hidden = 'true';
//creditCard.hidden = 'true';
paypal.hidden = 'true';
bitcoin.hidden = 'true';
payment.selectedIndex = 1;


//Creates and appends the 'Please Select' option in T-Shirt colors
const option = document.createElement('option');
option.text = "Please select a design.";
option.value = 'default';
color.add(option, 0);
color.selectedIndex = 0;

//Stores the Options for the Color Select and hides 'Please Select'
const colOpt = document.querySelectorAll('#color option');
colOpt[0].hidden = 'true';

//Creates an element that appends the activity cost.
const total = document.createElement('p');
let cost = 0;
total.textContent = `Total Activity Cost: $${cost}`;
activities.appendChild(total);

//FORM VALIDATORS
//Checks name against a regex and informs the user if the name is invalid
const nameValidate = () => {
    const nameValue = name.value;
    const validName = (name) => {
        return /^[a-z ]+$/i.test(name);
    }
    if (validName(nameValue) === true) {
        return true;
    } else {
        let span = document.createElement('span');
        span.textContent = '* Please enter a valid name.'
        name.insertAdjacentElement('beforebegin', span)
        name.style.borderColor = 'red';
        span.style.color = 'red';
        return false;
    }
}

//Checks email against a regex and informs user if email is invalid
const emailValidate = () => {
    const emailValue = email.value;
    const validMail = (email) => {
        return /^[A-Za-z0-9_]+@[a-z]+.[a-z]+$/.test(emailValue);
    }
    if (validMail(emailValue) === true) {
        return true;
    } else {
        let span = document.createElement('span');
        span.textContent = '* Please enter a valid e-mail.'
        email.insertAdjacentElement('beforebegin', span)
        email.style.borderColor = 'red';
        span.style.color = 'red';
        return false;
    }
}

//Adds a red span telling the user to selct activities if none are selected
const activityValidate = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            return true;
        }
    }
    let span = document.createElement('span');
    span.textContent = '* Please select your activities.';
    activities.insertAdjacentElement('afterbegin', span);
    span.style.color = 'red';
}

//Validates card number and notfies user if invalid
const ccNumValidate = () => {
    const ccValue = ccNumber.value;
    const validCC = (num) => {
        return /^[0-9]{13, 16}$/.test(num);
    }
    if(validCC(ccValue) === true) {
        return true;
    } else {
        let span = document.createElement('span');
        span.textContent = '* Enter a valid Credit Card Number.'
        ccNumber.insertAdjacentElement('afterend', span)
        ccNumber.style.borderColor = 'red';
        span.style.color = 'red';
    }
}

//Validates zip and notifies user if invalid
const zipValidate = () => {
    const zipValue = zip.value;
    const validZip = (num) => {
        return /^[0-9]{5}$/.test(num);
    }
    if(validZip(zipValue) === true) {
        return true;
    } else {
        let span = document.createElement('span');
        span.textContent = '* Invalid Zip.';
        zip.insertAdjacentElement('afterend', span)
        zip.style.borderColor = 'red';
        span.style.color = 'red';
    }
}

//Validates CVV and notifies user if invalid
const cvvValidate = () => {
    const cvvValue = cvv.value;
    const validCvv = (num) => {
        return /^[0-9]{3}$/.test(num);
    }
    if(validCvv(cvvValue) === true) {
        return true;
    } else {
        let span = document.createElement('span');
        span.textContent = '* Invalid CVV.';
        cvv.insertAdjacentElement('afterend', span)
        cvv.style.borderColor = 'red';
        span.style.color = 'red';
    }
}

//Wraps all card validators into a single function
const cardValid = () => {
    ccNumValidate();
    zipValidate();
    cvvValidate();
}

//EVENT LISTENERS

//Reveals the other text field when other is selected and hides it when not.
jobRole.addEventListener("change", (e) => {
    if (e.target.value ==='other') {
        other.style.display = 'block';
    } else {
        other.style.display = 'none';
    }
})

//Hides and reveals the appropriate options when a design is chosen.
/*idea to use removeAttribute found on Stack Overflow: 
https://stackoverflow.com/questions/40749613/how-to-show-hidden-elements-in-javascript-html*/
design.addEventListener("change", (e) => {
    if (e.target.value === 'js puns') {
        for (let i = 4; i <= colOpt.length - 1; i++) {
            colOpt[i].hidden = 'true';
        }
        for (let i = 1; i <= colOpt.length - 4; i++){
            colOpt[i].removeAttribute('hidden');
        }
        shirtDiv.removeAttribute('hidden');
    } else if (e.target.value === 'heart js') {
        for (let i = 1; i <= colOpt.length - 4; i++){
            colOpt[i].hidden = 'true';
        }
        for (let i = 4; i <= colOpt.length - 1; i++) {
            colOpt[i].removeAttribute('hidden');
        }
        shirtDiv.removeAttribute('hidden');
    } else {
        shirtDiv.hidden = 'true';
    }
})

/*Tabulates and displays total at the bottom of the activities div and 
disables conflicting activities*/
activities.addEventListener('change', (e) => {
    const clickedBox = e.target;
    const dataCost = parseInt(clickedBox.getAttribute('data-cost'));
    const dataTime = clickedBox.getAttribute('data-day-and-time')
    if (clickedBox.checked) {
        cost += dataCost;
        total.textContent = `Total Activity Cost: $${cost}`;
    } else {
        cost -= dataCost;
        total.textContent = `Total Activity Cost: $${cost}`;
    }
    for (let i = 0; i < checkboxes.length; i++) {
        const boxType = checkboxes[i].getAttribute('data-day-and-time');
            if(dataTime === boxType && clickedBox !== checkboxes[i]) {
                if(clickedBox.checked) {
                    checkboxes[i].disabled = true;
                } else {
                    checkboxes[i].disabled = false;
                }
            }
    }

})

//Hides or reveals a given section the payment field
payment.addEventListener('change', (e) => {
    const choice = e.target;
    const payType = choice.value;
    if (payType === 'credit card') {
        creditCard.removeAttribute('hidden');
        paypal.hidden = 'true';
        bitcoin.hidden = 'true';
    } else if (payType === 'paypal'){
        creditCard.hidden = true;
        paypal.removeAttribute('hidden');
        bitcoin.hidden = 'true';
    } else if (payType === 'bitcoin') {
        creditCard.hidden = 'true';
        paypal.hidden = 'true';
        bitcoin.removeAttribute('hidden');
    } else if (payType === 'select method') {
        creditCard.hidden = 'true';
        paypal.hidden = 'true';
        bitcoin.hidden = 'true';
    }

})

//Runs all validators upon form submission and prevents submission if one or more validations fail
form.addEventListener('submit', (e) => {
    nameValidate();
    emailValidate();
    activityValidate();
    if (payment.value === 'credit card') {
        cardValid();
    }
    if (nameValidate() === true && emailValidate() === true && activityValidate() === true && cardValid() === true) {
        console.log('Form submitted');
    } else {
        e.preventDefault();
    }
})
