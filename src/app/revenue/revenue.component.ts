import { Component} from '@angular/core';
import { DataService } from '../data.service';
import { PdfService } from '../pdf.service';


@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent {
  revenues:any;

    constructor(private dataService:DataService){
    }

    ngOnInit(): void{
      this.getRevenueData();
      
    }

    getRevenueData(){
      this.dataService.getData().subscribe(result =>{
        console.log(result)
        console.log(this.revenues)
        this.revenues = result
      });
    }

    

    
}



// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
// import { PdfService } from '../pdf.service';

// @Component({
//   selector: 'app-revenue',
//   templateUrl: './revenue.component.html',
//   styleUrls: ['./revenue.component.css']
// })
// export class RevenueComponent implements OnInit {
//   revenues: any;

//   constructor(private dataService: DataService, private pdfService: PdfService) {}

//   ngOnInit(): void {
//     this.getRevenueData();
//   }

//   getRevenueData() {
//     this.dataService.getData().subscribe({
//       next: (res) => {
//         console.log('Fetched revenue data:', res);
//         this.revenues = res;
//       },
//       error: (err) => {
//         console.error('Error fetching revenue data:', err);
//       }
//     });
//   }

//   download() {
//     this.pdfService.downloadPdf().subscribe({
//       next: (blob) => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'Revenue.pdf';
//         a.click();
//         window.URL.revokeObjectURL(url); // Clean up URL object
//       },
//       error: (err) => {
//         console.error('Error downloading PDF:', err);
//       }
//     });
//   }
// }
