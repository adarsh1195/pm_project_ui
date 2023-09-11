
import { Component ,Input, ViewChild, ElementRef,OnInit, ViewChildren, QueryList} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './employee';
import { EmpFilter, filterOption } from './empfilter';
import { MatSelectChange } from '@angular/material/select';
import {  HostListener } from '@angular/core';
import { DataService } from './data.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  @Input() showDiv: boolean = false;
  @ViewChild('mySelect') mySelect!: ElementRef;
  @ViewChild('myLabel') myLabel!: ElementRef;

  
  
   
   // const selectTrigger: HTMLElement = this.mySelect.nativeElement.querySelector('.mat-mdc-select-trigger');// Modify the style of the select trigger
   // selectTrigger.style.top = '0px';
    
    
  
   flag: boolean = false;
  displayedColumns: string[] = []; // Initialize as an empty array
  columnVisibility: { [key: string]: boolean } = {};
  listproperty: { [key: number]: string } = {}; // Initialize an empty object
  selectedProperty: number | null = null;
  columnsToRemove: string[] = ['CompanyID', 'Created_By','Created_Date', 'FloorName','ID', 'IsActive', 'Modified_By','Modified_Date', 'OperatingProjectID','Original_Commited_Date']; // Replace with the columns you want to remove
  dateFormControl = new FormControl('', Validators.pattern(/^\d{4}-\d{2}-\d{2}$/));

   // Define the name of the column where you want to add the dropdown
  // Declare arrays for dropdown and not dropdown columns
  dropdownColumns: string[] = [ 'OperatingProjectName','Contract_Ref_No','CompanyName','IsModifiedUnit','BuildingClearanceCertificate'];
  notDropdownColumns: string[] = ['PropertyID', 'PropertyName','BuildingIDOrClusterID','BuildingOrCluster_Name','FloorID','UnitID','UnitName','UnitType','Status'];
  isdateColumns:string[]=['Original_Commited_Date','Rivised_Commited_Date']
  selections: { column: string; selectedValue: string }[] = [];


  selectedDates: { [key: string]: Date | null } = {};
  selectedColumn: string | null = null;


  // Function to select a column header
  selectColumn(column: string): void {
    this.selectedColumn = column;
  }
  // Use ViewChildren to query for MatDatepicker components
  @ViewChildren(MatDatepicker) datepickers!: QueryList<MatDatepicker<any>>;


  ngAfterViewInit() {
    this.datepickers.forEach(datepicker => {
      const column = datepicker['_elementRef'].nativeElement.getAttribute('data-column');
      if (column) {
        this.selectedDates[column] = null;
      }
    });
  }

  onDateSelection(event: MatDatepickerInputEvent<Date>, columnName: string) {
    this.selectedDates[columnName] = event.value;
    console.log(`Selected date for ${columnName}:`, this.selectedDates[columnName]);
  }

  // Replace this with your actual logic to determine date columns
  isDateColumn(column: string): boolean {
    // Example: Check if column name contains 'date'
    return column.toLowerCase().includes('date');
  }
  // Function to check if a column is a dropdown column
  isDropdownColumn(column: string): boolean {
    return this.dropdownColumns.includes(column);
  }
   // Define your dropdown options

   dropdownOptions: { [key: string]: string[] } = {
    OperatingProjectName: [],
    Contract_Ref_No:[],
    CompanyName:[],
    IsModifiedUnit:['yes','no'],
    BuildingClearanceCertificate:['yes','no']
  };
  //columns:string[]=[];
  onDropdownSelectionChange(event: any, column: string): void {
    console.log("Dropdown selection changed");

   const element = document.getElementById("myDIV");
    if (element) {
      const selectTriggerElements = element.getElementsByClassName("mat-mdc-select-trigger");
      const selectTriggerArray = Array.from(selectTriggerElements);
      for (const selectTrigger of selectTriggerArray) {
        const htmlElement = selectTrigger as HTMLElement; // Cast to HTMLElement
        htmlElement.style.top = "0px"; // Set the top style for each element
      }

    }
    const selectedValue = event.value;
    console.log(`Selected value for column ${column}: ${selectedValue}`);

    this.selections.push({ column, selectedValue });

   
  }




  EmpData : Employee[] =[{"id":1,"firstname":"Mellie","lastname":"Gabbott","email":"mgabbott0@indiatimes.com","gender":"Female","department":"","jobtitle":""},
  {"id":2,"firstname":"Yehudi","lastname":"Ainsby","email":"yainsby1@w3.org","gender":"Female","department":"","jobtitle":""},
  {"id":3,"firstname":"Noellyn","lastname":"Primett","email":"nprimett2@ning.com","gender":"Male","department":"","jobtitle":""},
  {"id":4,"firstname":"Stefanie","lastname":"Yurenin","email":"syurenin3@boston.com","gender":"Male","department":"","jobtitle":""},
  {"id":5,"firstname":"Stormi","lastname":"O'Lunny","email":"solunny4@patch.com","gender":"Female","department":"","jobtitle":""},
  {"id":6,"firstname":"Keelia","lastname":"Giraudy","email":"kgiraudy5@nba.com","gender":"Male","department":"","jobtitle":""},
  {"id":7,"firstname":"Ikey","lastname":"Laight","email":"ilaight6@wiley.com","gender":"Female","department":"","jobtitle":""},
  {"id":8,"firstname":"Adrianna","lastname":"Ruddom","email":"aruddom7@seattletimes.com","gender":"Female","department":"","jobtitle":""},
  {"id":9,"firstname":"Dionysus","lastname":"McCory","email":"dmccory8@ox.ac.uk","gender":"Male","department":"","jobtitle":""},
  {"id":10,"firstname":"Claybourne","lastname":"Shellard","email":"cshellard9@rediff.com","gender":"Male","department":"","jobtitle":""}];

  
  genders: string[]=['All','Male','Female'];
  jobtitles: string[]=['All','Support Analyst','Project Manager','Senior officer','Software Engineer'];
  departments: string[]=['All','Support','Human Resources','Marketing','Engineering'];

  newValue: string = '';
  selectedRowIndex: number = 0;
  selectedstartRowIndex: number = 0;
  selectedendRowIndex: number = 0;
  columnName: string = '';
  rowval: string = '';
  copiedData: string ='';
  selectedCellValue: string | null = null;
  clipboardData: string | null = null;
  filterColumn: string = ''; 
  uniqueValues: string[] = [];


  empFilters: EmpFilter[]=[];
  
  
  defaultValue = "All";

  filterDictionary= new Map<string,string>();

  
  
  dataSource!: MatTableDataSource<any>;

  expandedElement: Employee[]=[];
  deviceService: any;
  selectedProject: string = ''; // Property to store the selected project

  


  columnNames = ['OperatingProjectName','Contract_Ref_No','CompanyName','Original_Commited_Date','Rivised_Commited_Date','IsModifiedUnit','BuildingClearanceCertificate']; // Add the remaining columns
  

  constructor(private dataService: DataService){

    this.dataSource = new MatTableDataSource<any>([]);
    this.columnNames.forEach((column) => {
      this.columnVisibility[column] = true; 
    });
    
  }

  showAllColumns() {
    this.columnNames.forEach((columnName) => {
      this.columnVisibility[columnName] = false;
    });
    
    if (this.selections.length !== 0) {
      this.dataService.postSelections(this.selections);
    }
  }
  showDivFunction(): void {
    if (this.selectedProperty !== null) {
      console.log('Selected PropertyId:', this.selectedProperty);
      // You can perform further actions with this value
    }
    this.showDiv = true;

  }
 
  loadProjects(): void {
    this.dataService.getlistproperty().subscribe((data) => {
      console.log(data)
      this.listproperty= data;
      console.log(this.listproperty)

    });
  }
  ngOnInit(): void {

    this.dataService.getData().subscribe(data => {
    this.loadProjects();

    this.dropdownColumns.forEach(originalColumn => {
      // Map the column name if needed
  
      if(originalColumn == 'OperatingProjectName'){
        let column = 'ProjectName';
      this.dataService.getDropdownProjectOptions(column).subscribe(
        (options) => {
          // Assuming the API returns an array of options for the column
          this.dropdownOptions[originalColumn] = options;          
        },
        (error) => {
          console.error(`Error fetching options for ${column}:`, error);
        }
      );
      }

      if(originalColumn == 'Contract_Ref_No'){
        let column = 'Contract_Ref_No';
      this.dataService.getDropdownContractOptions(column).subscribe(
        (options) => {
          this.dropdownOptions[originalColumn] = options;          
        },
        (error) => {
          console.error(`Error fetching options for ${column}:`, error);
        }
      );
      }

      if(originalColumn == 'CompanyName'){
        let column = 'CompanyName';
      this.dataService.getDropdownContractOptions(column).subscribe(
        (options) => {
          this.dropdownOptions[originalColumn] = options;          
        },
        (error) => {
          console.error(`Error fetching options for ${column}:`, error);
        }
      );
      }



    });

      console.log(data)

      // Assuming data is an array of objects with dynamic keys
      if (data.length > 0) {
        this.displayedColumns = Object.keys(data[0]);

        // Extract the keys from the first object in the data array
        this.displayedColumns = this.displayedColumns.filter(column => !this.columnsToRemove.includes(column));
        
        const newColumnOrder = ['PropertyID', 'PropertyName','BuildingIDOrClusterID','BuildingOrCluster_Name','FloorID','UnitID','UnitName','UnitType','Status','OperatingProjectName','Contract_Ref_No','CompanyName','Original_Commited_Date','Rivised_Commited_Date','IsModifiedUnit','BuildingClearanceCertificate']; // Add the remaining columns

        
        // Rearrange the columns based on the new order
        this.displayedColumns = newColumnOrder;
  
        // Iterate through the dropdown columns and fetch options for each
        


        this.dataSource.data = data;
      }
    });

    
  }

    
