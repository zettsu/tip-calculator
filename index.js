let tipAmount = 0

let tipAmountRadios = document.querySelectorAll('input[type=radio][name=tip-amount]')
let tipAmountCustom = document.getElementById('tip-amount-custom')
let tipPlaceholder  = document.getElementById('tip-amount-person-placeholder')
let totalPlaceholder = document.getElementById('total-amount-person-placeholder')

tipAmountCustom.addEventListener('focus', () => {
    uncheckRadios()
});

function cleanErrorMessages() {
    document.querySelectorAll(`.error-msg`).forEach(msg => msg.innerText = "")
}

['input','focusout'].forEach( event => {
    tipAmountCustom.addEventListener(event, (evt) => {
        tipAmount = evt.target.value / 100;
        calculate()
    });
});

document.getElementById('people').addEventListener('input', (evt) => {
    calculate()
});

document.getElementById('bill').addEventListener('change', () => {
    calculate()
});

tipAmountRadios.forEach(radio => {
    radio.addEventListener('click',  (evt) => {
        tipAmount = parseFloat(evt.target.value)
        calculate()
    })
})

document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById("calculate-tip").reset()
})

function uncheckRadios() {
    tipAmountRadios.forEach( radio =>
        radio.checked = false
    );
}

function setErrorMessage(field) {
    if (document.getElementById(`${field.id}-msg-container`) !== null) {
        document.getElementById(`${field.id}-msg-container`).innerText = field.title;
    }

    if (field.id === "tip-amount-custom") {
        document.getElementById(`tip-msg-container`).innerText = "Tip can't be negative"
    }

}

function tipIsMissing() {
    return tipAmountCustom.value.length === 0 && document.querySelectorAll('input[type=radio][name=tip-amount]:checked').length === 0
}

function validate() {
    cleanErrorMessages()
    let fields = document.querySelectorAll(':invalid')

    console.log(fields)

    fields.forEach(field => setErrorMessage(field))

    if(tipIsMissing()) {
        document.getElementById(`tip-msg-container`).innerText = "Please select a tip or fill custom one"
    }
}

function isValidated() {
    return document.querySelectorAll(':invalid').length === 0 && !tipIsMissing()
}

function isNotANumber(value) {
    return 'NaN' === value || 'Infinity' === value || undefined === value || 'undefined' === value || 'null' === value || null === value
}


function calculate() {
    validate()

    if (!isValidated()) {
        return
    }

    let bill = document.getElementById('bill').value;
    let people = document.getElementById('people').value;

    let totalTip = parseFloat(bill) * parseFloat(tipAmount)
    let total =  parseFloat(bill) + parseFloat(totalTip)

    if (!isNotANumber(total.toString()) && !isNotANumber(totalTip.toString())) {
        let tipPlaceholderResult = (totalTip / people).toFixed(2)
        let totalPlaceholderResult = (total / people).toFixed(2)
        tipPlaceholder.innerText = tipPlaceholderResult;
        totalPlaceholder.innerText = totalPlaceholderResult;
    }else {
        document.getElementById('tip-amount-person-placeholder').innerText = "0.00"
        document.getElementById('total-amount-person-placeholder').innerText = "0.00"
    }
}
