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
    const paginationColumn = document.getElementById(listElementColumnId)
    const emptyDiv = [];

    pData.forEach(number => {
        const clonePColumn = pColumn.cloneNode(false)
        clonePColumn.innerHTML = number + 1;
        clonePColumn.addEventListener('click', function(event) {
            // Get the current page number from the pagination element
            const currentPage = parseInt(event.target.textContent);
            //getProductList(currentPage)
            // Use the variable to call the function
            window[functionNameEveryOnClick](currentPage);
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
