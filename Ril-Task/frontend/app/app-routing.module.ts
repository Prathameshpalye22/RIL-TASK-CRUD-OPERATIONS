import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path :"add", component:AddComponent},
  {path:"delete",component:DeleteComponent},
  {path:"edit",component:EditComponent},
  {path:"success/:username",component:DashboardComponent, children:[
    {path:"",component:DashboardComponent}
  ]}  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 


