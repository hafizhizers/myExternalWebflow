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


// Define the event handling functions
function handlePrevButtonClick() {
  // Code to move to the previous page of the table goes here
   console.log('hai')
}

function handleNextButtonClick() {
  // Code to move to the next page of the table goes here
    console.log('hai2')
}

function handlingNextPrevButton(currentPage,totalPage, nextBtnId, prevBtnId, functionName) {
    // Get references to the buttons
    const nextButton = document.getElementById(nextBtnId);
    const prevButton = document.getElementById(prevBtnId);
    // Add event listeners to the buttons
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
}

/*
function handlingNextPrevButton(currentPage,totalPage, nextBtnId, prevBtnId, functionName) {
    // get references to the buttons
    var nextButton = document.getElementById(nextBtnId);
    var prevButton = document.getElementById(prevBtnId);

    // set the current page number
    var currentPage = currentPage;

    // define the event handling function
    function handlePagination(event) {
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
    
     // attach event listeners to the buttons
    nextButton.addEventListener('click', handlePagination);
    prevButton.addEventListener('click', handlePagination); 
}
/*

