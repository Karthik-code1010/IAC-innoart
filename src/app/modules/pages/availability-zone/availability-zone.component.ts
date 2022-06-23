import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-availability-zone',
  templateUrl: './availability-zone.component.html',
  styleUrls: ['./availability-zone.component.scss']
})
export class AvailabilityZoneComponent implements OnInit {
  stck_id:any = '';
  availabilityCount: any = [];

 
  constructor(private commonService:CommonService,private _formBuilder: FormBuilder, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) {}


  ngOnInit(): void {
    console.log(history.state);
    console.log(localStorage.getItem('stackDetailsId'));
    this.stck_id = localStorage.getItem('stackDetailsId');
    this.getAvailabilitZoneCount();
  }
  getAvailabilitZoneCount(){
    if(this.stck_id != ''){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&id="+this.stck_id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          for(var i=0;i<response1["data"][0]["noOfAvailabilityZone"]["value"];i++){
            this.availabilityCount.push(i);
          }
        
         
         }
        
        });

    }
    
  

  }
  form2 = new FormGroup({});
  model2: any = {};
  options2: FormlyFormOptions = {};

  fields2: FormlyFieldConfig[] = [
   
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_name',
          templateOptions: {
            label: 'Name',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_shortdescription',
          templateOptions: {
            label: 'Short Description',
            required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_zone',
          templateOptions: {
          
            label: 'Zone',
            required: true,
           
          },
        },
      ],
    },
   
   
   
  ];

  // submit() {
   
  //     alert(JSON.stringify(this.model1));
  //     console.log(this.model1);
  
  // }


  saveAvailabilitZone(){
    console.log(this.model2)
    // if (this.form1.valid) {
    //   console.log(this.model1)
    //   console.log(this.model1.name);
    //   var post_val = {
    //     "type": "IaCStackDetails",
    //     "name": {
    //         "type": "Property",
    //         "value": this.model1.name
    //     },
    //     "shortDescription": {
    //         "type": "Property",
    //         "value": this.model1.shortdescription
    //     },
    //     "region": {
    //         "type": "Property",
    //         "value":this.model1.region //region
    //     },
    //     "vpcName": {
    //         "type": "Property",
    //         "value": this.model1.vpcname
    //     },
    //     "vpcCidr": {
    //         "type": "Property",
    //         "value": this.model1.vpccidr
    //     },
    //     "noOfAvailabilityZone": {
    //         "type": "Property",
    //         "value": this.model1.availabilityzone
    //     },
    //      "noOfSubnet": {
    //         "type": "Property",
    //         "value": this.model1.availabilitysubnet
    //     },
    //      "noOfSecurityGroups": {
    //         "type": "Property",
    //         "value": this.model1.securitygroup
    //     },
    //       "noOfInstances": {
    //         "type": "Property",
    //         "value":  this.model1.instance
    //     },
    //       "status": {
    //         "type": "Property",
    //         "value": "Active"
    //     },
    //     "refAccountId": {
    //         "type": "Relationship",
    //         "value": "ORGMASTER-0609-003"
    //     },
    //      "refStack": {
    //         "type": "Relationship",
    //         "value": this.model1.stackname
    //     },
    //     "createdBy": {
    //         "type": "Property",
    //         "value": ""
    //     },
    //     "modifiedBy": {
    //         "type": "Property",
    //         "value": ""
    //     }
      
    // }
    

    // this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
       
    //   console.log('User addeddd');
    //   console.log('stack added response',response1);
    //   // this.router.navigateByUrl('/availability-zone', { state: { stackdetailsid:response1["data"]["id"]  } });
    //   this.commonService.triggerToast({ type: 'success', title: "", msg: "Stack details successfullty added.." })
    
    // });



    // }else{
    //   console.log('please type values')
    // }

   
  }

}
