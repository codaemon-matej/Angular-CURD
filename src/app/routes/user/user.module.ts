import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';

const COMPONENTS = [UserComponent, UserCreateComponent];
const COMPONENTS_DYNAMIC = [];


@NgModule({
  imports: [
  SharedModule, 
  UserRoutingModule,
  MatGoogleMapsAutocompleteModule,
  AgmCoreModule.forRoot(),],        

  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class UserModule { }
