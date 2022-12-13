window.onload = function() {
    const token = getSavedData("authToken");
    if (token == null) {
        alert('You are not logged in. Please log in and try again');
        location.href = "https://atfals-site.webflow.io"
    } else {
        getWalletCardList(1)
    }
}

function getWalletCardList() {

    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/ewallet_company", 'GET', token)
        .then(data => {
            populateToWalletCardList(data);
        })
        .catch(error => {
            // Handle any errors here
        });

}

function populateToWalletCardList(data) {

    const parentTable = document.getElementById('wallet-card-list-parent');
    const style = document.getElementById('wallet-card-list-child')
    const emptyDiv = [];

    data.forEach(data => {
        const card = style.cloneNode(true)
        const divs = card.getElementsByTagName('div')
        console.log('divs',divs);
     
        const cardName = divs[0]
        orderId.textContent = data.id;
        /*
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
        */
    })

    // Remove all old child nodes 
    while (parentTable.firstChild) {
        parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach(item => {
        parentTable.appendChild(item);
    });
}


