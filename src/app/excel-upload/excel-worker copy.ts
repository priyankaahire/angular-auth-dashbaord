/// <reference lib="webworker" />

import * as ExcelJS from 'exceljs'
self.onmessage = async (event) => {
const { file, startRow, chunkSize } = event.data;
  const workbook:any = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);
  
  const worksheet = workbook.getWorksheet(1); // Assuming you're reading the first sheet
  const rows = [];

  // Read rows from the Excel file starting from the specified row number
  for (let i = startRow; i < startRow + chunkSize && i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i).values;
    rows.push(row);
  }

  // Send the chunked rows back to the main thread (component)
  postMessage({
    rows: rows,
    chunkSize: rows.length,
    totalRows: worksheet.rowCount,
  });
};
// addEventListener('message', async ({ data }) => {
//   const { file, chunkSize, headerRow } = data; // Receive file, chunkSize, and headerRow from main thread

//   if (file) {
//     const workbook:any = new ExcelJS.Workbook();

//     try {
//       await workbook.xlsx.load(file); // Load the Excel file

//       const worksheet = workbook.getWorksheet(1); // Get the first worksheet
//       const totalRows = worksheet.rowCount; // Get the total number of rows

//       // Get headers from the specified headerRow
//       const columns = worksheet.getRow(headerRow).values.slice(1); // Get column headers (ignore empty index 0)

//       // Send the column headers to the main thread
//       postMessage({ action: 'columns', columns });

//       // Process the rows in chunks (starting from the row after the header)
//       for (let i = headerRow + 1; i <= totalRows; i += chunkSize) {
//         const rows = [];
//         for (let j = i; j < i + chunkSize && j <= totalRows; j++) {
//           const row = worksheet.getRow(j).values.slice(1); // Get row values (ignore empty index 0)
//           rows.push(row); // Add to rows array
//         }
//         // Send each chunk of rows to the main thread
//         postMessage({ action: 'chunk', rows });
//       }

//       // Notify the main thread when processing is complete
//       postMessage({ action: 'complete' });

//     } catch (error:any) {
//       // Handle errors by sending them to the main thread
//       postMessage({ action: 'error', error: error?.message });
//     }
//   }
// });
