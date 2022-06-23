import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityZoneComponent } from './modules/pages/availability-zone/availability-zone.component';
import { IacStackComponent } from './modules/pages/iac-stack/iac-stack.component';
import { InfrastructureComponent } from './modules/pages/infrastructure/infrastructure.component';
import { Instance2Component } from './modules/pages/instance2/instance2.component';
import { LaunchInstanceComponent } from './modules/pages/launch-instance/launch-instance.component';
import { Subnet2Component } from './modules/pages/subnet2/subnet2.component';


const routes: Routes = [
//InfrastructureComponent 
{path:"", component: InfrastructureComponent },
{path:"infrastructure", component: InfrastructureComponent }, //LaunchInstanceComponent
{path:"launsh-instance", component: LaunchInstanceComponent },  //Subnet2Component
{path:"subnet2", component: Subnet2Component },  //IacStackComponent 
{path:"iac-stack", component: IacStackComponent  },  //Instance2Component
{path:"instance2", component: Instance2Component }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
