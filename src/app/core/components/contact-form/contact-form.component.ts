import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { contactProps } from 'src/app/pages/model/contact.model';
import { ContactService } from 'src/app/pages/services/contact.service';
import { Utils } from 'src/app/shared/utils/utils';

type Action = 'new' | 'edit' 
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  
  form: FormGroup;
  url: string ="./assets/images/undefine.png";
  @Input('action')
  action: Action = 'new';
  @Input('id')
  id?: number  = 0;
  file?: File
  constructor(
    private fb: FormBuilder,
    private contactsService: ContactService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Utils.isValidEmail.bind(this)],
      telefone: ['', Utils.isValidPhone.bind(this)],
      foto: ['']
    })
   }
   
  ngOnInit(): void {
    this.validEdit()
  }


  validEdit(){
    if(this.action == 'edit' && this.id){
      this.getUser()
    }
  }

  fillForm(body: contactProps){
     this.form.get('nome')?.setValue(body.nome),
     this.form.get('email')?.setValue(body.email),
     this.form.get('telefone')?.setValue(body.telefone),
     this.form.get('foto')?.setValue(body.foto)
     this.url = body.foto
  }
  getUser(){
    this.getById(this.id).then((res) => {
      this.fillForm(res)
    }).catch((err) => {
      this.toast.success('Erro ao buscar o contato', 'Erro', {progressBar: true, closeButton: true})
    })
  }
  validForm(){
    const form = this.verificForm(this.form);
    if(form){
      const body = {
        "id" : this.id ?  this.id : 1,
        "nome":this.form.get('nome')?.value,
        "email": this.form.get('email')?.value,
        "telefone": this.form.get('telefone')?.value,
        "foto": this.form.get('foto')?.value,
        "dataCadastro": new Date(),
      }
      this.saveContact(body);
    }
  }

    saveContact(body: contactProps){
      if(this.action == 'new'){
        this.create(body).then((res) => {
          debugger
          this.clear();
        }).catch((err) => {
          this.toast.success('O contato  não foi  criado', 'Erro', {progressBar: true, closeButton: true})
        })
      }else {
        this.update(body).then((res) => {
          debugger
          this.clear();
        }).catch((err) => {
          this.toast.success('O contato  não foi  criado', 'Erro', {progressBar: true, closeButton: true})
        })
      }
    }

    clear(){
      this.file = undefined
      this.url = ""
      this.form.reset();
      this.homeContact()
      const message = this.action == 'edit' ? 'Contato atualizado' :'Contato criado'
      this.toast.success(message, 'Sucesso', {progressBar: true, closeButton: true})
    }
    homeContact(){
      this.router.navigate(['/contact']);
    }
    create(body: contactProps): Promise<any>{
      return new Promise<any>(async (resolve, reject) => {
        await this.contactsService.create(body).subscribe({
          next:(res:any) =>{
            resolve(res)
          }, error:(error:any) =>{
            reject(error)
          }
        })
      });
    };

    update(body: contactProps): Promise<any>{
      return new Promise<any>(async (resolve, reject) => {
        await this.contactsService.put(body).subscribe({
          next:(res:any) =>{
            resolve(res)
          }, error:(error:any) =>{
            reject(error)
          }
        })
      });
    }

    getById(id?: number): Promise<any>{
      return new Promise<any>(async (resolve, reject) => {
        await this.contactsService.getById(id).subscribe({
          next:(res:any) =>{
            resolve(res)
          }, error:(error:any) =>{
            reject(error)
          }
        })
      });
    }

     formatarData(data: Date): string {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são base 0 no JavaScript
      const ano = data.getFullYear();
    
      return `${dia}-${mes}-${ano}`;
    }

    verificForm(form?: FormGroup) {
      const formGroup = form as FormGroup;
      Object.keys(formGroup.controls).forEach(campo => {
        const controle:any = formGroup.get(campo);
        controle.markAsTouched();
      });
      if (!formGroup.valid) {
        return false;
      }
    return true;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload=(event:any) =>{
      this.url=event.target.result;
      this.form.get('foto')?.setValue(this.url);
    }
  }
  }



/**
 * "nome": "Jonas da silva brito",
   "email": "jonasdasilvab@mail.com",
   "telefone": "62 99999-8888",
   "foto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAA..........WBnSonQU/9k=",
   "dataCadastro": "2023-08-28"

 * 
 */