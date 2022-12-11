function getPageList(totalRecords, recordsPerPage) {
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Create an array of page numbers
    const pageNumbers = Array.from(Array(totalPages).keys());
    return pageNumbers;
}
