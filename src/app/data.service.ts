import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://20.117.111.251:5010/flaskApi/v1/getDashboardItems?projectId=4'; // Replace with your API endpoint
  private listpropertiesapi = 'http://20.117.111.251:5010/flaskApi/v1/listProperties'; // Replace with your API URL

  constructor(private http: HttpClient) {}


  getlistproperty(): Observable<{ [key: number]: string }> {

    return this.http.get<any[]>(this.listpropertiesapi).pipe(
      map((data) => {
        // Create an object to store the key-value pairs
        const keyValueObject: { [key: number]: string } = {};
    
        // Iterate through the array and populate the object
        data.forEach((item) => {
          keyValueObject[item.PropertyId] = item.PropertyName;
        });
    
        return keyValueObject;
      })
    );
  }


  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  postSelections(selections) {

    console.log(selections)
   /*const url = `${this.apiUrl}/your_endpoint`; // Replace with your API endpoint URL

    // Define headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Make the POST request and return an Observable
    return this.http.post(url, selections, { headers });
    */
  }

  
  getDropdownProjectOptions(column: string): Observable<string[]> {
    // Construct the API endpoint for fetching dropdown options based on the provided column name
    const endpoint = `http://20.117.111.251:5010/flaskApi/v1/getProjects`;


      return this.http.get<any[]>(endpoint).pipe(
        map((data) => {
          // Extract unique ProjectName values from the API response
          const projectNameValues = data.map((item) => item[column]);

          // Filter out duplicate values and return the unique list
          return Array.from(new Set(projectNameValues));
        })
      );
    }

    getDropdownContractOptions(column: string): Observable<string[]> {
      // Construct the API endpoint for fetching dropdown options based on the provided column name
      const endpoint = `http://20.117.111.251:5010/flaskApi/v1/getContractInfo`;
  
  
        return this.http.get<any[]>(endpoint).pipe(
          map((data) => {
            // Extract unique ProjectName values from the API response
            const projectNameValues = data.map((item) => item[column]);
  
            // Filter out duplicate values and return the unique list
            return Array.from(new Set(projectNameValues));
          })
        );
      }
    // Make an HTTP GET request to fetch the options
  

  
}