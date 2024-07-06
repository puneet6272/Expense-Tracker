const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('income');
const moneyMinus = document.getElementById('expense')
const list = document.getElementById('list');
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// -------------Web local storage section code --------------
const localStorageTr = JSON.parse(localStorage.getItem('transections'))

let transections = localStorage.getItem('transections') !== null ? localStorageTr : []


const updateLocalStorage = () => {
    localStorage.setItem('transections', JSON.stringify(transections))
}

// ----------------------------------------------------------------


// --------------adding new transections section---------------------
const addtransection = (transection) => {
    const sign = transection.amount > 0 ? "+" : "-";
    const icon = transection.amount > 0 ? "up" : "down";
    const item = document.createElement('li');
    item.classList.add(transection.amount > 0 ? 'plus' : 'minus');
    item.innerHTML = `<h1> ${transection.text}</h1> <span> ${sign}$${Math.abs(transection.amount)}
    <i class="fa-solid fa-sort-${icon}"></i>
    <i class="fa-solid fa-trash" onclick="removeItem(${transection.id})"></i>
    </span>`
    list.appendChild(item);
}
// ----------------------------------------------------------------------




const updateValues = () => {
    const amaount = transections.map(transection => transection.amount)
    const total = amaount.reduce((sum, amount) => (sum += amount), 0).toFixed(2)

    const income = amaount
        .filter(transection => transection > 0)
        .reduce((sum, amount) => (sum += amount), 0)
        .toFixed(2)
    const expense = amaount
        .filter(transection => transection < 0)
        .reduce((sum, amount) => (sum += amount), 0)
        .toFixed(2)

    balance.innerHTML = `${total}`
    moneyPlus.innerHTML = `$${income} <i class="fa-solid fa-sort-up"></i>`
    moneyMinus.innerHTML = `$${Math.abs(expense).toFixed(2)} <i class="fa-solid fa-sort-down"></i>`

}



function randomId() {
    return Math.floor(Math.random() * 1000) + 1;
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please fill your data')
    } else {
        const transaction = { id: randomId(), text: text.value, amount: parseInt(amount.value) }

        transections.push(transaction)
        addtransection(transaction)
        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
})



const removeItem = (id) => {
    transections = transections.filter((tr) => tr.id !== id)
    updateLocalStorage()
    init()
}



function init() {
    list.innerHTML = '';
    transections.forEach(addtransection);
    updateValues()


}

init()