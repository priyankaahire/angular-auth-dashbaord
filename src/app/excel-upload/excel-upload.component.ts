import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import * as ExcelJS from 'exceljs'

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [FormsModule, TableModule, CommonModule ],
  templateUrl: './excel-upload.component.html',
  styleUrl: './excel-upload.component.scss'
})
export class ExcelUploadComponent {
  data: any[] = []; // This will hold the data from the Excel file
  cols: any[] = []; // This will hold the columns
  chunkSize = 1000; // Number of rows to process at a time
  headerRow = 6; // Specify the header row number (6)
  worker: Worker | undefined;

  constructor() {
    // Initialize the web worker
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./excel.worker', import.meta.url));

      this.worker.onmessage = ({ data }) => {
        if (data.action === 'columns') {
          // Define the column structure for PrimeNG table
          this.cols = data.columns.map((col: any) => ({ field: col, header: col }));
        } else if (data.action === 'chunk') {
          // Append the new chunk of rows to the existing data
          this.data = [...this.data, ...data.rows];
        } else if (data.action === 'complete') {
          console.log('File processing complete');
        } else if (data.action === 'error') {
          console.error('Error processing file:', data.error);
        }
      };
    } else {
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      this.readExcelFile(file); // Call the method to read the file
    }
  }

  async readExcelFile(file: File) {
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();
    
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      
      await workbook.xlsx.load(arrayBuffer);  // Load the Excel file

      const worksheet:any = workbook.getWorksheet(1);  // Get the first worksheet
      worksheet.eachRow((row:any, rowNumber:any) => {
        console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));  // Log row data
      });
    };

    reader.readAsArrayBuffer(file);  // Read the file as an ArrayBuffer
  }
  loadData(event: any) {
    // PrimeNG's lazy loading will request more rows as needed
    // 'event.first' is the starting row index
    // 'event.rows' is the number of rows to load
    const start = event.first;
    const end = event.first + event.rows;
    
    // Load rows from the pre-processed chunks (Web Worker)
    const chunk = this.data.slice(start, end);
    if (chunk.length) {
      this.data = [...this.data, ...chunk]; // Append loaded chunk
    }
  }
  
}