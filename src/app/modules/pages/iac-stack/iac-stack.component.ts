import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { startWith, tap, filter } from 'rxjs/operators';


@Component({
  selector: 'app-iac-stack',
  templateUrl: './iac-stack.component.html',
  styleUrls: ['./iac-stack.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class IacStackComponent implements OnInit {

  form!: FormGroup;
  secondFormGroup!: FormGroup;
  stackNameArray: any = [];
  stack_Details_id: any;
  availability_zone_count: any = [];
  iac_stack_id: any;
  sub_count: any;
  sg_count: any;
  vpcnamearray: any =[];
  securityGroupId: any;
  securityGroupArray: any = [];
  subnetNameArray: any = [];
  publicAddressArray: any = [];

  sgfields4!: FormlyFieldConfig[];
  stackLinePath: any;
  networkNameArray: any = [];
  editIacId: any;
  editIacName: any;


  iacstack_bool: boolean = true;
  stackdetail_bool: boolean = true;
  avalaiZone_bool: boolean = true;
  subnet_bool: boolean = true;
  sg_bool: boolean = true;
  io_bool:boolean = true;
  pa_bool:boolean = true;
  net_in_bool:boolean = true;
  launch_bool: boolean = true;
  
  constructor(private commonService:CommonService,private _formBuilder: FormBuilder, private router: Router, private dataService: DataService,private formBuilder: FormBuilder,) {
       
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.vpcnamearray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["vpcName"]["value"] });
         }
         this.sgfields4 = [
          {
            key: 'investments',
            type: 'repeat',
            fieldArray: {
            fieldGroupClassName: 'wrapper',
            fieldGroup: [
              {
               
                type: 'inno-input',
                key: 'securitygroup_name',
                templateOptions: {
                  label: 'Name',
                  //required: true,
                },
              },
              {
               
                type: 'inno-input',
                key: 'securitygroup_shortdescription',
                templateOptions: {
                  label: 'Short Description',
                  //required: true,
                },
              },
              {
               
                type: 'inno-select',
                key: 'sg_vpcname',
                templateOptions: {
                  label: 'VPC Name',
                  options: this.vpcnamearray
                  // [ { label: 'vpc1', value: 'vpc1' },]
                 
                  //required: true,
                },
              },
              
             
              
      
           
            ],
            },
          },
         
         
          ];
        
       console.log('this.vpcnamearray',this.vpcnamearray)
       
       }
      
      });
  }

  ngOnInit() {

    this.getStackName();

  
    //this.getVPCName();
  
  
    this.getSecurityName();
    this.getSubnetName();
    this.getPublicAdrressName();
    this.getNetworkInterfaceName();
    
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
    console.log(history.state);

    this.editIacId = history.state.eidIac;
    this.editIacName =  history.state.editname
    this.getEditIacData(this.editIacId,this.editIacName);
  
    
  }
  getEditIacData(editId:any,editname:any){
    console.log('editId',editId);
    console.log('editname',editname)
    var _this = this;
    if(editId && editname == 'VPC'){
      this.avalaiZone_bool=false;
      this.sg_bool = false;
      this.io_bool = false;
      this.pa_bool = false;
      this.net_in_bool = false;
      this.launch_bool = false;
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+editId).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('edited data',response1["data"]);

        this.model0 = {
          name: response1["data"][0]["name"]["value"],
          shortdescription: response1["data"][0]["shortDescription"]["value"],
          cloundenv: response1["data"][0]["cloudenv"]["value"],
          stack: response1["data"][0]["stack"]["value"],
          stacknumber:response1["data"][0]["stacknumber"]["value"],
          cloudaccount_num: response1["data"][0]["cloudAccountNumber"]["value"],
        }
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+editId).subscribe(
      (response2: any) => {
        if(response2["data"].length>0){
          this.model1 = {
            name:response2["data"][0]["name"]["value"],
            shortdescription:response2["data"][0]["shortDescription"]["value"],
            stackname:response2["data"][0]["refStack"]["value"],
            region: response2["data"][0]["region"]["value"],
            vpcname:  response2["data"][0]["vpcName"]["value"],
            vpccidr: response2["data"][0]["vpcCidr"]["value"],
            availabilityzone: response2["data"][0]["noOfAvailabilityZone"]["value"],
            availabilitysubnet:response2["data"][0]["noOfSubnet"]["value"],
            onof_nategateway:  response2["data"][0]["noOfNatgateways"]["value"],
            securitygroup:response2["data"][0]["noOfSecurityGroups"]["value"],
            instance: response2["data"][0]["noOfInstances"]["value"],



          }
          this.snmodel3.investments.length = response2["data"][0]["noOfSubnet"]["value"];
          this.snmodel3 = {
            ...this.snmodel3,
            investmentsCount: response2["data"][0]["noOfSubnet"]["value"],
          };
          
        
          console.log(' _this.snmodel3.investments ', _this.snmodel3.investments )
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+editId).subscribe(
            (response3: any) => {
              
              if(response3["data"].length>0){
            
                console.log('edited subnet',response3["data"])
               // console.log(this.)
               var arrobj:any = [];
               var sb_map;
               for(var i=0;i<response3["data"].length;i++){

               sb_map = {
                "subnet_name":response3["data"][i]["name"]["value"]?response3["data"][i]["name"]["value"]:null,
                "subnet_shortdescription": response3["data"][i]["shortDescription"]["value"]?response3["data"][i]["shortDescription"]["value"]:null,
                "subnet_CIDR":response3["data"][i]["cidr"]["value"]?response3["data"][i]["cidr"]["value"]:null,
                "subnet_Type":response3["data"][i]["subnetType"]["value"]?response3["data"][i]["subnetType"]["value"]:null,
               }
               arrobj.push(sb_map);

               }
              console.log('subnet form',this.snform3)
              this.snform3.controls['investments'].setValue(arrobj);
             
             
              
              }
            })
        

       



         }
       });
       
       }

      });

     }


     if(editId && editname == 'SG'){
      this.stackdetail_bool = false;
      this.avalaiZone_bool = false;
      this.subnet_bool = false;
      this.pa_bool = false;
      this.net_in_bool = false;
      this.launch_bool = false;
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+editId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('edited data',response1["data"]);
  
          this.model0 = {
            name: response1["data"][0]["name"]["value"],
            shortdescription: response1["data"][0]["shortDescription"]["value"],
            cloundenv: response1["data"][0]["cloudenv"]["value"],
            stack: response1["data"][0]["stack"]["value"],
            stacknumber:response1["data"][0]["stacknumber"]["value"],
            cloudaccount_num: response1["data"][0]["cloudAccountNumber"]["value"],
          }
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+editId).subscribe(
        (response2: any) => {
          if(response2["data"].length>0){
            console.log(this.sgform4);

          var sg_map = {
                        "securitygroup_name": response2["data"][0]["name"]["value"]? response2["data"][0]["name"]["value"]:null,
                        "securitygroup_shortdescription": response2["data"][0]["shortDescription"]["value"]?response2["data"][0]["shortDescription"]["value"]:null,
                        "sg_vpcname":response2["data"][0]["vpcName"]["value"]?response2["data"][0]["vpcName"]["value"]:null,

          }
          
            console.log('securit group ', response2["data"])
            this.sgform4.controls['investments'].setValue([sg_map]);
  
         
  
  
  
           }
         });
         this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+editId).subscribe(
          (response3: any) => {
            if(response3["data"].length>0){
              console.log('inbound outbound role',response3["data"]);
              this.iomodel6 = {
                io_name: response3["data"][0]["name"]["value"],
                io_shortdescription: response3["data"][0]["shortDescription"]["value"],
                io_priority:response3["data"][0]["priority"]["value"],
                io_direction:response3["data"][0]["direction"]["value"],
                io_protocol: response3["data"][0]["protocol"]["value"],
                io_ipaddress:response3["data"][0]["ipAddress"]["value"],
                io_port: response3["data"][0]["port"]["value"],



              }

            }
          })


         
         }
  
        });

    }




    if(editId && editname == 'IP'){

      this.stackdetail_bool = false;
      this.avalaiZone_bool = false;
      this.subnet_bool = false;
      this.sg_bool = false;
      this.io_bool = false;
      this.net_in_bool = false;
      this.launch_bool = false;
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+editId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('edited data',response1["data"]);
  
          this.model0 = {
            name: response1["data"][0]["name"]["value"],
            shortdescription: response1["data"][0]["shortDescription"]["value"],
            cloundenv: response1["data"][0]["cloudenv"]["value"],
            stack: response1["data"][0]["stack"]["value"],
            stacknumber:response1["data"][0]["stacknumber"]["value"],
            cloudaccount_num: response1["data"][0]["cloudAccountNumber"]["value"],
          }
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&q=refStack=="+editId).subscribe(
        (response2: any) => {
          if(response2["data"].length>0){

           
          
          this.pamodel7 = {
            pa_name :response2["data"][0]["dnslabelname"]["value"],
            pa_publicname: response2["data"][0]["publicipname"]["value"],
            pa_public_allocation:response2["data"][0]["publicIPAllocationMethod"]["value"],
            pa_address_version:response2["data"][0]["publicIPAddressVersion"]["value"],
            pa_idle_timeout:response2["data"][0]["idleTimeoutInMinutes"]["value"],

          }
  
         
  
  
  
           }
         });
         
         }
  
        });

    }

    if(editId && editname == 'NIC'){
      this.stackdetail_bool = false;
      this.avalaiZone_bool = false;
      this.subnet_bool = false;
      this.sg_bool = false;
      this.io_bool = false;
      this.pa_bool= false;
      this.launch_bool = false;
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+editId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('niv edited data',response1["data"]);
  
          this.model0 = {
            name: response1["data"][0]["name"]["value"],
            shortdescription: response1["data"][0]["shortDescription"]["value"],
            cloundenv: response1["data"][0]["cloudenv"]["value"],
            stack: response1["data"][0]["stack"]["value"],
            stacknumber:response1["data"][0]["stacknumber"]["value"],
            cloudaccount_num: response1["data"][0]["cloudAccountNumber"]["value"],
          }
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&q=refStack=="+editId).subscribe(
        (response2: any) => {
          if(response2["data"].length>0){
            console.log('nic',response2["data"])
           
          this.nimodel5 = {
            networkinterface_name:response2["data"][0]["name"]["value"],
            net_decription:response2["data"][0]["shortDescription"]["value"],
            nic_vpcname:response2["data"][0]["refStackDetail"]["value"],
            nic_sg_name:response2["data"][0]["refSecurityGroup"]["value"],
            nic_subnet_name:response2["data"][0]["refSubnet"]["value"],
            nic_public_name:response2["data"][0]["refPublicaddress"]["value"],

          }
        
  
         
  
  
  
           }
         });
         
         }
  
        });

    }

    if(editId && editname == 'INS'){
      this.stackdetail_bool = false;
      this.avalaiZone_bool = false;
      this.subnet_bool = false;
      this.sg_bool = false;
      this.io_bool = false;
      this.pa_bool= false;
     this.net_in_bool = false;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+editId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('edited data',response1["data"]);
  
          this.model0 = {
            name: response1["data"][0]["name"]["value"],
            shortdescription: response1["data"][0]["shortDescription"]["value"],
            cloundenv: response1["data"][0]["cloudenv"]["value"],
            stack: response1["data"][0]["stack"]["value"],
            stacknumber:response1["data"][0]["stacknumber"]["value"],
            cloudaccount_num: response1["data"][0]["cloudAccountNumber"]["value"],
          }
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+editId).subscribe(
        (response2: any) => {
          if(response2["data"].length>0){

           this.limodel9 = {
            launch_name: response2["data"][0]["name"]["value"],
            instance_description:response2["data"][0]["shortDescription"]["value"],
            instance_type:response2["data"][0]["instanceType"]["value"],
            instance_volume:response2["data"][0]["volume"]["value"],
            instance_nic_name:response2["data"][0]["nicName"]["value"],
            instance_authentication: response2["data"][0]["authenticationType"]["value"],
            keyname:response2["data"][0]["keyname"]["value"],
            vpc_name:response2["data"][0]["refStackDetail"]["value"],
            assign_security_group:response2["data"][0]["refSecurityGroup"]["value"],





           }
        
  
         
  
  
  
           }
         });
         
         }
  
        });

    }

   



  }
 
  getNetworkInterfaceName(){
    //IacNetworkinterface
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.networkNameArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
      
       
       
       }
      
      });

  }
  getStackName(){

  
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
       
          this.stackNameArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
      
       
       
       }else{
       
       }
      
      });
  }

  // getVPCName(){
    
  //   this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails").subscribe(
  //     (response1: any) => {
  //      if(response1["data"].length>0){
  //        for(var i=0;i<response1["data"].length;i++){
  //        // this.stackNameArray = response1["data"];
  //         this.vpcnamearray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["vpcName"]["value"] });
  //        }
      
       
       
  //      }
      
  //     });

  // }

  getSecurityName(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.securityGroupArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
      
       
       
       }
      
      });

  }

  getSubnetName(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
         // this.stackNameArray = response1["data"];
          this.subnetNameArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["name"]["value"] });
         }
      
       
       
       }
      
      });

  }

  getPublicAdrressName(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
         for(var i=0;i<response1["data"].length;i++){
    
          this.publicAddressArray.push( { value: response1["data"][i]["id"], label: response1["data"][i]["publicipname"]["value"] });
         }
      
       
       
       }
      
      });

  }
 

 

  form0 = new FormGroup({});
  model0: any = {};
  options0: FormlyFormOptions = {};

  fields0: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'shortdescription',
          templateOptions: {
            label: 'Short Description',
           // required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'cloundenv',
          templateOptions: {
            label: 'Cloudenv',
            options: [
              { label: 'AWS', value: 'aws' },
              { label: 'Azure', value: 'azure' },
            
            ],
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
          type: 'inno-select',
          key: 'stack',
          templateOptions: {
            label: 'Stack',
            options: [
              { label: 'VPC', value: 'VPC' },
              { label: 'SG', value: 'SG' },
              { label: 'INS', value: 'INS' },
              { label: 'IP', value: 'IP' },
              { label: 'NIC', value: 'NIC' },
            ]

            //required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'stacknumber',
          templateOptions: {
            label: 'Stack Number',
           // required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'cloudaccount_num',
          templateOptions: {
            label: 'Cloud Account Number',
            type: 'number'
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
          key: 'stk_region',
          templateOptions: {
            label: 'Region',
           // required: true,
          },
        },
        {
          className: 'flex-1',
        
        },
        {
          className: 'flex-1',
        
        },
      
      
      ],
    },
    
   
   
  ];
  saveIacStack(){
    console.log('Iac stack')
    console.log(this.model0);
    if(this.editIacId == undefined){
      console.log('new section');  
      if (this.form0.valid) {
        var post_val = {
          "type": "IaCStack",
          "name": {
              "type": "Property",
              "value": this.model0.name
          },
          "shortDescription": {
              "type": "Property",
              "value": this.model0.shortdescription
          },
          "cloudenv": {
            "type": "Property",
            "value": this.model0.cloundenv
           },
          "stack": {
            "type": "Property",
            "value": this.model0.stack
          },
        
          "stacknumber": {
              "type": "Property",
              "value": this.model0.stacknumber
          },
          "cloudAccountNumber": {
            "type": "Property",
            "value": this.model0.cloudaccount_num
          },
          "region":{
            "type": "Property",
            "value": this.model0.stk_region
          },
          "stackStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },

          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
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
  
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
         
       
        console.log('stack added response',response1);
        this.stackLinePath=response1["data"]["stack"]["value"];
        console.log(this.stackLinePath);
  
        this.iac_stack_id = response1["data"]["id"];
        this.stackNameArray.push( { value: response1["data"]["id"], label: response1["data"]["name"]["value"] });
        //this.getStackName();
      
        this.commonService.triggerToast({ type: 'success', title: "", msg: "stack successfullty added.." })
      
      });
      
  
  
      } 
  
    }
    if(this.editIacId != undefined){
      console.log('edit section');
      if (this.form0.valid) {
        var patch_val = {
        
          "name": {
              "type": "Property",
              "value": this.model0.name
          },
          "shortDescription": {
              "type": "Property",
              "value": this.model0.shortdescription
          },
          "cloudenv": {
            "type": "Property",
            "value": this.model0.cloundenv
           },
          "stack": {
            "type": "Property",
            "value": this.model0.stack
          },
        
          "stacknumber": {
              "type": "Property",
              "value": this.model0.stacknumber
          },
          "cloudAccountNumber": {
            "type": "Property",
            "value": this.model0.cloudaccount_num
        }
        
      }
      this.dataService.patchData(patch_val, this.dataService.NODE_API + '/api/service/entities/'+this.editIacId+'/IaCStack').subscribe((response7: any) => {
      
        this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCStack successfullty updated.." })
      })
  
      
  
  
      } 

    }

  


  }

  form1 = new FormGroup({});
  model1: any = {};
  options1: FormlyFormOptions = {};

  fields1: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'shortdescription',
          templateOptions: {
            label: 'Short Description',
          //  required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-select',
          key: 'stackname',
          templateOptions: {
            //required: true,
            label: 'Stack Name',
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
          type: 'inno-input',
          key: 'vpcname',
          templateOptions: {
            label: 'VPC Name',
           // required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'vpccidr',
          templateOptions: {
          
            label: 'VPC CIDR',
           // required: true,
           
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'availabilityzone',
          templateOptions: {
            label: 'Number of Availability Zones',
            type:'number',
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
          key: 'availabilitysubnet',
          templateOptions: {
            type:'number',
            label: 'Number of Subnet',
           // required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'onof_nategateway',
          templateOptions: {
            type:'number',
            label: 'Number of Nat gateways',
           // required: true,
           
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'securitygroup',
          templateOptions: {
            type:'number',
            label: 'Number of Security Groups',
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
          key: 'instance',
          templateOptions: {
            type:'number',
            label: 'Number of Instances',
            //required: true,
          },
         
        },
        {
          className: 'flex-1',
        
        },
        {
          className: 'flex-1',
        
        },
      
      ],
    },
   
   
  ];

 


  saveStackDetails(){
    if(this.editIacId == undefined){
      if (this.form1.valid) {
        console.log(this.model1)
        console.log(this.model1.name);
        var post_val = {
          "type": "IaCStackDetails",
          "name": {
              "type": "Property",
              "value": this.model1.name
          },
          "shortDescription": {
              "type": "Property",
              "value": this.model1.shortdescription
          },
          // "region": {
          //     "type": "Property",
          //     "value":this.model1.region //region
          // },
          "vpcName": {
              "type": "Property",
              "value": this.model1.vpcname
          },
          "vpcCidr": {
              "type": "Property",
              "value": this.model1.vpccidr
          },
          "noOfAvailabilityZone": {
              "type": "Property",
              "value": this.model1.availabilityzone
          },
           "noOfSubnet": {
              "type": "Property",
              "value": this.model1.availabilitysubnet
          },
          "noOfNatgateways": {
            "type": "Property",
            "value": this.model1.onof_nategateway
          },
           "noOfSecurityGroups": {
              "type": "Property",
              "value": this.model1.securitygroup
          },
            "noOfInstances": {
              "type": "Property",
              "value":  this.model1.instance
          },
            "status": {
              "type": "Property",
              "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
          },
           "refStack": {
              "type": "Relationship",
              "value": this.model1.stackname
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
      
  
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
         
        console.log('User addeddd');
        console.log('stack detail added response',response1);
        // this.router.navigateByUrl('/availability-zone', { state: { stackdetailsid:response1["data"]["id"]  } });
        //localStorage.setItem('stackDetailsId', response1["data"]["id"]);
        this.vpcnamearray.push( { value: response1["data"]["id"], label: response1["data"]["vpcName"]["value"] });
      //this.sgmodel4.securitygroup_vpcname = response1["data"]["vpcName"]["value"];
        this.stack_Details_id = response1["data"]["id"];
      
          var azcount = response1["data"]["noOfAvailabilityZone"]["value"];
          this.sub_count = response1["data"]["noOfSubnet"]["value"];
          this.sg_count = response1["data"]["noOfSecurityGroups"]["value"];
          
              this.azmodel.investments.length = azcount;
              this.azmodel = {
                ...this.azmodel,
                investmentsCount: azcount,
              };
  
              this.snmodel3.investments.length = this.sub_count;
              this.snmodel3 = {
                ...this.snmodel3,
                investmentsCount: this.sub_count,
              };
              
              // this.snmodel3.subnetArray.length = this.sub_count;
              // this.snmodel3 = {
              //   ...this.snmodel3,
              //   subnetCount: this.sub_count,
              // };
             // sgmodel4
              this.sgmodel4.investments.length = this.sg_count;
              this.sgmodel4 = {
                ...this.sgmodel4,
                investmentsCount: this.sg_count,
              };
          
          
       
       
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Stack details successfullty added.." })
      
      });
  
  
  
      }else{
        console.log('please type values')
      }

    }
    if(this.editIacId != undefined){

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+this.editIacId).subscribe(
        (response1: any) => {
          if (this.form1.valid) {
            console.log(this.model1)
            console.log(this.model1.name);
            var patch_val = {
            
              "name": {
                  "type": "Property",
                  "value": this.model1.name
              },
              "shortDescription": {
                  "type": "Property",
                  "value": this.model1.shortdescription
              },
              "region": {
                  "type": "Property",
                  "value":this.model1.region //region
              },
              "vpcName": {
                  "type": "Property",
                  "value": this.model1.vpcname
              },
              "vpcCidr": {
                  "type": "Property",
                  "value": this.model1.vpccidr
              },
              "noOfAvailabilityZone": {
                  "type": "Property",
                  "value": this.model1.availabilityzone
              },
               "noOfSubnet": {
                  "type": "Property",
                  "value": this.model1.availabilitysubnet
              },
              "noOfNatgateways": {
                "type": "Property",
                "value": this.model1.onof_nategateway
              },
               "noOfSecurityGroups": {
                  "type": "Property",
                  "value": this.model1.securitygroup
              },
                "noOfInstances": {
                  "type": "Property",
                  "value":  this.model1.instance
              },
               "refStack": {
                  "type": "Relationship",
                  "value": this.model1.stackname
              },
             
            
             }
          
        this.dataService.patchData(patch_val, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IaCStackDetails').subscribe((response7: any) => {
      
                this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCStackDetails successfullty updated.." })
              })
      
      
          }else{
            console.log('please type values')
          }
    

        })

    
    }

  

   
  }



  azform = new FormGroup({});
  azmodel: any = { 
    investmentsCount: 0,
    investments: [{}],};
  azoptions: FormlyFormOptions = {};

  azfields: FormlyFieldConfig[] = [
   
    {
      key: 'investments',
      type: 'repeat',
      fieldArray: {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_shortdescription',
          templateOptions: {
            label: 'Short Description',
            //required: true,
          },
        },
        {
          className: 'flex-1',
          type: 'inno-input',
          key: 'a_zone',
          templateOptions: {
          
            label: 'Zone',
            //required: true,
           
          },
        },
      ],
      },
    },
   
  ];




  saveAvailabilitZone(){
    console.log(this.azmodel.investments)
    var azobj = this.azmodel.investments
    if (this.azform.valid) {
      for(var i=0;i<azobj.length;i++){
        console.log(azobj[i].a_name)
        console.log(azobj[i].a_shortdescription)
        console.log(azobj[i].a_zone)
            var post_val:any = {
        "type": "IaCAvailabilityZone",
        "name": {
            "type": "Property",
            "value": azobj[i].a_name
        },
        "shortDescription": {
            "type": "Property",
            "value": azobj[i].a_shortdescription
        },
        "zone": {
            "type": "Property",
            "value": azobj[i].a_zone
        },
        "createdBy": {
            "type": "Property",
            "value": ""
        },
        "modifiedBy": {
            "type": "Property",
            "value": ""
        },
        "refAccountId": {
            "type": "Relationship",
            "value": "ORGMASTER-0609-003"
        },
         "refStack": {
            "type": "Relationship",
            "value": this.iac_stack_id
        },
         "refStackDetail": {
            "type": "Relationship",
            "value": this.stack_Details_id 
        },
        "status":{
          "type": "Property",
          "value": ""
        },
        "resourceStatus":{
          "type": "Property",
          "value": ""
        },
        "resourceId":{
          "type": "Property",
          "value": ""
        },
      
            }
            console.log(post_val);
            this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
              console.log('stack added response',response1);
            });
    
           
           

 

    }
     
      this.commonService.triggerToast({ type: 'success', title: "", msg: "AvailabilityZone successfullty added.." })

    }else{
      console.log('please type values')
    }

   
  }







  snform3 = new FormGroup({});
  snmodel3: any = { 
    investmentsCount: 0,
    investments: [{}],};
  snoptions3: FormlyFormOptions = {};

  snfields3: FormlyFieldConfig[] = [
   
    {
      key: 'investments',
      type: 'repeat',
      fieldArray: {
      fieldGroupClassName: 'wrapper',
      fieldGroup: [
        {
        
          type: 'inno-input',
          key: 'subnet_name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
         
          type: 'inno-input',
          key: 'subnet_shortdescription',
          templateOptions: {
            label: 'Short Description',
           // required: true,
          },
        },
        {
         
          type: 'inno-input',
          key: 'subnet_CIDR',
          templateOptions: {
          
            label: 'CIDR',
            //required: true,
           
          },
        },
        {
        
          type: 'inno-input',
          key: 'subnet_Type',
          templateOptions: {
            label: 'Subnet Type',
           
          },
        },
        // {
        
        //   type: 'inno-input',
        //   key: 'sub_name',
        //   templateOptions: {
          
        //     label: 'Subnet Name',
        //     required: true,
           
        //   },
        // },
        
       
     
      ],
      },
    },
 
   
  ];







 




  saveSubnetDetails(){
    console.log('this.snmodel3',this.snmodel3)
    console.log(this.snmodel3.investments)
    var azobj = this.snmodel3.investments
    if(this.editIacId == undefined){
      if (this.snform3.valid) {
        for(var i=0;i<azobj.length;i++){
          console.log(azobj[i].subnet_name)
          console.log(azobj[i].subnet_shortdescription)
          console.log(azobj[i].subnet_CIDR)
          console.log(azobj[i].subnet_Type)
          // console.log(azobj[i].sub_name)
        var post_val1:any = {
          "type": "IaCSubnet",
          "name": {
              "type": "Property",
              "value": azobj[i].subnet_name
          },
          "shortDescription": {
              "type": "Property",
              "value": azobj[i].subnet_shortdescription
          },
          "cidr": {
              "type": "Property",
              "value": azobj[i].subnet_CIDR
          },
          "subnetType": {
            "type": "Property",
            "value": azobj[i].subnet_Type
        },
        // "subnetname": {
        //   "type": "Property",
        //   "value": azobj[i].sub_name
        // },
        "status":{
          "type": "Property",
          "value": ""
        },
        "resourceStatus":{
          "type": "Property",
          "value": ""
        },
        "resourceId":{
          "type": "Property",
          "value": ""
        },
          "createdBy": {
              "type": "Property",
              "value": ""
          },
          "modifiedBy": {
              "type": "Property",
              "value": ""
          },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
          },
           "refStack": {
              "type": "Relationship",
              "value": this.iac_stack_id
          },
           "refStackDetail": {
              "type": "Relationship",
              "value": this.stack_Details_id 
          }
        
              }
              console.log(post_val1);
              this.dataService.postData(post_val1, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
                console.log('subnet  added response',response1);
                this.subnetNameArray.push([{label:response1["data"]["id"],value:response1["data"]["name"]["value"]}])
              });
             
            
  
      
    
  
      }
       
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Subnet successfullty added.." })
  
      }else{
        console.log('please type values')
      }

    }
    if(this.editIacId != undefined){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+this.editIacId).subscribe(
        (response1: any) => {
          if(response1["data"].length > 0){
            console.log('subnet edit',response1["data"])
            for(var j=0;j<response1["data"].length;j++){
              if (this.snform3.valid) {
                for(var i=0;i<azobj.length;i++){
                  console.log(azobj[i].subnet_name)
                  console.log(azobj[i].subnet_shortdescription)
                  console.log(azobj[i].subnet_CIDR)
                  console.log(azobj[i].subnet_Type)
                  // console.log(azobj[i].sub_name)
                var patch_val1:any = {
               
                  "name": {
                      "type": "Property",
                      "value": azobj[i].subnet_name
                  },
                  "shortDescription": {
                      "type": "Property",
                      "value": azobj[i].subnet_shortdescription
                  },
                  "cidr": {
                      "type": "Property",
                      "value": azobj[i].subnet_CIDR
                  },
                  "subnetType": {
                    "type": "Property",
                    "value": azobj[i].subnet_Type
                },
               
                
                      }
                    
               this.dataService.patchData(patch_val1, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][j]["id"]+'/IaCSubnet').subscribe((response7: any) => {
                console.log('subnet response',response7)
                    
                      })
              
            
          
              }
               
                         
              }else{
                console.log('please type values')
              }
              this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCSubnet successfullty updated.." })

            }

          }

        });

    }

  

  
   
  }









 

  sgform4 = new FormGroup({});
  sgmodel4: any = { 
    investmentsCount: 1,
    investments: [{}],
  };
  sgoptions4: FormlyFormOptions = {};

  


  saveSecurityGroupDetails(){
    console.log(this.sgmodel4)
   
    var azobj = this.sgmodel4.investments

    if(this.editIacId == undefined){
      if (this.sgform4.valid) {
        for(var i=0;i<azobj.length;i++){
          console.log(azobj[i].securitygroup_name)
          console.log(azobj[i].securitygroup_shortdescription)
          console.log(azobj[i].sg_vpcname)
       
         
   
          var post_val1:any = {
          "type": "IaCSecurityGRoup",
          "name": {
              "type": "Property",
              "value": azobj[i].securitygroup_name
          },
          "shortDescription": {
              "type": "Property",
              "value": azobj[i].securitygroup_shortdescription
          },
          "vpcName": {
              "type": "Property",
              "value": azobj[i].sg_vpcname
          },
        
          "status":{
            "type": "Property",
            "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },
          "createdBy": {
              "type": "Property",
              "value": ""
          },
          "modifiedBy": {
              "type": "Property",
              "value": ""
          },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
          },
           "refStack": {
              "type": "Relationship",
              "value": this.iac_stack_id
          },
           "refStackDetail": {
              "type": "Relationship",
              "value": this.stack_Details_id 
          }
        
              }
      
              this.dataService.postData(post_val1, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
                console.log('security group added response',response1);
  
                this.securityGroupId = response1["data"]["id"];
                this.securityGroupArray.push([{label:response1["data"]["id"],value:response1["data"]["name"]["value"]}])
              });
              
      
    
    
  
      }
   
      
       
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Security Group successfullty added.." })
  
      }else{
        console.log('please type values')
      }
    }
    if(this.editIacId != undefined){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+this.editIacId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){

 if (this.sgform4.valid) {
        for(var i=0;i<azobj.length;i++){
          console.log(azobj[i].securitygroup_name)
          console.log(azobj[i].securitygroup_shortdescription)
          console.log(azobj[i].sg_vpcname)
       
         
   
          var patch_val1:any = {
        
          "name": {
              "type": "Property",
              "value": azobj[i].securitygroup_name
          },
          "shortDescription": {
              "type": "Property",
              "value": azobj[i].securitygroup_shortdescription
          },
          "vpcName": {
              "type": "Property",
              "value": azobj[i].sg_vpcname
          },
     
        
        
              }
      
           
      
              this.dataService.patchData(patch_val1, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IaCSecurityGRoup').subscribe((response7: any) => {
      
                this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCSecurityGRoup successfullty updated.." })
              })
    
    
  
      }
   
      
      
      }else{
        console.log('please type values')
      }
         }
        });


    }
  

   
  }




  ioform6 = new FormGroup({});
  iomodel6: any = {};
  iooptions6: FormlyFormOptions = {};

  iofields6: FormlyFieldConfig[] = [
    {
    
      fieldGroupClassName: 'wrapper',
      fieldGroup: [
        {
         
          type: 'inno-input',
          key: 'io_name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
         
          type: 'inno-input',
          key: 'io_shortdescription',
          templateOptions: {
            label: 'Short Description',
           // required: true,
          },
        },
       
        {
        
          type: 'inno-input',
          key: 'io_priority',
          templateOptions: {
            label: 'Priority',
            //required: true,
          },
        },
        {
        
          type: 'inno-select',
          key: 'io_direction',
          templateOptions: {
            label: 'Direction (Inbound/Outbound)',
           // required: true,
           options: [
            { label: 'Inbound', value: 'Inbound' },
            { label: 'Outbound', value: 'Outbound' },
          
          ],
          },
        },
        {
        
          type: 'inno-input',
          key: 'io_protocol',
          templateOptions: {
            label: 'Protocol',
           // required: true,
          },
        },
        {
        
          type: 'inno-input',
          key: 'io_ipaddress',
          templateOptions: {
            label: 'IP Address',
            //required: true,
          },
        },
        {
        
          type: 'inno-input',
          key: 'io_port',
          templateOptions: {
            label: 'Port',
            //required: true,
          },
        },
       
        

     
      ],
     
    },
   
   
  ];

 saveInboundOutbound(){
  var azobj = this.iomodel6
  if(this.editIacId == undefined){
    if (this.ioform6.valid) {
  
   
     
      console.log(post_val1);
          var post_val1:any = {
      "type": "IaCInboundOutboundRule",
      "name": {
          "type": "Property",
          "value": azobj.io_name
      },
      "shortDescription": {
          "type": "Property",
          "value": azobj.io_shortdescription
      },
      "priority": {
        "type": "Property",
        "value": azobj.io_priority
    },
      "direction": {
          "type": "Property",
          "value": azobj.io_direction
      },
      "protocol": {
        "type": "Property",
        "value": azobj.io_protocol
      },
      "ipAddress": {
        "type": "Property",
        "value": azobj.io_ipaddress
      },
      "port": {
        "type": "Property",
        "value": azobj.io_port
      },
    
      "status":{
        "type": "Property",
        "value": ""
      },
      "resourceStatus":{
        "type": "Property",
        "value": ""
      },
      "resourceId":{
        "type": "Property",
        "value": ""
      },
      "createdBy": {
          "type": "Property",
          "value": ""
      },
      "modifiedBy": {
          "type": "Property",
          "value": ""
      },
      "refAccountId": {
          "type": "Relationship",
          "value": "ORGMASTER-0609-003"
      },
       "refStack": {
          "type": "Relationship",
          "value": this.iac_stack_id
      },
       "refStackDetail": {
          "type": "Relationship",
          "value": this.stack_Details_id 
      },
      "refSecurityGroup": {
        "type": "Relationship",
        "value": this.securityGroupId
    }
    
          }
  
          this.dataService.postData(post_val1, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
            console.log('stack added response',response1);
          });
          
  



  
 // this.router.navigateByUrl('/infrastructure');
  
   
    this.commonService.triggerToast({ type: 'success', title: "", msg: "Security Group successfullty added.." })

  }else{
    console.log('please type values')
  }
  }
  if(this.editIacId != undefined){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+this.editIacId).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        if (this.ioform6.valid) {
     
          console.log(post_val1);
              var patch_val1:any = {
        
          "name": {
              "type": "Property",
              "value": azobj.io_name
          },
          "shortDescription": {
              "type": "Property",
              "value": azobj.io_shortdescription
          },
          "priority": {
            "type": "Property",
            "value": azobj.io_priority
        },
          "direction": {
              "type": "Property",
              "value": azobj.io_direction
          },
          "protocol": {
            "type": "Property",
            "value": azobj.io_protocol
          },
          "ipAddress": {
            "type": "Property",
            "value": azobj.io_ipaddress
          },
          "port": {
            "type": "Property",
            "value": azobj.io_port
          },
        
        

              }
        
        
      this.dataService.patchData(patch_val1, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IaCInboundOutboundRule').subscribe((response7: any) => {
      
                this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCInboundOutboundRule successfullty updated.." })
              })
      
            
              
      
    
    
    
  
      }else{
        console.log('please type values')
      }
       }
      })

  }


 }





  paform7 = new FormGroup({});
  pamodel7: any = {};
  paoptions7: FormlyFormOptions = {};

  pafields7: FormlyFieldConfig[] = [
    {
     
      fieldGroupClassName: 'wrapper',
      fieldGroup: [
        {
         
          type: 'inno-input',
          key: 'pa_name',
          templateOptions: {
            label: 'Dns Label Name',
          //  required: true,
          },
        },
        {
         
          type: 'inno-input',
          key: 'pa_publicname',
          templateOptions: {
            label: 'Public Name',
           // required: true,
          },
        },
       
        {
        
          type: 'inno-input',
          key: 'pa_public_allocation',
          templateOptions: {
            label: 'Public IP Allocation Method',
          //  required: true,
          },
        },
        {
        
          type: 'inno-input',
          key: 'pa_address_version',
          templateOptions: {
            label: 'Public Address Version',
            //required: true,
          
          },
        },
        {
        
          type: 'inno-input',
          key: 'pa_idle_timeout',
          templateOptions: {
            label: 'Idle Time Out In Minutes',
           // required: true,
          },
        },
      
       
        

     
      ],
      },
  
   
  ];


  savePublicAddress(){
    console.log(this.pamodel7);
    var azobj = this.pamodel7
    if(this.editIacId == undefined){
      console.log('new section');  
      if (this.paform7.valid) {
      
              var post_val1:any = {
          "type": "IacPublicaddress",
          "publicipname": {
              "type": "Property",
              "value": azobj.pa_publicname
          },
          "dnslabelname": {
              "type": "Property",
              "value": azobj.pa_name
          },
          "publicIPAllocationMethod": {
            "type": "Property",
            "value": azobj.pa_public_allocation
        },
          "publicIPAddressVersion": {
              "type": "Property",
              "value": azobj.pa_address_version
          },
          "idleTimeoutInMinutes": {
            "type": "Property",
            "value": azobj.pa_idle_timeout
          },
          "status":{
            "type": "Property",
            "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },
          "createdBy": {
              "type": "Property",
              "value": ""
          },
          "modifiedBy": {
              "type": "Property",
              "value": ""
          },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
          },
           "refStack": {
              "type": "Relationship",
              "value": this.iac_stack_id
          },
           "refStackDetail": {
              "type": "Relationship",
              "value": this.stack_Details_id 
          }
        
              }
      
              this.dataService.postData(post_val1, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
                console.log('public address added response',response1);
                this.publicAddressArray.push([{label:response1["data"]["id"],value:response1["data"]["publicipname"]["value"]}]) 
              });
              
      
    
    
    
      
     // this.router.navigateByUrl('/infrastructure');
      
       
        this.commonService.triggerToast({ type: 'success', title: "", msg: "public address successfullty added.." })
    
      }else{
        console.log('please type values')
      }
  
    }
    if(this.editIacId != undefined){
      console.log('edit section');
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&q=refStack=="+this.editIacId).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('IP public edited ',response1["data"])
        var patch_val1:any = {
         
          "publicipname": {
              "type": "Property",
              "value": azobj.pa_publicname
          },
          "dnslabelname": {
              "type": "Property",
              "value": azobj.pa_name
          },
          "publicIPAllocationMethod": {
            "type": "Property",
            "value": azobj.pa_public_allocation
        },
          "publicIPAddressVersion": {
              "type": "Property",
              "value": azobj.pa_address_version
          },
          "idleTimeoutInMinutes": {
            "type": "Property",
            "value": azobj.pa_idle_timeout
          },
       
       
        
              }
      
              this.dataService.patchData(patch_val1, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IacPublicaddress').subscribe((response7: any) => {
      
                this.commonService.triggerToast({ type: 'success', title: "", msg: "IacPublicaddress successfullty updated.." })
              })
       }
      });
      

    }
 
  }








  
  niform5  = new FormGroup({});
  nimodel5: any = {};
  nioptions5: FormlyFormOptions = {};

  nifields5: FormlyFieldConfig[] = [
    
    {
      fieldGroupClassName: 'wrapper',
      fieldGroup: [
        {
         
          type: 'inno-input',
          key: 'networkinterface_name',
          templateOptions: {
            label: 'Name',
            //required: true,
          },
        },
        {
         
          type: 'inno-input',
          key: 'net_decription',
          templateOptions: {
            label: 'Short Description',
            //required: true,
          },
        },
        {
         
          type: 'inno-select',
          key: 'nic_vpcname',
          templateOptions: {
            label: 'VPC Name',
           // required: true,
            options: this.vpcnamearray
          },
        }, //
        {
         
          type: 'inno-select',
          key: 'nic_sg_name',
          templateOptions: {
            label: 'Security Group Name',
            //required: true,
            options: this.securityGroupArray
          },
        }, //
        {
         
          type: 'inno-select',
          key: 'nic_subnet_name',
          templateOptions: {
            label: 'Subnet Name',
            //required: true,
            options: this.subnetNameArray
          },
        },  //
        {
         
          type: 'inno-select',
          key: 'nic_public_name',
          templateOptions: {
            label: 'Public Address Name',
            //required: true,
            options: this.publicAddressArray
          },
        },
     
       
        

     
      ],
    },
   
    
   
   
  ];

  saveNetworkInterface(){

    if(this.editIacId == undefined){
      if (this.niform5.valid) {
        var post_val = {
          "type": "IacNetworkinterface",
          "name": {
              "type": "Property",
              "value": this.nimodel5.networkinterface_name
          },
          "shortDescription": {
              "type": "Property",
              "value": this.nimodel5.net_decription
          },
          "refStack": {
            "type": "Relationship",
            "value": this.iac_stack_id
          },
          "refStackDetail": {
            "type": "Relationship",
            "value": this.nimodel5.nic_vpcname
          },
          "refSubnet": {
            "type": "Relationship",
            "value": this.nimodel5.nic_subnet_name
          },
          "refSecurityGroup": {
            "type": "Relationship",
            "value": this.nimodel5.nic_sg_name
          },
          "refPublicaddress": {
            "type": "Relationship",
            "value": this.nimodel5.nic_public_name
          },
          "status":{
            "type": "Property",
            "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
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
  
      this.dataService.postData(post_val, this.dataService.NODE_API + '/api/service/entities').subscribe((response1: any) => {
         
       
        console.log('Network Interface added response',response1);
  
          //this.router.navigateByUrl('/infrastructure');
      
        this.commonService.triggerToast({ type: 'success', title: "", msg: "Network Interface successfullty added.." })
      
      });
      
  
  
      } 
  

    }
    if(this.editIacId != undefined){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&q=refStack=="+this.editIacId).subscribe(
        (response1: any) => {

          console.log('nic save',response1)
          if (this.niform5.valid) {
            var patcht_val = {
          
              "name": {
                  "type": "Property",
                  "value": this.nimodel5.networkinterface_name
              },
              "shortDescription": {
                  "type": "Property",
                  "value": this.nimodel5.net_decription
              },
            
              "refStackDetail": {
                "type": "Relationship",
                "value": this.nimodel5.nic_vpcname
              },
              "refSubnet": {
                "type": "Relationship",
                "value": this.nimodel5.nic_subnet_name
              },
              "refSecurityGroup": {
                "type": "Relationship",
                "value": this.nimodel5.nic_sg_name
              },
              "refPublicaddress": {
                "type": "Relationship",
                "value": this.nimodel5.nic_public_name
              },
           
            
          }
          this.dataService.patchData(patcht_val, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IacNetworkinterface').subscribe((response7: any) => {
      
            this.commonService.triggerToast({ type: 'success', title: "", msg: "IacNetworkinterface successfullty updated.." })
          })
      
       
          
      
      
          } 

        }
      );
   

    }

  
  }




  liform9 = new FormGroup({});
  limodel9: any = {};
  lioptions9: FormlyFormOptions = {};

  lifields9: FormlyFieldConfig[] = [
    
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
            options:this.networkNameArray
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
            options:this.vpcnamearray
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
            options:this.securityGroupArray
          },
        },
      
      ],
    },
    
  
   
   
  ];
 
  launchInstance(){
    if(this.editIacId == undefined){
      if (this.liform9.valid) {
        console.log(this.limodel9)
        var post_val = {
          "type": "IaCInstance",
          "name": {
              "type": "Property",
              "value": this.limodel9.launch_name
          },
          "shortDescription": {
              "type": "Property",
              "value": this.limodel9.instance_description
          },
          "status":{
            "type": "Property",
            "value": ""
          },
          "resourceStatus":{
            "type": "Property",
            "value": ""
          },
          "resourceId":{
            "type": "Property",
            "value": ""
          },
         "instanceType": {
              "type": "Property",
              "value": this.limodel9.instance_type
          }, //volume
        "volume": {
            "type": "Property",
            "value": this.limodel9.instance_volume
        },//nicName  
        "nicName": {
          "type": "Property",
          "value": this.limodel9.instance_nic_name
        },
        "authenticationType": {
          "type": "Property",
          "value": this.limodel9.instance_authentication
        },
        "keyname": {
          "type": "Property",
          "value": this.limodel9.keyname
        },
        "refStack": {
          "type": "Relationship",
          "value": this.iac_stack_id
        },
          "refAccountId": {
              "type": "Relationship",
              "value": "ORGMASTER-0609-003"
          },
           "refStackDetail": {
              "type": "Relationship",
              "value": this.limodel9.vpc_name
          },
        
       
        "refSecurityGroup": {
        "type": "Relationship",
        "value": this.limodel9.assign_security_group
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
    if(this.editIacId != undefined){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+this.editIacId).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('Edit Section Instance',response1["data"]);
          if (this.liform9.valid) {
            console.log(this.limodel9)
            var patchval = {
          
              "name": {
                  "type": "Property",
                  "value": this.limodel9.launch_name
              },
              "shortDescription": {
                  "type": "Property",
                  "value": this.limodel9.instance_description
              },
            
             "instanceType": {
                  "type": "Property",
                  "value": this.limodel9.instance_type
              }, //volume
            "volume": {
                "type": "Property",
                "value": this.limodel9.instance_volume
            },//nicName  
            "nicName": {
              "type": "Property",
              "value": this.limodel9.instance_nic_name
            },
            "authenticationType": {
              "type": "Property",
              "value": this.limodel9.instance_authentication
            },
            "keyname": {
              "type": "Property",
              "value": this.limodel9.keyname
            },
         
           
               "refStackDetail": {
                  "type": "Relationship",
                  "value": this.limodel9.vpc_name
              },
            
           
            "refSecurityGroup": {
            "type": "Relationship",
            "value": this.limodel9.assign_security_group
        },
             
         }
         this.dataService.patchData(patchval, this.dataService.NODE_API + '/api/service/entities/'+response1["data"][0]["id"]+'/IaCInstance').subscribe((response7: any) => {
        console.log('updated respone',response7["data"]);
        //  this.router.navigateByUrl('/instance2');
          this.commonService.triggerToast({ type: 'success', title: "", msg: "IaCInstance successfullty updated.." })
        })
           
      
         
         
          }

         }
        });


    }

   
   
  }










 

}
