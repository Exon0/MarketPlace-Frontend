import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layoutB/app.layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { PickupDashboardComponent } from './PickupManagement/pickup-dashboard/pickup-dashboard.component';
import { PredictAdminComponent } from './PickupManagement/predict-admin/predict-admin.component';

const routes: Routes = [

  {
    path:'',component:AppLayoutComponent,
    children:[
      {path:'',component:UserDashboardComponent},
      {path:'userlist',component:UserListComponent},
      {path:'PickupDashboard',component:PickupDashboardComponent},
      {path:'predictCoco',component:PredictAdminComponent}
    ]
},]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
