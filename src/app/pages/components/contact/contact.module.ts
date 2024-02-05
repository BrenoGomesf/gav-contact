import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ListComponent } from './list/list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/guards/authconfig.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    NewComponent,
    EditComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class ContactModule { }
