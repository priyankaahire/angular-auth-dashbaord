import * as ExcelJS from 'exceljs';

addEventListener('message', async ({ data }) => {
  const { file, chunkSize, headerRow, startRow=7 } = data;
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);

  const worksheet = workbook.worksheets[0]; // Assuming the first worksheet
  const totalRows = worksheet.rowCount;

  // Read headers from row 6
  const headers:any[]= [];
  worksheet.getRow(headerRow).eachCell((cell, colNumber) => {
    headers.push(cell.value);
  });

  const allRows = []; // Stores processed rows
  let currentChunk = []; // Chunk being processed

  // Define the effective end row (default to totalRows)
  const finalEndRow =  totalRows;

  // Process rows from startRow to endRow or totalRows in chunks
  for (let rowNumber = startRow; rowNumber <= finalEndRow; rowNumber++) {
    const row: any = {};
    worksheet.getRow(rowNumber).eachCell((cell, colNumber) => {
      row[headers[colNumber - 1]] = cell.value;
    });
    currentChunk.push(row);

    // If the chunk reaches the specified size, process and send the chunk
    if (currentChunk.length === chunkSize || rowNumber === finalEndRow) {
      // Optional sorting within the chunk
      // Send the chunk to the main thread
      postMessage({ headers, rows: currentChunk });

      // Reset the chunk array for the next set of rows
      currentChunk = [];
    }
  }

  // Send a completion message
  postMessage({ done: true });
});
