// Text inputs values
const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creditTerm = document.getElementById('credit-term')

// Range inputs values
const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range')

// Total values
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income')

// All number inputs
const inputsNumber = document.querySelectorAll('.input-number');

// All range inputs
const inputsRange = document.querySelectorAll('.input-range');

// All buttons
const bankBtns = document.querySelectorAll('.bank');

// All inputs 
let inputs = []
const inputsN = Array.from(inputsNumber);
const inputsR = Array.from(inputsRange);
for (let i = 0; i < inputsN.length && i < inputsR.length; i++) {
    inputs.push([inputsN[i], inputsR[i]]);
};

// Set range value to number value
const assignRangeValue = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i][0].value = inputs[i][1].value;
    }
}

// Set range number to range value
const assignNumberValue = (inputNumber) => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i][1].value = inputs[i][0].value || inputs[i][1].min;
    }
}

assignRangeValue();

const banks = [{
        name: 'alfa',
        percents: 8.7,
    },
    {
        name: 'sberbank',
        percents: 8.4,
    },
    {
        name: 'pochta',
        percents: 7.9,
    },
    {
        name: 'tinkoff',
        percents: 9.2,
    },
]

let currentPercent = banks[0].percents;

for (const bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (const item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = (currentActive) => {
    const dataNameValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataNameValue)
    currentPercent = currentBank.percents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let range of inputsRange) {
    range.addEventListener('input', () => {
        assignRangeValue();
        calculation(totalCostRange.value, anInitialFeeRange.value, creditTermRange.value);
    })
}

function validateValue(inputNumber) {
    let value = parseInt(inputNumber.value);
    let min = parseInt(inputNumber.min);
    let max = parseInt(inputNumber.max);
    if (value < min || inputNumber.value == '') {
        inputNumber.value = inputNumber.min;
    } else if (value > max) {
        inputNumber.value = inputNumber.max;
    }
}

for (let input of inputsNumber) {
    input.addEventListener('input', () => {
        assignNumberValue();
        calculation(totalCostRange.value, anInitialFeeRange.value, creditTermRange.value);
    })
    input.addEventListener('change', () => {
        validateValue(input);
        assignNumberValue();
        calculation(totalCostRange.value, anInitialFeeRange.value, creditTermRange.value);
    })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    let monthlyPayment;
    let lounAmount = totalCost - anInitialFee;
    let interestRate = currentPercent;
    let yearsNum = creditTerm
    let monthsNum = 12 * yearsNum;

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * monthsNum) / monthsNum;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    if (monthlyPaymentArounded <= 0) {
        totalAmountOfCredit.innerHTML = `0₽`;
        totalMonthlyPayment.innerHTML = `0₽`
        totalRecommendedIncome.innerHTML = `0₽`
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${splitToTriads(lounAmount)}₽`;
        totalMonthlyPayment.innerHTML = `${splitToTriads(monthlyPaymentArounded)}₽`
        totalRecommendedIncome.innerHTML = `${splitToTriads(Math.round(monthlyPaymentArounded + (monthlyPaymentArounded / 100) * 35))}₽`
    }
}

function splitToTriads(price) {
    return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
}