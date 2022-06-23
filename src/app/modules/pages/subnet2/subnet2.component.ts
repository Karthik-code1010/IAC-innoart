import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';
import { ColumnDialog } from '../column-dialog/column-dialog';

export interface PeriodicElement {
  id: string;
  name:string;
  vpc:string;
  cidr: string;
  subnettype: string;
  createdon: string;
  createdby: string;
  state: string;
 


}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 'IaC0001', name: 'Stack 1', vpc: 'US-West', cidr: 'VPC Name',subnettype:'2',createdon:'11-19-2021 21:09:21',createdby:'Admistrator',state:'Created'},
 
];

@Component({
  selector: 'app-subnet2',
  templateUrl: './subnet2.component.html',
  styleUrls: ['./subnet2.component.scss']
})
export class Subnet2Component implements OnInit {
  subnetData: any = [];
  subnetrowData: any = [];
  searchSub:any
 
  
  constructor(private commonService:CommonService,private dialog: MatDialog,private router: Router,public dataService: DataService,private formBuilder: FormBuilder,) { }


  ngOnInit(): void {
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });

    this.getSubnetData();
  }
  getSubnetData(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.subnetData = response1["data"]
       
       
       }
      
      });

  }
  searchSubnet(){
    console.log(this.searchSub);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=name=="+this.searchSub).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.subnetData = response1["data"]
       
       
       }else{
        this.getSubnetData();
       }
      
      });

  }
  getRowRecord(element:any){
    //console.log(element)
    this.subnetrowData = element;
    console.log(this.subnetrowData);
    console.log(this.subnetrowData.id);
    console.log(this.subnetrowData.name.value);

  }

  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'name', activeFlag: true, displayName: "Name" }, 
    { name: 'vpc', activeFlag: true, displayName: "VPC" },
   
    { name: 'cidr', activeFlag: true, displayName: "CIDR" },
     { name: 'subnettype', activeFlag: true, displayName: "Subnet Type" }, 
     { name: 'createdon', activeFlag: true, displayName: "Created On" }, 
     { name: 'createdby', activeFlag: true, displayName: "Created By" },
     { name: 'state', activeFlag: true, displayName: "State" },
     { name: 'action', activeFlag: true, displayName: "Action" }
    
    ];
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
