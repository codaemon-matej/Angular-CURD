import { Component } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="matero-user-panel p-y-16 b-b-1"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <img
        class="matero-user-panel-avatar m-b-8 r-full"
        src="assets/images/avatar.jpg"
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name m-t-0 m-b-8 f-w-400">Admin</h4>
    </div>
  `,
})
export class UserPanelComponent {}
