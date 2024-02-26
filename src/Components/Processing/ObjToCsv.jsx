export function downloadObjectAsCsv(data, filename) {
    // Convert object to CSV data
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(',')); // Add header row
    
    // Loop through the rows
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"'); // Escape double quotes
        return `"${escaped}"`; // Wrap values in double quotes
      });
      csvRows.push(values.join(',')); // Add row
    }
  
    // Create CSV string
    const csvString = csvRows.join('\n');
  
    // Create a Blob with the CSV data
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename + '.csv';
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
  }
  
