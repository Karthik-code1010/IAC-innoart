
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/service/data.service';
import { ColumnDialog } from '../column-dialog/column-dialog';
import { DialogService } from '../dialog.service';
import {AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  id: string;
  name:string;
  region:string;
  vpcname: string;
  availability: string;
  createdon: string;
  createdby: string;
  status: string;
 


}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 'IaC0001', name: 'Stack 1', region: 'US-West', vpcname: 'VPC Name',availability:'2',createdon:'11-19-2021 21:09:21',createdby:'Admistrator',status:'Created'},
 
];

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit {
  stackDetailsData: any = new MatTableDataSource;
  searchname:any;
  rowData: any = [];
  rowStackDetailData: any = [];
  rowSubnetData1:any = [];
  rowPathVal: any;
  rowSubnetData2: any = [];
  rowSecurityGroup: any =[];
  inboundoutbound: any = [];
  rowPublicAddress: any = [];
  rowNetworkInterface: any = [];
  rowInstance: any= [];
 
  constructor(private commonService:CommonService,private dialog: MatDialog,private router: Router,public dataService: DataService,private formBuilder: FormBuilder,) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.stackDetailsData.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.displayedColumns = [];
    this.allColumns.forEach(element => {
      if (element.activeFlag) {
        this.displayedColumns.push(element.name);
      }
    });
    this.getStackDetailsData();

    
  }
  getStackDetailsData(){
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack").subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.stackDetailsData = response1["data"]
       
       
       }
      
      });
  }
  searchVPC(){
    console.log(this.searchname)
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&q=name=="+this.searchname).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      this.stackDetailsData = response1["data"]
       
       
       }else{
        this.getStackDetailsData();
       }
      
      });

  }
  getRowRecord(element:any){
    console.log(element.stack.value)
    this.rowPathVal = element.stack.value;

    // this.rowData = element;
    // console.log(this.rowData.id);
    // console.log(this.rowData.name.value);
    if(element.stack.value == 'VPC'){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+element.id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
       
          this.rowData = response1["data"][0];
          console.log('this.rowData',this.rowData);
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response2["data"]',response2["data"]);
            
            this.rowStackDetailData = response2["data"][0];
              console.log('this.rowStackDetailData',this.rowStackDetailData);
    
             }
            
            });

            this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+response1["data"][0]["id"]).subscribe(
              (response3: any) => {
               if(response3["data"].length>0){
                console.log('response3["data"]',response3["data"]);
                this.rowSubnetData1 = response3["data"][0]
                this.rowSubnetData2 = response3["data"][1]
               }
              
              });
  
         }
        
        });

    }
    if(element.stack.value == 'SG'){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+element.id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
       
          this.rowData = response1["data"][0];
          console.log('this.rowData',this.rowData);
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response2["data"]',response2["data"]);
            
             this.rowSecurityGroup = response2["data"][0];
            //   console.log('this.rowStackDetailData',this.rowStackDetailData);
    
             }
            
            });

            this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+response1["data"][0]["id"]).subscribe(
              (response3: any) => {
               if(response3["data"].length>0){
                console.log('response3["data"]',response3["data"]);
                 this.inboundoutbound = response3["data"][0]
              
               }
              
              });
  
         }
        
        });

    }
    if(element.stack.value == 'IP'){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+element.id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
       
          this.rowData = response1["data"][0];
          console.log('this.rowData',this.rowData);
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response2["data"]',response2["data"]);
            
             this.rowPublicAddress = response2["data"][0];
            //   console.log('this.rowStackDetailData',this.rowStackDetailData);
    
             }
            
            });

        
  
         }
        
        });

    }
    if(element.stack.value == 'NIC'){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+element.id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
       
          this.rowData = response1["data"][0];
          console.log('this.rowData',this.rowData);
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response2["data"]',response2["data"]);
            
             this.rowNetworkInterface = response2["data"][0];
            //   console.log('this.rowStackDetailData',this.rowStackDetailData);
    
             }
            
            });

        
  
         }
        
        });

    }
    if(element.stack.value == 'INS'){
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+element.id).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
       
          this.rowData = response1["data"][0];
          console.log('this.rowData',this.rowData);
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response2["data"]',response2["data"]);
            
             this.rowInstance = response2["data"][0];
            //   console.log('this.rowStackDetailData',this.rowStackDetailData);
    
             }
            
            });

        
  
         }
        
        });

    }


  }

  displayedColumns: string[] = [];
  allColumns = [
    { name: 'id', activeFlag: true, displayName: "ID" },
    { name: 'name', activeFlag: true, displayName: "Name" }, 
    { name: 'shortdesk', activeFlag: true, displayName: "Short Description" }, 
    { name: 'stackpath', activeFlag: true, displayName: "Stack" },
   
    { name: 'cloundenv', activeFlag: true, displayName: "Cloundenv" },
     { name: 'stacknum', activeFlag: true, displayName: "Stack Number" }, 
     { name: 'cloudAccountNum', activeFlag: true, displayName: "Cloud Account Number" }, 
     { name: 'cteatedat', activeFlag: true, displayName: "Created At" },
     { name: 'createdby', activeFlag: true, displayName: "Created By" },
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
  
     
    goPage(page: any) {
      this.router.navigateByUrl(page);
    }

    
  pageChanged(event:any){
    
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;
    console.log('pageIndex',pageIndex);
    console.log('pageSize',pageSize)
    // this.getStackDetailsData(pageSize);
    console.log('previousIndex',previousIndex);
    console.log('previousSize',previousSize)
  
  }

  callVPCAPI(stackid:any,rgname:any,vpcname:any,apitype:any){
   

    if(vpcname == 'VPC' && apitype == 'aws'){
      var subnet:any = [];
      var subnetAddress:any = [];
      var subnetType:any = [];
      var stacknumber:any;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);

          stacknumber = response1["data"][0]["stacknumber"]["value"];
         console.log(stacknumber)
       
  
         this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
          (response2: any) => {
           if(response2["data"].length>0){
            console.log('response2["data"]',response2["data"]);
          
            var vpcName  = response2["data"][0]["vpcName"]["value"]
            var vpcAddress = response2["data"][0]["vpcCidr"]["value"]
            var noOfAvailabilityZone = response2["data"][0]["noOfAvailabilityZone"]["value"]
            var noOfNatgateways =  response2["data"][0]["noOfNatgateways"]["value"]
            console.log(vpcName);
            console.log(vpcAddress);
            console.log(noOfAvailabilityZone);
            console.log(noOfNatgateways);
           this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response3: any) => {
             if(response3["data"].length>0){
              console.log('response3["data"]',response3["data"]);
            
           
              for(var i=0;i<response3["data"].length;i++){
                subnet.push(response3["data"][i]["name"]["value"]);
                subnetAddress.push(response3["data"][i]["cidr"]["value"]);
                subnetType.push(response3["data"][i]["subnetType"]["value"])
              }
              console.log(subnet[0],subnet[1]);
              console.log(subnetAddress[0],subnetAddress[1])
              console.log(subnetType[0],subnetType[1])
               
               this.dataService.postData({},'http://localhost:1001/vpc?stacknumber='+stacknumber+'&vpcname='+vpcName+'&vpcaddress='+vpcAddress+'&max_azs='+noOfAvailabilityZone+'&nat_gateway='+noOfNatgateways+'&subnet1name='+subnet[0]+'&subnet1address='+subnetAddress[0]+'&subnet_type1='+subnetType[0]+'&subnet2name='+subnet[1]+'&subnet2address='+subnetAddress[1]+'&subnet_type2='+subnetType[1]+'&cloudenv=aws').subscribe((response1: any) => {
            console.log('AWS response',response1);
            });

           
            
             }
            
            });
  
  
           }
          
          });
  
  
  
         }
        
        });


    

    }
    if(vpcname == 'VPC' && apitype == 'azure'){

      var subnet1:any = [];
      var subnetAddress:any = [];
 
 
 
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
      
       
     

       this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
        (response2: any) => {
         if(response2["data"].length>0){
          console.log('response2["data"]',response2["data"]);
        
          var vpcName  = response2["data"][0]["vpcName"]["value"]
          var vpcAddress = response2["data"][0]["vpcCidr"]["value"]
      
          console.log(vpcName);
          console.log(vpcAddress);
         this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+response1["data"][0]["id"]).subscribe(
          (response3: any) => {
           if(response3["data"].length>0){
            console.log('response3["data"]',response3["data"]);
          
         
            for(var i=0;i<response3["data"].length;i++){
              subnet1.push(response3["data"][i]["name"]["value"]);
              subnetAddress.push(response3["data"][i]["cidr"]["value"])
            }
            console.log(subnet1[0],subnet1[1]);
            console.log(subnetAddress[0],subnetAddress[1])
            this.dataService.postData({},'http://localhost:1001/vpc?stacknumber=1&vpcname='+vpcName+'&vpcaddress='+vpcAddress+'&max_azs=1&nat_gateway=0&subnet1name='+subnet1[1]+'&subnet1address='+subnetAddress[1]+'&subnet_type1=PUBLIC&subnet2name='+subnet1[0]+'&subnet2address='+subnetAddress[0]+'&subnet_type2=PRIVATE_ISOLATED&cloudenv=azure').subscribe((response1: any) => {
              console.log('azure response',response1);
            });
        
           
          
           }
          
          });


         }
        
        });



       }
      
      });
 









   // http://localhost:1001/vpc?stacknumber=1&vpcname=VNet&vpcaddress=10.0.0.0/16&max_azs=1&nat_gateway=0&subnet1name=Subnet1&subnet1address=10.0.0.0/24&subnet_type1=PUBLIC&subnet2name=Subnet2&subnet2address=10.0.1.0/24&subnet_type2=PRIVATE_ISOLATED&cloudenv=azure
  //http://localhost:1001/vpc?stacknumber=1&vpcname=Vpc1&vpcaddress=10.0.0.0/16&max_azs=1&nat_gateway=0&subnet1name=Subnet1&subnet1address=24&subnet_type1=PUBLIC&subnet2name=Subnet2&subnet2address=24&subnet_type2=PRIVATE_ISOLATED&cloudenv=aws
   

      
    }
   
    if(vpcname == 'SG'  && apitype == 'aws'){
    console.log(apitype);
    console.log(stackid);
    console.log(rgname);
    console.log(vpcname)
    console.log('karthik')
    
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        var cloudname = response1["data"][0]["cloudenv"]["value"]
        var stacknum =  response1["data"][0]["stacknumber"]["value"]
        console.log('cloudname',cloudname,'stacknum',stacknum);

     

       this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+response1["data"][0]["id"]).subscribe(
        (response2: any) => {
         if(response2["data"].length>0){
          console.log('response2["data"]',response2["data"]);
          var securitygroup_name = response2["data"][0]["name"]["value"]
          var vpcname_id = response2["data"][0]["vpcName"]["value"];
          var vpc_name:any;
          console.log(' securitygroup_name ', securitygroup_name, ' vpcname_id',vpcname_id);

          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&id="+vpcname_id).subscribe(
            (response4: any) => {
             if(response4["data"].length>0){
              console.log('response4["data"]',response4["data"]);
              vpc_name = response4["data"][0]["vpcName"]["value"];
              console.log('vpc_name',vpc_name);

              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+response1["data"][0]["id"]).subscribe(
                (response3: any) => {
                 if(response3["data"].length>0){
                  console.log('response3["data"]',response3["data"]);
                  var rulename = response3["data"][0]["name"]["value"];
                  var protocol = response3["data"][0]["protocol"]["value"];
                  var priority =  response3["data"][0]["priority"]["value"];
                  var direction = response3["data"][0]["direction"]["value"];
                  var port = response3["data"][0]["port"]["value"];
                  var ipaddress = response3["data"][0]["ipAddress"]["value"];
                  console.log('rulename',rulename,'protocol',protocol,'priority',priority,'direction',direction,'port',port,'ipaddress',ipaddress)
      
                
                  this.dataService.postData({},'http://localhost:1002/secgroup?securitygroupname='+securitygroup_name+'&protocol='+protocol+'&port='+port+'&ipaddress='+ipaddress+'&stacknumber='+stacknum+'&vpcname='+vpc_name+'&cloudenv=aws').subscribe((response1: any) => {
                    console.log('sg aws  response',response1);
                  });
              
      
      
               
                
                 }
                
                });



            }
            
            });
      
     


         }
        
        });



       }
      
      });


    }
    if(vpcname == 'SG'  && apitype == 'azure'){
      console.log('Sg part foe Template Creation')
      console.log(apitype);
      console.log(stackid);
      console.log(rgname);
      console.log(vpcname)
      console.log('karthik')
      
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          var cloudname = response1["data"][0]["cloudenv"]["value"]
          var stacknum =  response1["data"][0]["stacknumber"]["value"]
          console.log('cloudname',cloudname,'stacknum',stacknum);
  
       
  
         this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+response1["data"][0]["id"]).subscribe(
          (response2: any) => {
           if(response2["data"].length>0){
            console.log('response2["data"]',response2["data"]);
            var securitygroup_name = response2["data"][0]["name"]["value"]
            var vpcname_id = response2["data"][0]["vpcName"]["value"];
            var vpc_name:any;
            console.log(' securitygroup_name ', securitygroup_name, ' vpcname_id',vpcname_id);
  
            // this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&id="+vpcname_id).subscribe(
            //   (response4: any) => {
            //    if(response4["data"].length>0){
            //     console.log('response4["data"]',response4["data"]);
            //     vpc_name = response4["data"][0]["vpcName"]["value"];
            //     console.log('vpc_name',vpc_name);
  
             
  
  
            //   }
              
            //   });
        
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+response1["data"][0]["id"]).subscribe(
                (response3: any) => {
                 if(response3["data"].length>0){
                  console.log('response3["data"]',response3["data"]);
                  var rulename = response3["data"][0]["name"]["value"];
                  var protocol = response3["data"][0]["protocol"]["value"];
                  var priority =  response3["data"][0]["priority"]["value"];
                  var direction = response3["data"][0]["direction"]["value"];
                  var port = response3["data"][0]["port"]["value"];
                  var ipaddress = response3["data"][0]["ipAddress"]["value"];
                  console.log('rulename',rulename,'protocol',protocol,'priority',priority,'direction',direction,'port',port,'ipaddress',ipaddress)
      
                
                  this.dataService.postData({},'http://localhost:1002/secgroup?securitygroupname='+securitygroup_name+'&rulename='+rulename+'&protocol='+protocol+'&priority='+priority+'&direction='+direction+'&port='+port+'&ipaddress='+ipaddress+'&cloudenv=azure').subscribe((response1: any) => {
                    console.log('sg azure response',response1);
                  });
              
      
      
               
                
                 }
                
                });

  
  
           }
          
          });
  
  
  
         }
        
        });
  
  
      }

    if(vpcname == 'IP'  && apitype == 'azure'){
      console.log(apitype);
      console.log(stackid);
      console.log(rgname);
      console.log(vpcname)
      console.log('karthik')
      
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          var cloudname = response1["data"][0]["cloudenv"]["value"]
          var stacknum =  response1["data"][0]["stacknumber"]["value"]
          console.log('cloudname',cloudname,'stacknum',stacknum);
  
       
  
         this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&q=refStack=="+response1["data"][0]["id"]).subscribe(
          (response2: any) => {
           if(response2["data"].length>0){
            console.log('response1["data"]',response2["data"]);
            var publicIPAllocationMethod = response2["data"][0]["publicIPAllocationMethod"]["value"];
            var publicIPAddressVersion =  response2["data"][0]["publicIPAddressVersion"]["value"];
            var publicipname =  response2["data"][0]["publicipname"]["value"];
            var idleTimeoutInMinutes = response2["data"][0]["idleTimeoutInMinutes"]["value"];
            var dnslabelname =  response2["data"][0]["dnslabelname"]["value"];
            this.dataService.postData({},'http://localhost:1003/ip?publicIPAllocationMethod='+publicIPAllocationMethod+'&publicIPAddressVersion='+publicIPAddressVersion+'&publicipname='+publicipname+'&idleTimeoutInMinutes='+idleTimeoutInMinutes+'&dnslabelname='+dnslabelname).subscribe((response1: any) => {
              console.log('IP response for aws',response1);
              });
  
  
  
           }
          
          });
  
  
  
         }
        
        });
  
  
      }

    if(vpcname == 'NIC'  && apitype == 'azure'){
        console.log(apitype);
        console.log(stackid);
        console.log(rgname);
        console.log(vpcname)
        console.log('karthik')
        
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
          (response1: any) => {
           if(response1["data"].length>0){
            console.log('response1["data"]',response1["data"]);
            var cloudname = response1["data"][0]["cloudenv"]["value"]
            var stacknum =  response1["data"][0]["stacknumber"]["value"]
            console.log('cloudname',cloudname,'stacknum',stacknum);
    
         
    
           this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&q=refStack=="+response1["data"][0]["id"]).subscribe(
            (response2: any) => {
             if(response2["data"].length>0){
              console.log('response1["data"]',response2["data"]);
              console.log(response2["data"][0]["refStackDetail"]["value"]);
              console.log(response2["data"][0]["refSubnet"]["value"]);
              console.log(response2["data"][0]["refSecurityGroup"]["value"]);
              console.log(response2["data"][0]["refPublicaddress"]["value"]);
              var nic_name = response2["data"][0]["name"]["value"];
              var  vpc_name : any;
              var subnet_name:any;
              var security_group_name:any;
              var public_name:any
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&id="+response2["data"][0]["refStackDetail"]["value"]).subscribe(
                (response4: any) => {
                 if(response4["data"].length>0){
                  console.log('response4["data"]',response4["data"]);
                  vpc_name = response4["data"][0]["vpcName"]["value"];
                  console.log('vpc_name',vpc_name);
                  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&id="+response2["data"][0]["refSubnet"]["value"]).subscribe(
                    (response5: any) => {
                     if(response5["data"].length>0){
                      console.log('response5["data"]',response5["data"]);
                      subnet_name =response5["data"][0]["name"]["value"];
                      console.log('subnet_name',subnet_name);
                      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&id="+response2["data"][0]["refSecurityGroup"]["value"]).subscribe(
                        (response6: any) => {
                         if(response6["data"].length>0){
                          console.log('response6["data"]',response6["data"]);
                          security_group_name =response6["data"][0]["name"]["value"];
                          console.log('security_group_name',security_group_name);
                          
                          
                          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&id="+response2["data"][0]["refPublicaddress"]["value"]).subscribe(
                            (response7: any) => {
                             if(response7["data"].length>0){
                              console.log('response7["data"]',response7["data"]);
                              public_name =response7["data"][0]["publicipname"]["value"];
                              console.log('public_name',public_name);

                              this.dataService.postData({},'http://localhost:1004/nic?vpcname='+vpc_name+'&subnetname='+subnet_name+'&securitygroupname='+security_group_name+'&nicname='+nic_name+'&publicIpname='+public_name).subscribe((response1: any) => {
                                console.log('IP response for aws',response1);
                                });
                              
                              
                           
                
                
                
                            }
                            
                            });
            
            
            
                        }
                        
                        });
                      
                   
        
        
        
                    }
                    
                    });
                  
                  
               
    
    
    
                }
                
                });
              
            
    
    
             }
            
            });
    
    
    
           }
          
          });
    
    
        }

    if(vpcname == 'INS'  && apitype == 'aws'){
          console.log(apitype);
          console.log(stackid);
          console.log(rgname);
          console.log(vpcname)
          console.log('karthik')
          
          this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
            (response1: any) => {
             if(response1["data"].length>0){
              console.log('response1["data"]',response1["data"]);
              var cloudname = response1["data"][0]["cloudenv"]["value"]
              var stacknum =  response1["data"][0]["stacknumber"]["value"]
              console.log('cloudname',cloudname,'stacknum',stacknum);
      
           
      
             this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+response1["data"][0]["id"]).subscribe(
              (response2: any) => {
               if(response2["data"].length>0){
                console.log('response2["data"]',response2["data"]);
                var vpcid = response2["data"][0]["refStackDetail"]["value"];
                var sec_group_id = response2["data"][0]["refSecurityGroup"]["value"];

                var ins_name =  response2["data"][0]["name"]["value"];
                var ins_volume = response2["data"][0]["volume"]["value"];
                var ins_type =  response2["data"][0]["instanceType"]["value"];
                var ins_keyname =  response2["data"][0]["keyname"]["value"];
                var vpcName:any = '';
                var SecurityGroup_name:any = '';
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&id="+vpcid).subscribe(
               (response3: any) => {
                if(response3["data"].length>0){
                console.log('response3["data"]',response3["data"]);
        
                 vpcName  = response3["data"][0]["vpcName"]["value"]
             
      
                console.log(vpcName);
            
                this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&id="+sec_group_id).subscribe(
                  (response4: any) => {
                   if(response4["data"].length>0){
                   console.log('response3["data"]',response4["data"]);
           
                    SecurityGroup_name = response4["data"][0]["name"]["value"]
                
         
                   console.log(SecurityGroup_name);

                  this.dataService.postData({},'http://localhost:1005/vm?stacknumber='+stacknum+'&vpcname='+vpcName+'&securitygroupname='+SecurityGroup_name+'&instancevolume='+ins_volume+'&instancetype='+ins_type+'&keyname='+ins_keyname+'&instancename='+ins_name+'&cloudenv=aws').subscribe((response1: any) => {
                  console.log('Ins response for aws',response1);
                  });
               
          
   
   
                  }
           
                   });



               }
        
                });

          

      
              
                
            
           
      
      
               }
              
              });
      
      
      
             }
            
            });
      
      
          }

    if(vpcname == 'INS'  && apitype == 'azure'){
            console.log(apitype);
            console.log(stackid);
            console.log(rgname);
            console.log(vpcname)
            console.log('karthik')
            
            this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+stackid).subscribe(
              (response1: any) => {
               if(response1["data"].length>0){
                console.log('response1["data"]',response1["data"]);
                var cloudname = response1["data"][0]["cloudenv"]["value"]
                var stacknum =  response1["data"][0]["stacknumber"]["value"]
                console.log('cloudname',cloudname,'stacknum',stacknum);
        
             
        
               this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+response1["data"][0]["id"]).subscribe(
                (response2: any) => {
                 if(response2["data"].length>0){
                  console.log('response2["data"]',response2["data"]);
                  var vpcid = response2["data"][0]["refStackDetail"]["value"];
                  var sec_group_id = response2["data"][0]["refSecurityGroup"]["value"];

                  var nicname =  response2["data"][0]["nicName"]["value"];
                  var ins_name =  response2["data"][0]["name"]["value"];
                  var ins_volume = response2["data"][0]["volume"]["value"];
                  var ins_type =  response2["data"][0]["instanceType"]["value"];
                  var ins_keyname =  response2["data"][0]["keyname"]["value"];
                  var ins_password =  response2["data"][0]["authenticationType"]["value"];
                  var Nic_Name:any = '';
                  var SecurityGroup_name:any = '';

                  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&id="+nicname).subscribe(
                    (response3: any) => {
                     if(response3["data"].length>0){
                     console.log('response3["data"]',response3["data"]);
             
                     Nic_Name  = response3["data"][0]["name"]["value"]
                  
           
                     console.log('Nic_Name',Nic_Name);
                     this.dataService.postData({},'http://localhost:1005/vm?nicname='+Nic_Name+'&instancevolume='+ins_volume+'&instancetype='+ins_type+'&instancename='+ins_name+'&authenticationType='+ins_password+'&cloudenv=azure').subscribe((response1: any) => {
                      console.log('Ins response for azure',response1);
                      });
                 
                
     
     
     
                    }
             
                     });

             

  
            
  
        
                
                  
              
             
        
        
                 }
                
                });
        
        
        
               }
              
              });
        
        
            }
  

  }

  deployAPI(aid:any,rgname:any,vpcname:any,cloundenv:any){
    console.log(aid)
    console.log(rgname)
    console.log(vpcname)
    console.log(cloundenv) //azure
    if(vpcname == 'VPC' && cloundenv == 'azure'){
      this.dataService.postData({},'http://127.0.0.1:9000/name?resource_group_name='+rgname+'&templatename=/app/vpctemplates/vpc_template.json').subscribe((response1: any) => {
        console.log('azure response',response1);
      });


    }

    if(vpcname == 'VPC' && cloundenv == 'aws'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;
      var region:any; 
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
          region = response1["data"][0]["region"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          this.dataService.postData({},'http://localhost:7001/append?classname='+compainedName+'&stackname='+compainedName+'&path=vpctemplates.vpc_template&accountnumber='+cloudAccountNumber+'&region='+region).subscribe((response1: any) => {
            console.log('Deploy aws append response',response1);




          });
  
        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
        //   (response2: any) => {
        //    if(response2["data"].length>0){
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
         
        


             
         
          
  
  
        //    }
          
        //   });
  
  
  
         }
        
        });


    }

    if(vpcname == 'SG' && cloundenv == 'aws'){
      console.log('SG Part for AWS');
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;
      var region:any; 
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
          region = response1["data"][0]["region"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          console.log(response1["data"][0]["id"]);
          this.dataService.postData({},'http://localhost:7001/append?classname='+compainedName+'&stackname='+compainedName+'&path=sectemplates.sec_template&accountnumber='+cloudAccountNumber+'&region='+region).subscribe((response1: any) => {
            console.log('Deploy aws append response',response1);




          });

        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack==IaCStack-1406-053").subscribe(
        //   (response2: any) => {
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
         
        
        
          
        //   });
  
  
  
         }
        
        });


    }


    if(vpcname == 'SG' && cloundenv == 'azure'){
      console.log('SG Part for Azure');
      this.dataService.postData({},'http://127.0.0.1:9000/name?resource_group_name='+rgname+'&templatename=/app/sectemplates/secgroup_template.json').subscribe((response1: any) => {
        console.log('azure response',response1);
      });


    }

    
    if(vpcname == 'IP' && cloundenv == 'azure'){
      console.log('SG Part for Azure');
      this.dataService.postData({},'http://127.0.0.1:9000/name?resource_group_name='+rgname+'&templatename=/app/publiciptemplates/publicip_template.json').subscribe((response1: any) => {
        console.log('azure response',response1);
      });


    }
       
    if(vpcname == 'NIC' && cloundenv == 'azure'){
      console.log('SG Part for Azure');
      this.dataService.postData({},'http://127.0.0.1:9000/name?resource_group_name='+rgname+'&templatename=/app/nictemplates/nic_template.json').subscribe((response1: any) => {
        console.log('azure response',response1);
      });


    }
    if(vpcname == 'INS' && cloundenv == 'aws'){
      console.log('INS Part for AWS');
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;
 var region:any; 
      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
          region = response1["data"][0]["region"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          console.log(response1["data"][0]["id"]);
          this.dataService.postData({},'http://localhost:7001/append?classname='+compainedName+'&stackname='+compainedName+'&path=vmec2templates.ec2_template&accountnumber='+cloudAccountNumber+'&region='+region).subscribe((response1: any) => {
            console.log('Deploy aws append response',response1);

          });
  
        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack==IaCStack-1406-053").subscribe(
        //   (response2: any) => {
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
          
        
        
          
        //   });
  
  
  
         }
        
        });


    }
    if(vpcname == 'INS' && cloundenv == 'azure'){
      console.log('SG Part for Azure');
      this.dataService.postData({},'http://127.0.0.1:9000/name?resource_group_name='+rgname+'&templatename=/app/vmec2templates/vmnetworkinterface_template.json').subscribe((response1: any) => {
        console.log('azure response',response1);
      });


    }
   



  }

  seperateApiCall(aid:any,rgname:any,vpcname:any,cloundenv:any){
    if(vpcname == 'VPC' && cloundenv == 'aws'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          this.dataService.postData({},'http://localhost:7001/name?stacknames='+compainedName).subscribe((response2: any) => {
            console.log('Deploy  aws shell response',response2);

          });
  
        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
        //   (response2: any) => {
        //    if(response2["data"].length>0){
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
           
          


             
         
          
  
  
        //    }
          
        //   });
  
  
  
         }
        
        });


    }
    if(vpcname == 'SG' && cloundenv == 'aws'){
      console.log('sg shell');
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          this.dataService.postData({},'http://localhost:7001/name?stacknames='+compainedName).subscribe((response2: any) => {
            console.log('Deploy  aws shell response',response2);

          });
  
        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
        //   (response2: any) => {
        //    if(response2["data"].length>0){
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
           
          


             
         
          
  
  
        //    }
          
        //   });
  
  
  
         }
        
        });


    }
    if(vpcname == 'INS' && cloundenv == 'aws'){
      console.log('sg shell');
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var cloudAccountNumber:any;

      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
        (response1: any) => {
         if(response1["data"].length>0){
          console.log('response1["data"]',response1["data"]);
          stackname =  response1["data"][0]["stacknumber"]["value"];
          stacknumber = response1["data"][0]["name"]["value"];
         console.log(stacknumber)
         console.log(stackname)
          compainedName = stacknumber + stackname;
         console.log(compainedName);
         cloudAccountNumber =  response1["data"][0]["cloudAccountNumber"]["value"];
          console.log(cloudAccountNumber)
          this.dataService.postData({},'http://localhost:7001/name?stacknames='+compainedName).subscribe((response2: any) => {
            console.log('Deploy  aws shell response',response2);

          });
  
        //  this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+response1["data"][0]["id"]).subscribe(
        //   (response2: any) => {
        //    if(response2["data"].length>0){
        //     console.log('response2["data"]',response2["data"]);
          
        //     var region  = response2["data"][0]["region"]["value"]
         
        //     console.log(region);
           
          


             
         
          
  
  
        //    }
          
        //   });
  
  
  
         }
        
        });


    }

  }
  apiStatusCheck(aid:any,rgname:any,vpcname:any,cloundenv:any){
   
    if(vpcname == 'VPC' && cloundenv == 'aws'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;

      const el:any = document.getElementById(aid);
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
  
        stackname =  response1["data"][0]["stacknumber"]["value"];
        stacknumber = response1["data"][0]["name"]["value"];
       console.log(stacknumber)
       console.log(stackname)
        compainedName = stacknumber + stackname;
       console.log(compainedName);
       
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+aid).subscribe(
      (vpcresponse: any) => {
        if(vpcresponse["data"].length>0){
          var stack_detail_id = vpcresponse["data"][0]["id"];
          stackdetail_vpcname = vpcresponse["data"][0]["vpcName"]["value"];
          console.log('stackdetail_vpcname',stackdetail_vpcname);
          this.dataService.getData('http://localhost:2004/?stackname='+compainedName).subscribe((response2: any) => {
            console.log('Resource check  response',response2);
            el.style.color = 'yellow';
  
          console.log(response2["StackResourceSummaries"])
          for(var i=0;i<response2["StackResourceSummaries"].length;i++){
            if(response2["StackResourceSummaries"][i]["ResourceType"] == "AWS::EC2::VPC"){
              var getobj = response2["StackResourceSummaries"][i]
              var vpcid = getobj["PhysicalResourceId"];
              console.log('getobj',getobj);
              var postObj = {
                "status":{
                  "type": "Property",
                  "value": getobj["ResourceStatus"]
                },
                "resourceId":{
                  "type": "Property",
                  "value": getobj["PhysicalResourceId"]
                },
              }
  
              console.log(postObj);
              this.dataService.patchData(postObj, this.dataService.NODE_API + '/api/service/entities/'+stack_detail_id+'/IaCStackDetails').subscribe((response7: any) => {
        
          console.log('updated stack',response7)
          this.dataService.getData("http://localhost:2000/?vpcname="+stackdetail_vpcname).subscribe(
            (response12: any) => {
              console.log('response12',response12);
              console.log('response12',response12["Vpcs"][0]["VpcId"]);
              console.log('response12',response12["Vpcs"][0]["State"]);
              if(response12["Vpcs"][0]["VpcId"] == vpcid){
                var stackobj = {
                  "resourceStatus":{
                    "type": "Property",
                    "value": response12["Vpcs"][0]["State"]
                  },
                }
               
                el.style.color = 'green';
             // document.getElementById(aid).style.color = 'green' ; 
                this.dataService.patchData(stackobj, this.dataService.NODE_API + '/api/service/entities/'+stack_detail_id+'/IaCStackDetails').subscribe((response8: any) => {
                    console.log('Patch response8',response8)
                })

  

              }
            

             });

         
               
  
              })
  
            
  
  
  
            }


            if(response2["StackResourceSummaries"][i]["ResourceType"] == "AWS::EC2::Subnet"){
              var subnet_obj = response2["StackResourceSummaries"][i];
              console.log('subnet_obj',subnet_obj);
              var subnet_api_id = subnet_obj["PhysicalResourceId"];
              console.log('getobj',getobj);
              var subnet_postObj = {
                "status":{
                  "type": "Property",
                  "value": subnet_obj["ResourceStatus"]
                },
           
              }
              console.log('first api call get subnet',subnet_postObj);
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+aid).subscribe(
                (subnet_response: any) => {
                  if(subnet_response["data"].length > 0){
                    var sub1= subnet_response["data"][0]["id"];
                    var sub2= subnet_response["data"][1]["id"];
                    console.log('subnet response ',subnet_response["data"]);
                    for(var i=0;i<subnet_response["data"].length;i++){
                     
                      this.dataService.patchData(subnet_postObj, this.dataService.NODE_API + '/api/service/entities/'+subnet_response["data"][i]["id"]+'/IaCSubnet').subscribe((response8_sub: any) => {
                        console.log('Patch response8',response8_sub)
                        })


                    }
                  
                    if(sub1){
                      this.dataService.getData("http://localhost:2001/?stackname="+compainedName).subscribe(
                        (s_response13: any) => {
                  
                                 console.log(s_response13["Subnets"])
                               //  for(var j=0;j<s_response13["Subnets"].length;j++){
                                  var sub_obj = {
                                    "resourceStatus":{
                                      "type": "Property",
                                      "value": s_response13["Subnets"][0]["State"]
                                    },
                                    "resourceId":{
                                      "type": "Property",
                                      "value":s_response13["Subnets"][0]["SubnetId"]
                                    },

                                  }
                                  console.log('sub_state_id',sub_obj);
                                  this.dataService.patchData(sub_obj, this.dataService.NODE_API + '/api/service/entities/'+sub1+'/IaCSubnet').subscribe((response9_sub: any) => {
                                    console.log('Patch response99',response9_sub)
                                    })

                               //  }
                           });

                    }
                    if(sub2){
                      this.dataService.getData("http://localhost:2001/?stackname="+compainedName).subscribe(
                        (s_response13: any) => {
                  
                                 console.log(s_response13["Subnets"])
                               //  for(var j=0;j<s_response13["Subnets"].length;j++){
                                  var sub_obj = {
                                    "resourceStatus":{
                                      "type": "Property",
                                      "value": s_response13["Subnets"][1]["State"]
                                    },
                                    "resourceId":{
                                      "type": "Property",
                                      "value":s_response13["Subnets"][1]["SubnetId"]
                                    },

                                  }
                                  console.log('sub_state_id',sub_obj);
                                  this.dataService.patchData(sub_obj, this.dataService.NODE_API + '/api/service/entities/'+sub2+'/IaCSubnet').subscribe((response9_sub: any) => {
                                    console.log('Patch response99',response9_sub)
                                    })

                               //  }
                           });
                    

                    }
                    // for(var i=0;i<subnet_response["data"].length;i++){
                    //  var subidloop = subnet_response["data"][i]["id"];
                    //  console.log(i,'i=======>',subidloop);
                    //   this.dataService.getData("http://localhost:2001/?stackname="+compainedName).subscribe(
                    //     (s_response13: any) => {
                  
                    //              console.log(s_response13["Subnets"])
                    //            //  for(var j=0;j<s_response13["Subnets"].length;j++){
                    //               var sub_obj = {
                    //                 "resourceStatus":{
                    //                   "type": "Property",
                    //                   "value": s_response13["Subnets"][0]["State"]
                    //                 },
                    //                 "resourceId":{
                    //                   "type": "Property",
                    //                   "value":s_response13["Subnets"][0]["SubnetId"]
                    //                 },

                    //               }
                    //               console.log('sub_state_id',sub_obj);
                    //               this.dataService.patchData(sub_obj, this.dataService.NODE_API + '/api/service/entities/'+subidloop+'/IaCSubnet').subscribe((response9_sub: any) => {
                    //                 console.log('Patch response99',response9_sub)
                    //                 })

                    //            //  }
                    //        });
                    
                    // }
                    
  


                  }

                })


            }
  
          }
          
  
  
  
          });
           
    


      
        }

      })
    
       

   


       }
      
      });

    }

    if(vpcname == 'SG' && cloundenv == 'aws'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["stacknumber"]["value"];
        stacknumber = response1["data"][0]["name"]["value"];
       console.log(stacknumber)
       console.log(stackname)
        compainedName = stacknumber + stackname;
        console.log(compainedName);
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+aid).subscribe(
          (secresponse: any) => {
            if(secresponse["data"].length>0){

              var securityGroupId=secresponse["data"][0]["id"];

              console.log('secresponse["data"]',secresponse["data"]);
              var secname = secresponse["data"][0]["name"]["value"]
              console.log('secname==>',secname);

              this.dataService.getData('http://localhost:2004/?stackname='+compainedName).subscribe((response2: any) => {
                console.log('Resource check in sg response',response2);
                //console.log('response2.header',response2.header);
                el.style.color = 'yellow';
                for(var i=0;i<response2["StackResourceSummaries"].length;i++){
                  if(response2["StackResourceSummaries"][i]["ResourceType"] == "AWS::EC2::SecurityGroup"){
                    var getobj = response2["StackResourceSummaries"][i]
                    var sec_id = getobj["PhysicalResourceId"];
                    console.log('getobj',getobj);
                    var postObj = {
                      "status":{
                        "type": "Property",
                        "value": getobj["ResourceStatus"]
                      },
                      "resourceId":{
                        "type": "Property",
                        "value": getobj["PhysicalResourceId"]
                      },
                    }
        
                    console.log(postObj);
                    
              this.dataService.patchData(postObj, this.dataService.NODE_API + '/api/service/entities/'+securityGroupId+'/IaCSecurityGRoup').subscribe((response77: any) => {
                console.log('stack updated ',response77);
                this.dataService.getData("http://localhost:2002/?securitygroupname="+secname).subscribe(
                  (response12: any) => {
                    console.log('Sec name Status',response12);

                    console.log('response12["SecurityGroups"][0]["GroupId"]',response12["SecurityGroups"][0]["GroupId"])
                    if(response12["SecurityGroups"][0]["GroupId"] == sec_id){
                      var stackobj = {
                        "resourceStatus":{
                          "type": "Property",
                          "value": "available"
                        },
                      }
                      
                      this.dataService.patchData(stackobj, this.dataService.NODE_API + '/api/service/entities/'+securityGroupId+'/IaCSecurityGRoup').subscribe((response8: any) => {
                          console.log('Patch response8',response8)
                          el.style.color = 'green';
                      })
      
                      

                    }
                  });


                });

                  }

                }
              })




            }
          });



       }
      });

    }

    if(vpcname == 'INS' && cloundenv == 'aws'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["stacknumber"]["value"];
        stacknumber = response1["data"][0]["name"]["value"];
       console.log(stacknumber)
       console.log(stackname)
        compainedName = stacknumber + stackname;
        console.log(compainedName);

        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+aid).subscribe(
          (ins_response: any) => {
            if(ins_response["data"].length>0){
              console.log('ins_response["data"]',ins_response["data"])
              var instance_id = ins_response["data"][0]["id"];
              var ins_name = ins_response["data"][0]["name"]["value"];
              console.log(ins_name);
              
              this.dataService.getData('http://localhost:2004/?stackname='+compainedName).subscribe((ins_response2: any) => {
                console.log('Instance response',ins_response2);
                el.style.color = 'yellow';
                for(var i=0;i<ins_response2["StackResourceSummaries"].length;i++){
                  if(ins_response2["StackResourceSummaries"][i]["ResourceType"] == "AWS::EC2::Instance"){
                    var ins_getobj = ins_response2["StackResourceSummaries"][i]
                    console.log('instance resource',ins_getobj);
                    var ins_postObj = {
                      "status":{
                        "type": "Property",
                        "value": ins_getobj["ResourceStatus"]
                      },
                      "resourceId":{
                        "type": "Property",
                        "value": ins_getobj["PhysicalResourceId"]
                      },
                    }
                    this.dataService.patchData(ins_postObj, this.dataService.NODE_API + '/api/service/entities/'+instance_id+'/IaCInstance').subscribe((response77: any) => {
                      console.log('Instance updated ',response77);
                      this.dataService.getData("http://localhost:2003?instancename="+ins_name).subscribe(
                        (insresponse12: any) => {
                          console.log('running Status',insresponse12)
                          console.log('running Status==>',insresponse12["Reservations"][0]["Instances"][0]["State"]["Name"])
                          var ins_stateobj = {
                            "resourceStatus":{
                              "type": "Property",
                              "value": insresponse12["Reservations"][0]["Instances"][0]["State"]["Name"]
                            },
                          }
                          
                          this.dataService.patchData(ins_stateobj, this.dataService.NODE_API + '/api/service/entities/'+instance_id+'/IaCInstance').subscribe(
                            (ins_response8: any) => {
                              console.log('Instance State response8',ins_response8);
                              el.style.color = 'green';
                          })

                        })

                    
                    })



                  }
                }
              });


            }
          });

       }
      });

    }

    if(vpcname == 'VPC' && cloundenv == 'azure'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["name"]["value"];
        console.log(stackname);

           
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStackDetails&q=refStack=="+aid).subscribe(
      (vpcresponse: any) => {
        if(vpcresponse["data"].length>0){
          console.log('stack details',vpcresponse["data"]);
          var stack_detail_id = vpcresponse["data"][0]["id"];
          stackdetail_vpcname = vpcresponse["data"][0]["vpcName"]["value"];
          console.log(stackdetail_vpcname)
          this.dataService.getData('http://localhost:3010/deployment?resourcegroup='+stackname).subscribe((response2: any) => {
            console.log('azure vnet response',response2);
            console.log('status',response2[0]["properties"]["provisioningState"]);
            el.style.color = 'yellow';
            
            var postObj = {
              "status":{
                "type": "Property",
                "value": response2[0]["properties"]["provisioningState"]
              },
              "resourceStatus":{
                "type": "Property",
                "value": "available"
              },
  
            }

            console.log(postObj);
            this.dataService.patchData(postObj, this.dataService.NODE_API + '/api/service/entities/'+stack_detail_id+'/IaCStackDetails').subscribe((response7: any) => {
              console.log('first Patch response',response7);
              this.dataService.getData('http://localhost:3010/vnet?resourcegroup='+stackname+'&vnetname='+stackdetail_vpcname).subscribe((response23: any) => {

              console.log('second API Response',response23)
              console.log('resourceGuid',response23["resourceGuid"])

              var patchVnetId = {
                "resourceId":{
                  "type": "Property",
                  "value": response23["resourceGuid"]
                },
              }
              this.dataService.patchData(patchVnetId, this.dataService.NODE_API + '/api/service/entities/'+stack_detail_id+'/IaCStackDetails').subscribe((response88: any) => {
                console.log('first Patch response',response88);
              })
              console.log('subnet1 status',response23["subnets"][0]["provisioningState"])
              console.log('subnet2 Status',response23["subnets"][1]["provisioningState"])
              var vnet_sub1 = response23["subnets"][0]["provisioningState"];
              var vnet_sub2 = response23["subnets"][1]["provisioningState"];
              this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSubnet&q=refStack=="+aid).subscribe(
                (subnet_response: any) => {
                  var sub1= subnet_response["data"][0]["id"];
                  var sub2= subnet_response["data"][1]["id"];
                  
                  if(sub1){
                            
                  var sub_obj = {
                         "status":{
                                    "type": "Property",
                                    "value": vnet_sub1
                                  },
                                  "resourceStatus":{
                                    "type": "Property",
                                    "value": "available",
                                  },
                                 

                                }
                                console.log('sub_state_id',sub_obj);
                                this.dataService.patchData(sub_obj, this.dataService.NODE_API + '/api/service/entities/'+sub1+'/IaCSubnet').subscribe((response9_sub: any) => {
                                  console.log('Patch subnet1 response99',response9_sub)
                                  })

                       

                  }
                  if(sub2){
                            
                    var sub_obj = {
                      "status":{
                        "type": "Property",
                        "value": vnet_sub2
                      },
                      "resourceStatus":{
                        "type": "Property",
                        "value": "available",
                      },
                     

                    }
                    console.log('sub_state_id',sub_obj);
                    this.dataService.patchData(sub_obj, this.dataService.NODE_API + '/api/service/entities/'+sub2+'/IaCSubnet').subscribe((response10_sub: any) => {
                      console.log('Patchsubnet2 response99',response10_sub)
                      el.style.color = 'green';
                      })

           

      }

                });

              })


            });
      
          
          })


        }
      });
       }
      });


    }

    if(vpcname == 'SG' && cloundenv == 'azure'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["name"]["value"];
        console.log(stackname);
               
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCSecurityGRoup&q=refStack=="+aid).subscribe(
           (sgresponse: any) => {
              if(sgresponse["data"].length>0){
                var sg_id = sgresponse["data"][0]["id"];
                var sg_name = sgresponse["data"][0]["name"]["value"];
                console.log('sgresponse',sgresponse["data"])
                this.dataService.getData('http://localhost:3001/deployment?resourcegroup='+stackname).subscribe((sgresponse2: any) => {
                  console.log('security group response',sgresponse2);
                  el.style.color = 'yellow';

                  console.log('security group status',sgresponse2[1]["properties"]["provisioningState"]);
                  var sgpostObj = {
                    "status":{
                      "type": "Property",
                      "value": sgresponse2[0]["properties"]["provisioningState"]
                    },
                    "resourceStatus":{
                      "type": "Property",
                      "value": "available"
                    },
        
                  }
                  this.dataService.patchData(sgpostObj, this.dataService.NODE_API + '/api/service/entities/'+sg_id+'/IaCSecurityGRoup').subscribe((sgresponse7: any) => {
                    console.log('first Patch response',sgresponse7);



                    this.dataService.getData('http://localhost:3001/nsg?resourcegroup='+stackname+'&nsgname='+sg_name).subscribe((sgresponse3: any) => {
                      console.log('security group second api',sgresponse3);
                      console.log(sgresponse3["defaultSecurityRules"][0]["provisioningState"])
                      var inboudstatus = sgresponse3["defaultSecurityRules"][0]["provisioningState"];

                      this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInboundOutboundRule&q=refStack=="+aid).subscribe(
                        (in_response1: any) => {
                           if(in_response1["data"].length>0){
                            var inbound_id = in_response1["data"][0]["id"];
                            var inpostObj = {
                              "status":{
                                "type": "Property",
                                "value": inboudstatus
                              },
                              "resourceStatus":{
                                "type": "Property",
                                "value": "available"
                              },
                  
                            }
                            this.dataService.patchData(inpostObj, this.dataService.NODE_API + '/api/service/entities/'+inbound_id+'/IaCInboundOutboundRule').subscribe((sgresponse7: any) => {
                              console.log('second Patch response',sgresponse7);
                              el.style.color = 'green';
                           
                            })
          

                           }
                          
                          });

                     
                    
                    });


                  })
                  

                
                })


              }
            });


       }
      });


    }

    if(vpcname == 'IP' && cloundenv == 'azure'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["name"]["value"];
        console.log(stackname);
                 
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacPublicaddress&q=refStack=="+aid).subscribe(
              (ipresponse: any) => {
                if(ipresponse["data"].length>0){
                  var public_id = ipresponse["data"][0]["id"];
                  var public_name = ipresponse["data"][0]["publicipname"]["value"];
                  console.log(public_name);
                  console.log('Iac Public address',ipresponse["data"]);

                  this.dataService.getData('http://localhost:3002/deployment?resourcegroup='+stackname).subscribe((ipresponse2: any) => {
                    console.log('public address response',ipresponse2);
                    el.style.color = 'yellow';
                    console.log(ipresponse2[1]["properties"]["provisioningState"]);
                    var ippostObj = {
                      "status":{
                        "type": "Property",
                        "value": ipresponse2[1]["properties"]["provisioningState"]
                      },
                      "resourceStatus":{
                        "type": "Property",
                        "value": "available"
                      },
          
                    }
                    this.dataService.patchData(ippostObj, this.dataService.NODE_API + '/api/service/entities/'+public_id+'/IacPublicaddress').subscribe((ipresponse7: any) => {
                      console.log('first Patch response',ipresponse7);

                      
                  this.dataService.getData('http://localhost:3002/publicip?resourcegroup='+stackname+'&publicipname='+public_name).subscribe((ipresponse3: any) => {
                    console.log('public address response2',ipresponse3);

                    console.log(ipresponse3["provisioningState"]);

                    var ip2_postObj = {
                      "status":{
                        "type": "Property",
                        "value": ipresponse3["provisioningState"]
                      },
                      "resourceStatus":{
                        "type": "Property",
                        "value": "available"
                      },
          
                    }
                    this.dataService.patchData(ip2_postObj, this.dataService.NODE_API + '/api/service/entities/'+public_id+'/IacPublicaddress').subscribe((ipresponse8: any) => {
                      console.log('Second Patch response',ipresponse8);});
                      el.style.color = 'green';


                    });



                    });



                  
                  });

                 }
                });


        }
     });

    }

    if(vpcname == 'NIC' && cloundenv == 'azure'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('Stack response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["name"]["value"];
        console.log(stackname);
                    
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IacNetworkinterface&q=refStack=="+aid).subscribe(
          (nicresponse: any) => {
            if(nicresponse["data"].length>0){
              var nic_id = nicresponse["data"][0]["id"]
              var nic_name =  nicresponse["data"][0]["name"]["value"]
              console.log("nic name======>",nic_name);
              console.log('network ',nicresponse["data"]);
              this.dataService.getData('http://localhost:3003/deployment?resourcegroup='+stackname).subscribe((nicresponse2: any) => {
                console.log('Network Interface response',nicresponse2);
                console.log(nicresponse2[1]["properties"]["provisioningState"])
                el.style.color = 'yellow';
                var nicpostObj = {
                  "status":{
                    "type": "Property",
                    "value":nicresponse2[1]["properties"]["provisioningState"]
                  },
                  "resourceStatus":{
                    "type": "Property",
                    "value": "available"
                  },
      
                }
                this.dataService.patchData(nicpostObj, this.dataService.NODE_API + '/api/service/entities/'+nic_id+'/IacNetworkinterface').subscribe((nicresponse7: any) => {
                  console.log('first Patch response',nicresponse7);

                       
                  this.dataService.getData('http://localhost:3003/nic?resourcegroup='+stackname+'&nicname='+nic_name).subscribe((nicresponse3: any) => {
                    console.log('network interface response2',nicresponse3);
                    console.log(nicresponse3["ipConfigurations"][0]["provisioningState"])
                    var nic2postObj = {
                      "status":{
                        "type": "Property",
                        "value":nicresponse3["ipConfigurations"][0]["provisioningState"]
                      },
                      "resourceStatus":{
                        "type": "Property",
                        "value": "available"
                      },
          
                    }
                    this.dataService.patchData(nic2postObj, this.dataService.NODE_API + '/api/service/entities/'+nic_id+'/IacNetworkinterface').subscribe((nicresponse8: any) => {
                      console.log('second Patch response',nicresponse8);
                      el.style.color = 'green';
                    })


                  });

                })

              });

            }
          });


        }
     });

    }

    if(vpcname == 'INS' && cloundenv == 'azure'){
      var stacknumber:any;
      var stackname:any;
      var compainedName:any;
      var stackdetail_vpcname:any;
      const el:any = document.getElementById(aid);
      
    this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCStack&id="+aid).subscribe(
      (response1: any) => {
       if(response1["data"].length>0){
        console.log('response1["data"]',response1["data"]);
        stackname =  response1["data"][0]["name"]["value"];
        console.log(stackname);
                     
        this.dataService.getData(this.dataService.NODE_API + "/api/service/entities?type=IaCInstance&q=refStack=="+aid).subscribe(
          (insresponse: any) => {
            if(insresponse["data"].length>0){
              console.log('instance status',insresponse["data"])
              var ins_id = insresponse["data"][0]["id"]
              var ins_name = insresponse["data"][0]["name"]["value"]

              console.log('instance=======>',ins_name);
              this.dataService.getData('http://localhost:3004/deployment?resourcegroup='+stackname).subscribe((insresponse2: any) => {
                console.log('Instance response',insresponse2);
                console.log(insresponse2[1]["properties"]["provisioningState"]);
                el.style.color = 'yellow';
                var inspostObj = {
                  "status":{
                    "type": "Property",
                    "value":insresponse2[1]["properties"]["provisioningState"]
                  },
                 
      
                }
                this.dataService.patchData(inspostObj, this.dataService.NODE_API + '/api/service/entities/'+ins_id+'/IaCInstance').subscribe((nicresponse7: any) => {
                  console.log('first Patch response',nicresponse7);
                         
                  this.dataService.getData('http://localhost:3004/vm?resourcegroup='+stackname+'&vmname='+ins_name).subscribe((insresponse3: any) => {
                    console.log('Instance response2',insresponse3);
                    console.log(insresponse3["powerState"])
                    console.log(insresponse3["provisioningState"])
                    var ins2postObj = {
                      "status":{
                        "type": "Property",
                        "value":insresponse3["provisioningState"]
                      },
                      "resourceStatus":{
                        "type": "Property",
                        "value": insresponse3["powerState"]
                      },
          
                    }
                    this.dataService.patchData(ins2postObj, this.dataService.NODE_API + '/api/service/entities/'+ins_id+'/IaCInstance').subscribe((insresponse8: any) => {
                      console.log('second Patch response',insresponse8);
                      el.style.color = 'green';
                    })


                  })
                
                
                })
              
              })


            }
          });

        }
     });

    }
   
   



  }


  viewApiValues(api_id:any){
    console.log(api_id);

  }

  editIacDetails(eid:any,estackname:any){
    console.log(eid);
    this.router.navigateByUrl('/iac-stack', { state: { eidIac:eid,editname:estackname } });
  }
  

 
}
