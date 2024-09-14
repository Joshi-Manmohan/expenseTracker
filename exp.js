document.addEventListener('DOMContentLoaded', function() {
    // Initialize Materialize components
    const addItemButton = document.getElementById('add-item');
    const clearAllButton = document.getElementById('clear-all');
    const itemNameInput = document.getElementById('item-name');
    const itemAmountInput = document.getElementById('item-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    // Helper function to update total amount
    function updateTotalAmount() {
        const items = expenseList.querySelectorAll('.collection-item');
        let total = 0;
        items.forEach(item => {
            const amount = parseFloat(item.dataset.amount);
            if (!isNaN(amount)) {
                total += amount;
            }
        });
        totalAmountDisplay.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
    }

    // Add item function
    function addItem() {
        const itemName = itemNameInput.value.trim();
        const itemAmount = parseFloat(itemAmountInput.value.trim());
        
        if (!itemName || isNaN(itemAmount) || itemAmount <= 0) {
            M.toast({html: 'Added to Card.'});
            return;
        }

        // Create new list item
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        listItem.dataset.amount = itemAmount;
        listItem.innerHTML = `
            ${itemName} - $${itemAmount.toFixed(2)}
            <a href="#!" class="secondary-content">
                <i class="material-icons delete-item">delete</i>
            </a>
        `;

        // Append new item to the list
        expenseList.appendChild(listItem);

        // Update total amount
        updateTotalAmount();

        // Clear input fields
        itemNameInput.value = '';
        itemAmountInput.value = '';
    }

    // Clear all items function
    function clearAllItems() {
        expenseList.innerHTML = '<li class="collection-header"><h5>Expenses</h5></li>';
        updateTotalAmount();
    }

    // Event listener for adding items
    addItemButton.addEventListener('click', addItem);

    // Event listener for clearing all items
    clearAllButton.addEventListener('click', clearAllItems);

    // Event delegation for deleting items
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-item')) {
            const listItem = event.target.closest('.collection-item');
            listItem.remove();
            updateTotalAmount();
        }
    });

    // Initialize Materialize toast for notifications
    M.Toast.dismissAll();
});