/*  toggleColumn() {
    this.columnNames.forEach((columnName) => {
      console.log("inside hide",this.columnNames)
      this.columnVisibility[columnName] = true; // Initially visible
    });
  }
*/

onDateInput(event: Event): void {
  
}
  @HostListener('document:keydown.control.c', ['$event'])
  onCopy(event: ClipboardEvent): void {
    event.preventDefault();
    this.copyToClipboard(this.selectedCellValue!);
this.flag = true;
console.log(this.selectedstartRowIndex)

    console.log("cntrl C")
  }

  @HostListener('document:keydown.control.v', ['$event'])
  onPaste(event: ClipboardEvent): void {
    console.log("Ctrl+V pressed");
    console.log(this.selectedstartRowIndex)

    event.preventDefault();
    this.getClipboardData();
  }

      
  private copyToClipboard(data: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = data;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  getClipboardData(): void {
    navigator.clipboard.readText().then((data) => {
      this.clipboardData = data;
      console.log('Clipboard Data:', this.clipboardData);
      this.setAllValueToFilteredRow(this.clipboardData );

    }).catch((error) => {
      console.error('Failed to read clipboard data:', error);
    });
  }

 
 


  onCellClick(event: MouseEvent, row: any, column: string,rowIndex): void {
    var table = $("#table");    

    var isMouseDown = false;

    var startRowIndex = -1;
    var startCellIndex = -1;

    var rowStart, rowEnd, cellStart, cellEnd;


   this.selectedstartRowIndex = rowIndex;
   console.log(this.selectedstartRowIndex)
   console.log(`Clicked row index: ${rowIndex}`);
   console.log(`Clicked column name: ${column}`);
   this.columnName = column;
   console.log('Row data:', row);

    const target = event.target as HTMLElement;
   const columnName = target.textContent?.trim();
     console.log(`Row value: ${columnName}`);
     this.selectedCellValue = columnName!
     console.log('Row data:', row);

   const selectTo = (cell) => {

    console.log("inside");
    var row = cell.parent();    
    var cellIndex = cell.index();
    var rowIndex = row.index()+1;
    
    
    if (rowIndex < startRowIndex) {
        rowStart = rowIndex;
        rowEnd = startRowIndex;
    } else {
        rowStart = startRowIndex;
        rowEnd = rowIndex;
    }
    
    if (cellIndex < startCellIndex) {
        cellStart = cellIndex;
        cellEnd = startCellIndex;
    } else {
        cellStart = startCellIndex;
        cellEnd = cellIndex;
    }        
    
    for (var i = rowStart; i <= rowEnd; i++) {
        var rowCells = table.find("tr").eq(i).find("td");
        for (var j = cellStart; j <= cellEnd; j++) {
            rowCells.eq(j).addClass("selected");
            
        }        
    }
  
    

    console.log(rowStart)
    console.log(rowEnd)

   this.selectedstartRowIndex = rowStart;
    this.selectedendRowIndex =rowEnd;
    console.log(this.selectedstartRowIndex)

  
  }


 

  table.find("td").mousedown(function (e) {
    isMouseDown = true;
    var cell = $(this);

    table.find(".selected").removeClass("selected"); // deselect everything
    
    if (e.shiftKey) {
        selectTo(cell);                
    } else {
        cell.addClass("selected");
        startCellIndex = cell.index();
        startRowIndex = cell.parent().index();
    }
    
    return false; // prevent text selection
})
.mouseover(function () {
  console.log("mouse over")
    if (!isMouseDown) return;
    table.find(".selected").removeClass("selected");
    selectTo($(this));
})
.bind("selectstart", function () {
    return false;
});

$(document).mouseup(function () {
    isMouseDown = false;
});

   
 }


  
 


  
 
  


  applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {

    this.filterDictionary.set(empfilter.name,ob.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    
    this.dataSource.filter = jsonString;
    //console.log(this.filterValues);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
    
  }

  setValueToFilteredRow(index: number, newValue: string) {
    if (index >= 0 && index < this.dataSource.filteredData.length) {
      this.dataSource.filteredData[index].firstname = newValue;
      // If you want to update the MatTable data source, you can do so like this:
      this.dataSource._updateChangeSubscription();
      index=0;

    }
  }
    /*
    for (let i =2 ;i<= this.dataSource.filteredData.length;i++){
    if (index >= 0 && index < this.dataSource.filteredData.length) {
      this.dataSource.filteredData[i].firstname = newValue;
      // If you want to update the MatTable data source, you can do so like this:
      this.dataSource._updateChangeSubscription();
    }
  }
    
*/
  

  setAllValueToFilteredRow( newValue: string) {
    console.log("inside")
    console.log(this.selectedstartRowIndex)
    console.log(this.selectedendRowIndex)
    console.log(this.columnName)
    this.dataSource.filteredData[this.selectedstartRowIndex][this.columnName] = newValue;

    for (let i =this.selectedstartRowIndex ;i< this.selectedendRowIndex;i++){
      let val = this.columnName;
      if (this.selectedstartRowIndex >= 0 && this.selectedstartRowIndex < this.dataSource.filteredData.length) {
        this.dataSource.filteredData[i][val] = newValue;
        // If you want to update the MatTable data source, you can do so like this:
        this.dataSource._updateChangeSubscription();
      }
  }

  
  }


  filtertable(filtercol: string){
    this.empFilters =[];
    var x = document.getElementById("showFilter");

    x!.style.display = "none";
    x!.style.display = "block";


    this.filterColumn = filtercol;
    
    console.log(this.filterColumn)

    this.uniqueValues = ['All'];

    // Iterate through the data source and collect unique values for the specified column
    for (const row of this.dataSource.data) {
      if (!this.uniqueValues.includes(row[filtercol])) {
        this.uniqueValues.push(row[filtercol]);
      }
    }

    // Now, this.uniqueValues contains the unique values for the specified column
    console.log(`Unique values for ${filtercol}:`, this.uniqueValues);
    this.empFilters.push({name:filtercol,options:this.uniqueValues,defaultValue:this.defaultValue});
    
    console.log(`Unique values for ${filtercol}:`, this.uniqueValues, this.defaultValue);

    this.dataSource.filterPredicate = function (record,filter) {
      debugger;
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof Employee] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    }
   
  }
}