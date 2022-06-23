import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-launch-instance',
  templateUrl: './launch-instance.component.html',
  styleUrls: ['./launch-instance.component.scss']
})
export class LaunchInstanceComponent implements OnInit {
  instance_type='t2.micro';
  network='Stack01-VPC001';
  availability_zone='usa-east-1b';
  subnet = 'stacko1-vpc001-subnet-001';
  assignsecurity = 'securitygroup';
  stackNameArray: any = [];
  availability_zone_array: any=[];
  subnet_array: any=[];
  security_group: any = [];

 
  constructor(private commonService:CommonService,private _formBuilder: FormBuilder, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) {}


  ngOnInit(): void {
    this.getStackDetails();
    // this.getAvailabilitZone();
    // this.getSubnet();
    this.getSecurityGroup();
  }
  getStackDetails(){

    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.stackNameArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["vpcName"]["value"] });
         }
      
       
       
       }
      
      });
  }
  // getAvailabilitZone(){
  //   this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCAvailabilityZone").subscribe(
  //     (response1: any) => {
  //      if(response1["data"].length>0){
  //        for(var i=0;i<response1["data"].length;i++){
  //        // this.stackNameArray = response1["data"];
  //         this.availability_zone_array.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
  //        }
      
       
       
  //      }
      
  //     });
  // }

  // getSubnet(){
  //   this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet").subscribe(
  //     (response1: any) => {
  //      if(response1["data"].length>0){
  //        for(var i=0;i<response1["data"].length;i++){
  //        // this.stackNameArray = response1["data"];
  //         this.subnet_array.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
  //        }
      
       
       
  //      }
      
  //     });

  // }

  getSecurityGroup(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.security_group.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
      
       
       
       }
      
      });


  }
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'launch_name',
          templateOptions: {
            label: 'Name',
           // required: true,
          },
        },
        
      
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'instance_description',
          templateOptions: {
            label: 'Instance Description',
            ///required: true,
          },
        },
      
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'instance_type',
          templateOptions: {
            label: 'Instance Type',
           // required: true,
          
          },
        },
      
      ],
    }, 
    //Instance Volume
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'instance_volume',
          templateOptions: {
            label: 'Instance Volume',
            //required: true,
          },
        },
      
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'instance_nic_name',
          templateOptions: {
            label: 'NIC Name',
            //required: true,
            options:[
              { label: 'Nicname', value: 'Nicname' },
            
           
              
            ]
          },
        },
      
      ],
    }, 
   
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'instance_authentication',
          templateOptions: {
            label: 'Authentication Type',
            //required: true,
            // options:[
            //   { label: 'Password', value: 'password' },
            
           
              
            // ]
          },
        },
      
      ],
    }, 
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'keyname',
          templateOptions: {
            label: 'Key Name',
            //required: true,
          },
        },
      
      ],
    },
   
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'vpc_name',
          templateOptions: {
            label: 'VPC Name',
           // required: true,
            options:this.stackNameArray
          },
        },
      
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
       
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'assign_security_group',
          templateOptions: {
            label: 'Security Group Name',
           // required: true,
            options:this.security_group
          },
        },
      
      ],
    },
    
  
   
   
  ];
 
  launchInstance(){
    if (this.form.valid) {
      console.log(this.model)
      var post_val = {
        "type": "IaCInstance",
        "name": {
            "type": "Property",
            "value": this.model.launch_name
        },
        "shortDescription": {
            "type": "Property",
            "value": this.model.instance_description
        },
        "status": {
          "type": "Property",
          "value": "Active"
      },
       "instanceType": {
            "type": "Property",
            "value": this.model.instance_type
        }, //volume
      "volume": {
          "type": "Property",
          "value": this.model.instance_volume
      },//nicName  
      "nicName": {
        "type": "Property",
        "value": this.model.instance_nic_name
      },
      "authenticationType": {
        "type": "Property",
        "value": this.model.instance_authentication
      },
      "keyname": {
        "type": "Property",
        "value": this.model.keyname
      },
        "refAccountId": {
            "type": "Relationship",
            "value": "ORGMASTER-0609-003"
        },
         "refStackDetail": {
            "type": "Relationship",
            "value": this.model.vpc_name
        },
      
     
      "refSecurityGroup": {
      "type": "Relationship",
      "value": this.model.assign_security_group
  },
        "createdBy": {
            "type": "Property",
            "value": ""
        },
        "modifiedBy": {
            "type": "Property",
            "value": ""
        }
      
               }

      console.log(post_val);
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
        console.log('Launch added response',response1);
      });

      this.router.navigateByUrl('/instance2');
      this.commonService.triggerToast({ type: 'success', title: "", msg: "Launch Instance successfullty added.." })
    
    }
   
  }

}
