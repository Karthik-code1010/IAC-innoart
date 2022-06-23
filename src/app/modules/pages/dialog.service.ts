import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogDataModule } from 'src/app/models/confirm-dialog-data/confirm-dialog-data.module';
import { AddgroupnameDialogComponent } from './addgroupname-dialog/addgroupname-dialog.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogDataModule): Observable<boolean> {
    return this.dialog
      .open(DialogboxComponent, {
        data,
        width: '1400px',
        disableClose: true,
      })
      .afterClosed();
  }

  addgroupDialog(data: ConfirmDialogDataModule): Observable<boolean> {
    return this.dialog
      .open(AddgroupnameDialogComponent, {
        data,
        width: '600px',
        disableClose: true,
      })
      .afterClosed();
  }
}
