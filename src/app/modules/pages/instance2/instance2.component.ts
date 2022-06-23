import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';
import { ColumnDialog } from '../column-dialog/column-dialog';

export interface PeriodicElement {
  instanceid: string;
  instancename:string;
  instancetype:string;
  availability_zone: string;
  instance_state: string;
  createdon: string;
  createdby: string;
 
 


}

const ELEMENT_DATA: PeriodicElement[] = [
  {instanceid: 'I4aer423', instancename: 'Dev_Web Server', instancetype: 't2-micro', availability_zone: 'us-east-1b',instance_state:'Running',createdon:'11-19-2021 21:09:21',createdby:'Admistrator'},
 
];

@Component({
  selector: 'app-instance2',
  templateUrl: './instance2.component.html',
  styleUrls: ['./instance2.component.scss']
})
export class Instance2Component implements OnInit {

 
  displayedColumns: string[] = [];
  allColumns = [
    { name: 'instanceid', activeFlag: true, displayName: "Instance ID" },
    { name: 'instancename', activeFlag: true, displayName: "Instance Name" }, 
    { name: 'instancetype', activeFlag: true, displayName: "Instance Type" },
   
    { name: 'availability_zone', activeFlag: true, displayName: "Availability Zones" },
     { name: 'instance_state', activeFlag: true, displayName: "Instance Name" }, 
     { name: 'createdon', activeFlag: true, displayName: "Created On" }, 
     { name: 'createdby', activeFlag: true, displayName: "Created By" },
  
     { name: 'action', activeFlag: true, displayName: "Action" }
    
    ];
  instanceData: any = [];
  instancerowData: any =[];
  searchIns:any;

  constructor(private commonService:CommonService,private dialog: MatDialog,private router: Router,public dataService: DataService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });

    this.getInstanceData();

  }


  getInstanceData(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.instanceData = response1["data"]
       
       
       }
      
      });
  }
  getRowRecord(element:any){
    //console.log(element)
    this.instancerowData = element;
    console.log(this.instancerowData);
    console.log(this.instancerowData.id);
    console.log(this.instancerowData.name.value);

  }
  searchInstance(){
    console.log(this.searchIns);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=name=="+this.searchIns).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.instanceData = response1["data"]
       
       
       }else{
         this.getInstanceData();
       }
      
      });

  }

 
    dataSource = ELEMENT_DATA;
   
    settingClick1() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { allColumns: this.allColumns };
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = { top: "150px", right: '10px' }
  
      const dialogRef = this.dialog.open(ColumnDialog, dialogConfig);
      dialogRef.afterClosed().subscribe((result:any) => {
        if (typeof result == "object") {
          this.setColumn1(result);
        }
      });
    }
    setColumn1(selColumn:any) {
      this.allColumns = [];
      this.displayedColumns = [];
      selColumn.forEach((element:any) => {
        this.allColumns.push(element);
        if (element.activeFlag) {
          this.displayedColumns.push(element.name);
        }
      });
      console.log(this.displayedColumns)
    }
  
  

}
