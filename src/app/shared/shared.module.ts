import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMsgComponent } from './components/input-error-msg/input-error-msg.component';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';



@NgModule({
  declarations: [
    InputErrorMsgComponent,
    SpinnerLoadingComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    InputErrorMsgComponent,
    SpinnerLoadingComponent
  ]
})
export class SharedModule { }
