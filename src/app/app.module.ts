import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial.module';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyFieldCustomInput } from 'src/formly/formly-field-custom-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { InfrastructureComponent } from './modules/pages/infrastructure/infrastructure.component';
import { ColumnDialog } from './modules/pages/column-dialog/column-dialog';
import { LaunchInstanceComponent } from './modules/pages/launch-instance/launch-instance.component';
import { Subnet2Component } from './modules/pages/subnet2/subnet2.component';
import { IacStackComponent } from './modules/pages/iac-stack/iac-stack.component';
import { Instance2Component } from './modules/pages/instance2/instance2.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormlyFieldCustomSelect } from 'src/formly/formly-field-custom-select';
import { StackDetailsComponent } from './modules/pages/stack-details/stack-details.component';
import { AvailabilityZoneComponent } from './modules/pages/availability-zone/availability-zone.component';
import { RepeatTypeComponent } from './modules/pages/iac-stack/repeat-section.type';
import { FormsModule } from '@angular/forms';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    ColumnDialog,
  
    FormlyFieldCustomInput,
    FormlyFieldCustomSelect,
      InfrastructureComponent,
      LaunchInstanceComponent,
      Subnet2Component,
      IacStackComponent,
      Instance2Component,
      StackDetailsComponent,
      AvailabilityZoneComponent,
      RepeatTypeComponent
     
   

   
   
  ],
  imports: [
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    
    FlexLayoutModule,
    MatFormFieldModule ,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MeterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ 
      extras: { lazyRender: true },
     
      types: [
     
      { name: 'inno-input', component: FormlyFieldCustomInput},
      { name: 'inno-select', component: FormlyFieldCustomSelect},
      { name: 'repeat', component: RepeatTypeComponent },
     
    ],
      wrappers: [
       
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ], 
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
