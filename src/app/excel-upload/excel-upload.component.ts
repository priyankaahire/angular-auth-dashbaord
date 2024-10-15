import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-excel-upload',
  standalone: true,
  imports: [FormsModule, TableModule, CommonModule ],
  templateUrl: './excel-upload.component.html',
  styleUrl: './excel-upload.component.scss'
})
export class ExcelUploadComponent {
  data: any[] = [];
  cols: any[] = [];
  chunkSize = 1000; // Number of rows to process at a time
  worker: Worker | undefined;

  constructor() {
    // Initialize the web worker
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./excel.worker', import.meta.url));

      this.worker.onmessage = ({ data }) => {
        if (data.action === 'chunkProcessed') {
          this.data = [...this.data, ...data.rows]; // Append new chunk
        } else if (data.action === 'processingComplete') {
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
    const file = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      if (this.worker) {
        this.worker.postMessage({ file: arrayBuffer, chunkSize: this.chunkSize });
      }
    };

    reader.readAsArrayBuffer(file); // Read as ArrayBuffer for ExcelJS processing
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