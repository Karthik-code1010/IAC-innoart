import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';

@Component({
  selector: 'app-addgroupname-dialog',
  templateUrl: './addgroupname-dialog.component.html',
  styleUrls: ['./addgroupname-dialog.component.scss']
})
export class AddgroupnameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataModule) {}

  ngOnInit(): void {}
  selected = 'Gross Salary';
  selected2= 'Lesser Than';

}
