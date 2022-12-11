window.onload = function() {
    const token = getSavedData("authToken");
    if (token == null) {
        alert('You are not logged in. Please log in and try again');
        location.href = "https://atfals-site.webflow.io"
    } else {
        getProductList(1)
    }
}

function getProductList(page = 1) {

    const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/order?";
    const pagination = {
        "page": page
    };
    const fullUrl = url + "pagination=" + encodeURIComponent(JSON.stringify(pagination));
    const token = getSavedData("authToken");

    
    fetchAPI(fullUrl, 'GET', token)
        .then(data => {
            populateToBuyForMeTable(data.items);
            shipmentTablePaginationList(data)
        })
        .catch(error => {
            // Handle any errors here
        });

}


function populateToBuyForMeTable(data) {

    const parentTable = document.getElementById('table-buy-for-me-list');
    const style = document.getElementById('table-buy-for-me-row')
    const emptyDiv = [];

    data.forEach(data => {
        const card = style.cloneNode(true)
        const divs = card.getElementsByTagName('div')
        const orderId = divs[1]
        orderId.textContent = data.id;
        const destination = divs[2]
        destination.textContent = `${data.warehouse_data.short_code} - ${data.destination_data.short_code}`;
        const dateTime = divs[4]
        dateTime.textContent = data.created_at;
        const price = divs[6]
        price.textContent = data.price;
        const weight = divs[8]
        weight.textContent = data.weight;
        const status = divs[11]
        status.textContent = data.status_data.type;

        emptyDiv.push(card)
    })

    // Remove all old child nodes 
    while (parentTable.firstChild) {
        parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach(item => {
        parentTable.appendChild(item);
    });
}

function shipmentTablePaginationList(data) {
    
    displayPaginationList(data, 'table-buy-for-me-pagination', 'table-buy-for-me-pagination-column', getProductList) 
    
      
    /*
    const paginationData = getPageList(data.itemsTotal, data.itemsReceived);
    const paginationList = document.getElementById('table-buy-for-me-pagination');
    const paginationColumn = document.getElementById('table-buy-for-me-pagination-column')
    const emptyDiv = [];

    paginationData.forEach(number => {
        const clonePaginationColumn = paginationColumn.cloneNode(false)
        clonePaginationColumn.innerHTML = number + 1;
        clonePaginationColumn.addEventListener('click', function(event) {
            // Get the current page number from the pagination element
            const currentPage = parseInt(event.target.textContent);
            getProductList(currentPage)
        });
        //emptyDiv.appendChild(clonePaginationColumn);
        emptyDiv.push(clonePaginationColumn)
    });

    // Remove all old child nodes 
    while (paginationList.firstChild) {
        paginationList.removeChild(paginationList.firstChild);
    }

    emptyDiv.forEach(item => {
        paginationList.appendChild(item);
    });
    */
  
}

function clearSession(event) {
    event.preventDefault();
    window.localStorage.removeItem('authToken');
    // window.location.reload();
    location.href = "https://atfals-site.webflow.io";
}

const logout = document.getElementById('navlink-log-out');
logout.addEventListener('click', clearSession);

function populateToSelectWarehouse(data) {
    var dropdown = document.getElementById("Contact-Modal-6-Select-5-Warehouse");
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select warehouse';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].warehouse_name;
        option.value = data[i].id;
        dropdown.add(option);
    }
}

function populateToSelectExpressCompany(data) {
    var dropdown = document.getElementById("Contact-Modal-6-Select-3-express-company");
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select Express Company';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].company_name;
        option.value = data[i].id;
        dropdown.add(option);
    }
}

function getWarehouseList() {
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/warehouse", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + authWarehouse
            }
        })

        .then(res => res.json())
        .then(json => {
            const xanoResponse = json;
            populateToSelectWarehouse(xanoResponse);
        })
}

function getExpressCompanyList() {

    fetch("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/express_company", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + authWarehouse
            }
        })

        .then(res => res.json())
        .then(json => {
            const xanoResponse = json;
            populateToSelectExpressCompany(xanoResponse);
        })
}

function handleApiRequest() {
    event.preventDefault();
    getWarehouseList();
    getExpressCompanyList();
}

const createShipmentBtn = document.getElementById('button-create-shipment');
createShipmentBtn.addEventListener('click', handleApiRequest);

function postShipmentData() {
    const xano_input = {
        warehouse_id: document.getElementById('Contact-Modal-6-Select-5-Warehouse').value,
        product_name: document.getElementById('Contact-Modal-6-Product-Name').value,
        express_company_id: document.getElementById('Contact-Modal-6-Select-3-express-company').value,
        express_number: document.getElementById('Contact-Modal-6-Express-Number').value,
        quantity: document.getElementById('Contact-Modal-6-Product-Quantity').value,
        price: document.getElementById('Contact-Modal-6-Total-Product-Price').value,
        remarks: document.getElementById('Contact-Modal-6-Product-Remark').value
        // You can add other inputs here if you want
    };

    fetch("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(xano_input),
        })
        // handle response
        .then(res => res.json())
        .then(json => {
            const xanoResponse = json;
            // console.log(xanoResponse);
            if (xanoResponse.message) {
                alert(xanoResponse.message);
            }
        });
}

function shipmentFormSubmit(event) {
    event.preventDefault();
    postShipmentData()
}

const shipmentForm = document.getElementById('wf-form-Contact-Modal-6-Form');
shipmentForm.addEventListener('submit', shipmentFormSubmit, true);
