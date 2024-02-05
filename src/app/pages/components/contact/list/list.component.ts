import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { contactProps } from 'src/app/pages/model/contact.model';
import { ContactService } from 'src/app/pages/services/contact.service';
import { SignInService } from 'src/app/pages/services/signin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  load: boolean = true;
  constructor(
    private contactService: ContactService,
    private toast : ToastrService,
    private router: Router
  ) { }

  data: contactProps[] = [];
  ngOnInit(): void {
    this.getData()
  }

  async getData(){
    this.data = []
    this.load =  true;
  await this.getContact().then((res) => {
    this.load =  false;
    if(res.length > 0) {
      this.data = res;
    }else{
      this.data = []
    }
  }).catch((err) => {
    this.load =  false;
  })
  }

  getContact(): Promise<contactProps[]>{
    return new Promise((resolve, reject) =>{
      return this.contactService.get().subscribe({
        next:(res:any) =>{
          resolve(res)
        }, error:(error:any) =>{
          reject(error)
        }
      })
    })
  }

    delete(id: number){
    this.deleteContact(id).then((res) => {
    this.toast.success(`Contato ${id} deletado`, 'Sucesso', {progressBar: true, closeButton: true})
    this.getData()
  }).catch((err) => {
    this.toast.error(`não foi possível concluir a sua solicitação`, 'Erro', {progressBar: true, closeButton: true})
    this.load =  false;
  })
  }
  deleteContact(id: number): Promise<any>{
    return new Promise(async (resolve, reject) =>{
      await this.contactService.delete(id).subscribe({
        next:(res:any) =>{
          debugger
          resolve(res)
        }, error:(error:any) =>{
          debugger
          reject(error)
        }
      })
    })
  }
  navigate(url: string, id?: number) {
    const isId = id ? `/edit/${id}` : ''
    return this.router.navigateByUrl(`${url}${isId}`);
  }
}
