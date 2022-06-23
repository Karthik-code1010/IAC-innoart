
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-custom-select',
  template: `
    <mat-form-field appearance="outline" style="width: 100% !important;">
              <mat-label>{{to.label}}</mat-label>
            
              <mat-select [formControl]="formControl" [formlyAttributes]="field">
               
                <mat-option *ngFor="let food of to.options" [value]="food.value">
                {{food.label}}
                </mat-option>
                <!-- <mat-option value="Stack1">Stack1</mat-option>
                <mat-option value="Stack1">Stack1</mat-option> -->
                <!-- <mat-option *ngFor="let lC of to.options" 
                [value]="lC.label">
                      {{lC.value}}
                    </mat-option> -->
         
              </mat-select>
             
            </mat-form-field>


  `,
})
export class FormlyFieldCustomSelect extends FieldType {
}