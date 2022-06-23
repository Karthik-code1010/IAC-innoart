import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'column-dialog',
  templateUrl: 'column-dialog.html',
})
export class ColumnDialog {

  checkColumns:any = [];
  
  form: FormGroup;

  get columnFormArray() {
    return this.form.controls['columns'] as FormArray;
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ColumnDialog>,@Inject(MAT_DIALOG_DATA) data:any) {

    this.form = this.fb.group({
      columns: new FormArray([])
    });
    console.log("data",data);
    data['allColumns'].forEach((col:any) => {
      this.addCheckboxes(col.activeFlag)
      this.checkColumns.push(col);
    });
    // data['availableColumns'].forEach((aCol) => {
    //   this.addCheckboxes(false)
    //   this.checkColumns.push(aCol);
    // });
    // this.addCheckboxes();

  }
  private addCheckboxes(val:any) {
    this.columnFormArray.push(new FormControl(val));
  }

  submit() {
    var _this = this;
    this.checkColumns.forEach(function (value:any, i:any) {
      _this.checkColumns[i].activeFlag=_this.form.value.columns[i];
    });
    // const selectedColumnsIds = this.form.value.columns
    //   .map((checked, i) => checked ? this.checkColumns[i] : null)
    //   .filter(v => v !== null);
    this.dialogRef.close(_this.checkColumns);
  }


}