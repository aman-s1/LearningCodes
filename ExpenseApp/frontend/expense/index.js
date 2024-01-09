const errorBox = document.querySelector('#error-box');
const expensesList = document.querySelector('#expenses-list');
const totalExpenses = document.querySelector('.total-expenses');
const sumExpenses = document.querySelector('#sumexp');
const expensesPieChart = document.getElementById('expensesPieChart').getContext('2d');

async function addexpense(e) {
    try {
        e.preventDefault();

        const expenseDetails = {
            expenseamount: e.target.amount.value,
            description: e.target.description.value,
            category: e.target.category.value
        };
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/expense/addexpense', expenseDetails , { headers: {"Authorization" : token}});

        if (response.status === 201) {
            await updatePieChart();
            addNewExpenseToUI(response.data.expense);
        } else {
            throw new Error('Failed to add Expense');
        }
    } catch (err) {
        if(err.response && err.response.data && err.response.data.err === 'Expense Amount is Missing')
        {
            errorBox.innerHTML = '';
            errorBox.innerHTML += 'Expense Amount is Missing';
        }
        else if(err.response && err.response.data && err.response.data.err === 'Empty Parameters')
        {
            errorBox.innerHTML = '';
            errorBox.innerHTML += 'Empty Parameters';
        }
        else
        {
            showError(err);
        }
        console.log(err);
    }
};

window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization" : token}});
        
        if (response.status === 200) {
            const expenses = response.data.expenses;
            expenses.forEach(expense => {
                addNewExpenseToUI(expense);
            });
            await updatePieChart();
        } else {
            throw new Error('Failed to fetch expenses');
        }
    } catch (error) {
        console.error(error);
        showError(error);
    }
});

async function addNewExpenseToUI(expense) {
    const parentElement = document.getElementById('expenses-list');
    const expenseElemId = `expense-${expense.id}`;

    parentElement.innerHTML += 
        `<li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button style="padding: 5px 5px; background-color: #1565c0; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;" onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`;
    
    await updateTotalExpenseSum();
    await updatePieChart();
}

async function deleteExpense(e, expenseid) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, { headers: {"Authorization" : token}});
        
        if (response.status === 200) {
            removeExpenseFromUI(expenseid);
            await updateTotalExpenseSum();
            await updatePieChart();
        } else {
            throw new Error('Failed to delete expense');
        }
    } catch (err) {
        showError(err);
    }
}

function removeExpenseFromUI(expenseId) {
    const expenseElemId = `expense-${expenseId}`;
    const expenseElement = document.getElementById(expenseElemId);
    
    if (expenseElement) {
        expenseElement.remove();
    }
};

function showError(err) {
    console.error(err);

    if (errorBox.innerHTML !== '') {
        errorBox.innerHTML = '';
    }

    if (err.response && err.response.data && err.response.data.err) {
        errorBox.innerHTML += err.response.data.err;
    } else if (err.message) {
        errorBox.innerHTML += err.message;
    } else {
        errorBox.innerHTML += 'An error occurred.';
    }
};

async function getTotalExpenseSum() {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/expense/gettotalexpensesum', { headers: { "Authorization": token } });
        await updatePieChart();
        return response.data.sum || 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

async function updateTotalExpenseSum() {
    const sum = await getTotalExpenseSum();
    sumExpenses.textContent = `Total Expenses: ${sum}`;
};

async function updatePieChart() {
    const token = localStorage.getItem('token');

    try {
        // Fetch total expenses
        const totalExpensesResponse = await axios.get('http://localhost:3000/expense/gettotalexpensesum', { headers: { "Authorization": token } });
        const totalExpenses = totalExpensesResponse.data.sum || 0;

        console.log('Total Expenses:', totalExpenses);

        // Fetch expenses by categories
        const expensesByCategoryResponse = await axios.get('http://localhost:3000/expense/getexpensesbycategory', { headers: { "Authorization": token } });
        const expensesByCategory = expensesByCategoryResponse.data.expenses || [];

        console.log('Expenses by Category:', expensesByCategory);

        // Extract category names and amounts
        const categoryNames = expensesByCategory.map(expense => expense.category);
        const categoryAmounts = expensesByCategory.map(expense => expense.sum);

        // Update the pie chart
        new Chart(expensesPieChart, {
            type: 'pie',
            data: {
                labels: categoryNames,
                datasets: [{
                    data: categoryAmounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                }],
            },
            options: {
                title: {
                    display: true,
                    text: `Total Expenses: ${totalExpenses}`,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};