//element targets
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
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//focus on the Name input field by default
const focus = document.querySelector('#name').focus();

//hide certain fields by deafult
other.style.display='none';
shirtDiv.hidden = 'true';
paypal.hidden = 'true';
bitcoin.hidden = 'true';

//Creates and appends the 'Please Select' option
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
const nameValidate = () => {
    const nameValue = name.value;
    if (nameValue.length > 0) {
        return true;
    } else {
        name.style.borderColor = 'red';
    }
}

const emailValidate = () => {
    const emailValue = email.value;
    const atIndex = emailValue.indexOf('@');
    const dotIndex = emailValue.indexOf('.');

    if (atIndex > 1 && dotIndex > atIndex +1) {
        return true;
    } else {
        email.style.borderColor = 'red';
    }
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

//Hides or reveal a given section the payment field
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
    } else {
        creditCard.hidden = 'true';
        paypal.hidden = 'true';
        bitcoin.hidden = 'true';
    }

})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameValidate();
    emailValidate();
})
