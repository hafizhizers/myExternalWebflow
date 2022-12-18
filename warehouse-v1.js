
window.onload = function() {
    getWarehouseCardList()
}

function getWarehouseCardList() {
  
    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/warehouse", 'GET', token)
        .then(data => {
            populateToWarehouseCardList(data);
        })
        .catch(error => {
          
        });
  
}

        
function populateToWarehouseCardList(data) {
  
    const parentTable = document.getElementById('warehouse-card-list-parent');
    const style = document.getElementById('warehouse-card-list-child')
  
  	const emptyDiv = [];

    data.forEach(data => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName('div');

      
      card.addEventListener('click', function() {

        card.classList.add("w--current");
        
        const cityCountry = document.getElementById('warehouse-text-city-country')
        cityCountry.textContent = `${data.city}, ${data.country_name}`
        const countryFlag = document.getElementById('warehouse-detail-country-flag')
        countryFlag.src = data.country_flag.url;
        const provincial = document.getElementById('warehouse-detail-provincial')
        provincial.textContent = data.provincial;
        const city = document.getElementById('warehouse-detail-city')
        city.textContent = data.city;
        const countryDisctrict = document.getElementById('warehouse-detail-country-disctrict')
        countryDisctrict.textContent = data.country_disctrict;
        const street = document.getElementById('warehouse-detail-street')
        street.textContent = data.street;
        const detailedAddress = document.getElementById('warehouse-detail-detailed-address')
        detailedAddress.textContent = data.detailed_address;
        const postalCode = document.getElementById('warehouse-detail-postal-code')
        postalCode.textContent = data.postal_code;
        const consigneeName = document.getElementById('warehouse-detail-consignee-name')
        consigneeName.textContent = data.consignee_name;
        const cellphoneNumber = document.getElementById('warehouse-detail-cellphone-number')
        cellphoneNumber.textContent = data.cellphone_number;
        const remarks = document.getElementById('warehouse-detail-remarks')
        remarks.textContent = data.remarks;
   
        emptyDiv.forEach(otherCard => {
          if (otherCard !== card) {
          	otherCard.classList.remove("w--current");
          }
        });
      });

			const divs0parent = divs[1]
      const city = divs0parent.getElementsByTagName('h5')[0]
      city.textContent = data.city;
	    
      const flag = divs0parent.getElementsByTagName('img')[0]; // Assuming there is only one <img> element
      flag.src = data.country_flag.url;
      
      const postalCode = divs[8];
      postalCode.textContent = data.postal_code;
      const countryDisctrict = divs[12];
      countryDisctrict.textContent = data.country_disctrict;
      const lockerNumber = divs[16];
      lockerNumber.textContent = data.locker_number;
      
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


const warehouseBtnCopyElements = [
{ btnId: 'warehouse-btn-copy-provincial', detailId: 'warehouse-detail-provincial' },
{ btnId: 'warehouse-btn-copy-city', detailId: 'warehouse-detail-city' },
{ btnId: 'warehouse-btn-copy-country-disctrict', detailId: 'warehouse-detail-country-disctrict' },
{ btnId: 'warehouse-btn-copy-street', detailId: 'warehouse-detail-street' },
{ btnId: 'warehouse-btn-copy-detailed-address', detailId: 'warehouse-detail-detailed-address' },
{ btnId: 'warehouse-btn-copy-postal-code', detailId: 'warehouse-detail-postal-code' },
{ btnId: 'warehouse-btn-copy-consignee-name', detailId: 'warehouse-detail-consignee-name' },
{ btnId: 'warehouse-btn-copy-cellphone-number', detailId: 'warehouse-detail-cellphone-number' },
];

for (const element of warehouseBtnCopyElements) {
  document.getElementById(element.btnId).addEventListener('click', () => {
    copyTextToClipboard(element.btnId, element.detailId);
  });
}

function copyTextToClipboard(buttonId, elementId) {
  const button = document.getElementById(buttonId);
  const element = document.getElementById(elementId);
  const text = element.textContent;
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  // Copy the text from the textarea
  document.execCommand('copy');
  // Remove the textarea element
  document.body.removeChild(textarea);
  alert('Text copied to clipboard');
}


