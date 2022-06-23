import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';


@Component({
  selector: 'formly-field-custom-input',
  template: `
  <!-- <mat-form-field appearance="outline" fxFlex="100%" class="margin-space"> -->
  <!-- <mat-label>{{to.label}}</mat-label> -->
  <!-- <input [type]="to.type?to.type:'text'" matInput 
         [placeholder]="to.placeholder"> -->
         <!-- <div class="error_msg"  *ngIf="showError"><formly-validation-message [field]="field"></formly-validation-message></div> -->
<!-- </mat-form-field> -->

<mat-form-field appearance="outline"  style="width: 100% !important;" >
    <mat-label>{{to.label}}</mat-label>
    <input style="width: 100% !important;"  [type]="to.type?to.type:'text'"  [formControl]="formControl" [formlyAttributes]="field" matInput  placeholder="{{to.placeholder}}" >
   
  </mat-form-field> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


  

  `,
})

export class FormlyFieldCustomInput extends FieldType {
  //  [fxFlex]="to.fxFlex"
}