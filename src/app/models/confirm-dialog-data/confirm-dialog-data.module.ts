import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ConfirmDialogDataModule {
  title!: string;
  message!: string;
  confirmCaption!: string;
  cancelCaption!: string;
 }
