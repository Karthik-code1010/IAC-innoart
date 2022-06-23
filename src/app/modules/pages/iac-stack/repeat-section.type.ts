import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    
    <formly-field *ngFor="let field of field.fieldGroup" [field]="field"></formly-field>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */