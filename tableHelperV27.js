function getPageList(totalRecords, recordsPerPage) {
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Create an array of page numbers
    const pageNumbers = Array.from(Array(totalPages).keys());
    return pageNumbers;
}


function displayPaginationList(data, listElementId, listElementColumnId, functionNameEveryOnClick) {
    const pData = getPageList(data.itemsTotal, data.itemsReceived);
    const pList = document.getElementById(listElementId);
    const pColumn = document.getElementById(listElementColumnId)
    const emptyDiv = [];


    pData.forEach(number => {
        const clonePColumn = pColumn.cloneNode(false)
        clonePColumn.innerHTML = number + 1;

        clonePColumn.addEventListener('click', function(event) {
            // Get the current page number from the pagination element
            const currentPage = parseInt(event.target.textContent);
            //getProductList(currentPage)
            // Use the variable to call the function
            functionNameEveryOnClick(currentPage);
            //window[functionNameEveryOnClick](currentPage);
        });
        //emptyDiv.appendChild(clonePaginationColumn);
        emptyDiv.push(clonePColumn)
    });

    // Remove all old child nodes 
    while (pList.firstChild) {
        pList.removeChild(pList.firstChild);
    }

    emptyDiv.forEach(item => {
        pList.appendChild(item);
    });
}


// define the event handling function
function handlePagination(tableName, functionName,event) {

    const data = getSavedData(tableName);
    const currentPage = data.currentPage;
    const totalPage = data.totalPage;
    
        // determine which button was clicked
        if (event.target === nextButton) {
            // increase the current page number
            currentPage += 1;
        } else if (event.target === prevButton) {
            // decrease the current page number
            currentPage -= 1;
        }

        // update the page content
        // updatePageContent(currentPage);
        console.log('currentPage',currentPage);
        functionName(currentPage)

        // disable the "previous" button on the first page
        if (currentPage === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        // disable the "next" button on the last page
        if (currentPage === totalPage) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
        
}

// get references to the buttons
const nextButton = document.getElementById('table10-buy-for-me-btn-next');
const prevButton = document.getElementById('table10-buy-for-me-btn-prev');

// prevButton.addEventListener('click', function() {
//   handlePagination('buy-for-me-table');
// }, true);
nextButton.addEventListener('click', (e) => handlePagination('buy-for-me-table',getProductList, e), true);
prevButton.addEventListener('click', (e) => handlePagination('buy-for-me-table',getProductList, e), true);


function savePaginationData(currentPage, totalPage, tableName, functionName) {

    // Set the data to save
    const data = {
        tableName: tableName,
        currentPage: currentPage,
        totalPage: totalPage,
        functionName: functionName
    };
    // Use the saveData() function to save the data
    saveData(tableName, data);

}
