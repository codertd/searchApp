import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit  {
  csvUrl: string = 'assets/license.csv';  // URL to web API
  csvData: any[] = [];
  filteredItems: any[] = [];
  inputName : string = '';

  constructor (private http: Http) {}

  ngOnInit(){
    this.readCsvData();
  };

   FilterByName(){
      this.filteredItems = [];

      if(this.inputName != ""){
            this.csvData.forEach(element => {
                if(element[0].toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
                } else if(element[1].toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
                } else if(element[2].toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
                } else if(element[3].toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
                }
            });
      } else {
         //this.filteredItems = this.csvData;
      }
   }

  readCsvData () {
    this.http.get(this.csvUrl)
    .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
    );
  }

  private extractData(res: Response) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    this.csvData = lines;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
}
