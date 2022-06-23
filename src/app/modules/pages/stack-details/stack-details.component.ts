import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.component.html',
  styleUrls: ['./stack-details.component.scss']
})
export class StackDetailsComponent implements OnInit {
  stackNameArray: any = [];

 
  constructor(private commonService:CommonService,private _formBuilder: FormBuilder, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) {}


  ngOnInit(): void {
    this.getStackName();
  }

  getStackName(){

  
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.stackNameArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
       
       
       }else{
       
       }
      
      });
  }


}
