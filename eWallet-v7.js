window.onload = function() {
    getWalletCardList(1)
}

function getWalletCardList() {
  
    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/ewallet_company", 'GET', token)
        .then(data => {
            console.log('data',data)
            populateToWalletCardList(data);
        })
        .catch(error => {
          console.log('error',error)
          errorHandler(error)
        });
  
}

function populateToWalletCardList(data) {
  
    const parentTable = document.getElementById('wallet-card-list-parent');
    const style = document.getElementById('wallet-card-list-child')
  
  	const emptyDiv = [];

    data.forEach(data => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName('div');

      card.addEventListener('click', function() {
        // Set the background color of the clicked card to blue
        card.style.backgroundColor = "#f7c600";

        // Set the background color of all other cards to the default value
        emptyDiv.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.style.backgroundColor = ""; // or some other default value
          }
        });
      });

      const walletName = divs[0];
      walletName.textContent = data.name;
      const walletFee = divs[2];
      walletFee.textContent = `${data.fee}%`;
      const walletImage = card.getElementsByTagName('img')[0]; // Assuming there is only one <img> element
      walletImage.src = data.logo.url;
      emptyDiv.push(card);
    });


    // Remove all old child nodes 
    while (parentTable.firstChild) {
        parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach(item => {
        parentTable.appendChild(item);
    });
}
