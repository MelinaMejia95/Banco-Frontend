import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConsultComponent } from './consult/consult.component';

const routes: Routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' },
  { path: 'consult', component: ConsultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [/* CanActivateSection, Permissions */]
})
export class AppRoutingModule { }
