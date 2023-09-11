import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
    displayedColumns: string[] = ['name', 'dropdown'];
  
    dataSource = [
      { name: 'John', selectedOption: 'Option 1' },
      { name: 'Jane', selectedOption: 'Option 2' },
      // Add more data as needed
    ];
  
    dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  }
  
  /**  Copyright 2018 Google Inc. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */