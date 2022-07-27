// backtext - combine string with javascricpt variable - string literal-template literal
var state = { //things or data which changes
    balance: 1000,
    income: 450,
    expense: 300,
   
    transactions:[]
    
}

var balanceEL = document.querySelector('#balance');
var incomeEL = document.querySelector('#income');
var expenseEL = document.querySelector('#expense');
var transactionsEL = document.querySelector('.transaction-list');
var incomeBtEL = document.querySelector('#income-button');
var expenseBtEL = document.querySelector('#expense-button');
var nameInputEL = document.querySelector('#name');
var amountInputEL = document.querySelector('#amount');

function init(){
    var localState = JSON.parse(localStorage.getItem('BudgetTrackerState'));
    if(localState !== null){
        state = localState;
    }
    updateBalance();
    listners();
}

function uniquieID(){
    return Math.round(Math.random()*10000000);
}

function listners(){
    incomeBtEL.addEventListener('click',addIncome);
    expenseBtEL.addEventListener('click',addExpense);
}

function addIncome(){
   addTransaction(nameInputEL.value,amountInputEL.value,'income');
}

function addExpense(){
    addTransaction(nameInputEL.value,amountInputEL.value,'expense')
}

function addTransaction(name,amount,type){

    if(name !== '' && amount !== ''){
        var transaction = {
            id : uniquieID(),
            name : name,
            amount : parseInt(amount),
            type : type
        };

        state.transactions.push(transaction);

        updateBalance();
    }else{
        alert('Please enter valid data');
    }
    
    nameInputEL.value = '';
    amountInputEL.value = '';
}

function deleteIt(event){
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for(var i = 0;i<state.transactions.length;i++){
        if(state.transactions[i].id ===(id)){
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex,1);
    updateBalance()
}

function updateBalance(){
    var balance = 0;
    var income = 0;
    var expense = 0;
    var item;

     for(var i = 0;i<state.transactions.length;i++){
        item = state.transactions[i];

        if(item.type == 'income'){
            income += item.amount;
        }else if(item.type == 'expense'){
            expense += item.amount;
        }
    }
    balance = income - expense;
        if(balance<0){
            alert("Something Wrong !!!");
        }
        //console.log(balance,income,expense);
        state.balance = balance;
        state.income = income;
        state.expense = expense;

        localStorage.setItem('BudgetTrackerState',JSON.stringify(state));

        render();
}

function render(){
    balanceEL.innerHTML = '₹'+ state.balance;
    incomeEL.innerHTML = '₹' + state.income;
    expenseEL.innerHTML = '₹' + state.expense;

    var transactionEL;
    var containerEL;
    var amountEL;
    var item;
    var buttonEL;

    transactionsEL.innerHTML = '';

    for(var i = 0;i<state.transactions.length;i++){
        
        item = state.transactions[i]
        transactionEL = document.createElement('li');
        transactionEL.append(item.name);

        transactionsEL.appendChild(transactionEL);

        containerEL = document.createElement('div');
        amountEL = document.createElement('span');

        if(item.type == 'income'){
            amountEL.classList.add('income-amount');
        }else if(item.type == 'expense'){
            amountEL.classList.add('expense-amount');
        }
        amountEL.innerHTML = '₹'+ item.amount
        containerEL.appendChild(amountEL);
        
        buttonEL = document.createElement('button');
        buttonEL.setAttribute('data-id',item.id);
        buttonEL.innerHTML = ' X';
        buttonEL.addEventListener('click',deleteIt);
        containerEL.appendChild(buttonEL);

        transactionEL.appendChild(containerEL);
        
    }
}

init();