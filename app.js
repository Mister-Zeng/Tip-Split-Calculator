const totalBill = document.getElementById('numOfBillInput');
const tipBtns = document.querySelectorAll('.tipPercentage');
const tipCustom = document.getElementById('custom');
const people = document.getElementById('numOfPeopleInput');
const errorMsg = document.querySelector('.errorMsg')
const totalTipPerPerson = document.querySelector('#displayMoney1');
const totalPerPerson = document.querySelector('#displayMoney2');
const resetBtn = document.querySelector('.resetButton');

totalBill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

let billValue = 0;
let tipValue = 0.15;
let peopleValue = 1;

function setBillValue() {
    billValue = parseFloat(totalBill.value);
    calculateTip();
}


function handleClick(event) {
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');

        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active')
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });
    tipCustom.value = '';

    calculateTip();
}

function setTipCustomValue() {
    tipValue = tipCustom.value / 100;

    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });
    calculateTip();
}

function setPeopleValue() {
    peopleValue = parseFloat(people.value);

    if (peopleValue <= 0)
        errorMsg.classList.add('showErrorMsg');
    setTimeout(function () {
        errorMsg.classList.remove('showErrorMsg');
    }, 3000);

    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        totalTipPerPerson.innerHTML = `$${tipAmount.toFixed(2)}`;
        totalPerPerson.innerHTML = `$${total.toFixed(2)}`;
    };
};

function reset() {
    totalBill.value = '0';
    setBillValue();

    resetBtn.click()

    people.value = '1';
    setPeopleValue();
}
