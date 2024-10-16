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
  headerRow = 6; // Specify the header row number (6)
  worker: Worker | undefined;

  rows: any[] = [];         // The rows that will be displayed on the UI
  allRows: any[] = [];       // The data coming from the web worker (chunked)
  totalRows: number = 0;
  chunkSize: number = 10000; // Size of chunk you want to process in the Web Worker
  displayRows: number = 20;  // Number of rows to display on the UI
  page: number = 0;
  loading:boolean = false;

  constructor() {
    // Initialize the web worker
    if (typeof Worker !== 'undefined') {
      if (typeof Worker !== 'undefined') {
        this.worker = new Worker(new URL('./excel.worker', import.meta.url));
        this.worker.onmessage = ({ data }) => {
          if (data.headers && this.cols.length === 0) {
            this.cols = data.headers[0]; // Set headers only once
          }
            // Append received rows to the current dataset
        if (data.rows) {
          this.allRows = [...this.allRows, ...data.rows];

          // Load the first 20 rows initially
          this.rows = this.allRows.slice(0, this.displayRows);
          this.loading = false;
        }

        if (data.done) {
          this.loading = false; // Hide loader when complete
        }
        };
      }
      // this.worker = new Worker(new URL('./excel.worker', import.meta.url));

      // this.worker.onmessage = ({ data }) => {
      //   if (data.action === 'columns') {
      //     // Define the column structure for PrimeNG table
      //     this.cols = data.columns.map((col: any) => ({ field: col, header: col }));
      //   } else if (data.action === 'chunk') {
      //     // Append the new chunk of rows to the existing data
      //     this.data = [...this.data, ...data.rows];
      //   } else if (data.action === 'complete') {
      //     console.log('File processing complete');
      //   } else if (data.action === 'error') {
      //     console.error('Error processing file:', data.error);
      //   }
      // };
    } else {
      console.warn('Web Workers are not supported in this environment.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(event.target.result as ArrayBuffer);
      this.loading = true;
      this.worker?.postMessage({
        file: data,
        chunkSize: this.chunkSize,
        headerRow: this.headerRow,
        startRow: this.headerRow+1,
      });
      //this.worker?.postMessage({ file: data, startRow: 6, chunkSize: this.chunkSize });
    };
    reader.readAsArrayBuffer(file);
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
    this.loading = true;

    const startRow = this.displayRows * this.page;
    const endRow = startRow + this.displayRows;

    // Load more rows when scrolling reaches the bottom
    this.rows = [
      ...this.rows,
      ...this.allRows.slice(startRow, endRow) // Load the next set of rows
    ];
    this.page++;
    // Hide loader after lazy loading
    setTimeout(() => {
      this.loading = false;
    }, 500); // Delay to simulate loading time
  }
  
}