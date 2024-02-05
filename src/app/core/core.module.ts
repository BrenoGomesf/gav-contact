import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { BreadTitleComponent } from './components/bread-title/bread-title.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  declarations: [
    NavBarComponent,
    HeroComponent,
    BreadTitleComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule
  ], exports: [
    NavBarComponent,
    HeroComponent,
    BreadTitleComponent,
    ContactFormComponent
  ]
})
export class CoreModule { }
