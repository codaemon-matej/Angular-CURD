import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { MatInputModule, MatSelectModule, MatDatepickerModule, NativeDateModule, MatTableModule, MatIconModule, MatButtonModule, MatListModule, MatCardModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [UserCreateComponent],
  imports: [
    CommonModule,
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    NativeDateModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatListModule, 
    MatCardModule, 
    MatToolbarModule,
    MatTabsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAY7nPSyYIHHJyDU3dBri9qX4KUipf3DTU'
    })
  ]
})
export class UserCreateModule { }

