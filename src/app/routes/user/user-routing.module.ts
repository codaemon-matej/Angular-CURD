import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
  { path: 'userlist', component: UserComponent, data: { title: 'User List' } },
  { path: 'user-create', component: UserCreateComponent, data: { title: 'User Create' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
