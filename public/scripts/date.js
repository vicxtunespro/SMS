alert("date is in your city");
function formatDate(date) {
    // Check if the date is provided and is a valid date object
    if (!date || isNaN(date.getTime())) {
        return ''; // Return an empty string if date is invalid
    }

    // Get the components of the date (year, month, day)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Return the date in 'YYYY-MM-DD' format
    return `${year}-${month}-${day}`;
}

modules.export = formatDate