import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";

import {
  MatButtonModule, MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [ModalComponent],
  imports: [
  	FormsModule,
  	ReactiveFormsModule,
  	MatSnackBarModule,
  	MatButtonModule,
  	MatInputModule,
  	CommonModule
  ],
  exports: [
    ModalComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ModalModule { }
