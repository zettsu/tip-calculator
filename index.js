let bill = 0;
let people = 0;
let tipAmount = 0;

let billInput = document.getElementById('bill');
let peopleInput = document.getElementById('people');
let tipAmountInputs = document.querySelectorAll('input[type=radio][name=tip-amount]');
let tipAmountCustom = document.getElementById('tip-amount-custom');

let tipPlaceholder = document.getElementById('tip-amount-person-placeholder')
let totalPlaceholder = document.getElementById('total-amount-person-placeholder')


tipAmountCustom.addEventListener('focus', () => {
    uncheckRadios()
});

tipAmountCustom.addEventListener('input', (evt) => {
    tipAmount = evt.target.value / 100;
    calculate()
});

peopleInput.addEventListener('input', (evt) => {
    people = parseInt(evt.target.value);
    calculate()
});

billInput.addEventListener('change', (evt) => {
    bill = parseInt(evt.target.value);
    calculate()
});

tipAmountInputs.forEach(radio => {
    radio.addEventListener('click',  (evt) => {
        tipAmount = parseFloat(evt.target.value)
        calculate()
    })
})

document.getElementById('reset').addEventListener('click', () => {
    uncheckRadios()

    billInput.value = 0;
    peopleInput.value = 0;
    tipAmountCustom.value = 0;

    bill        = 0;
    people      = 0;
    tipAmount   = 0;
    totalPlaceholder.innerText = "0.00";
    tipPlaceholder.innerText = "0.00";
})

function uncheckRadios() {
    tipAmountInputs.forEach( radio =>
        radio.checked = false
    );
}


function validate() {

}

function calculate() {
    let total = bill + bill * tipAmount
    let totalTip = bill * tipAmount

    validate()

    tipPlaceholder.innerText = (totalTip / people).toFixed(2);
    totalPlaceholder.innerText = (total / people).toFixed(2);
}
