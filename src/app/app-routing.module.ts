import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './view/main-view/main-view.component';
import { EditViewComponent } from './view/edit-view/edit-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
  },
  {
    path: ':_id',
    component: EditViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
