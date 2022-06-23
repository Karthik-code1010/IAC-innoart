import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataModule) {}

  ngOnInit(): void {}
  selected = 'Gross Salary';
  selected2= 'Lesser Than';
}
