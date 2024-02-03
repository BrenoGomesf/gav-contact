import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'src/app/core/services/cookie.service';
import { SignInProps } from 'src/app/pages/model/signIn.interface';
import { SignInService } from 'src/app/pages/services/signin.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    private fb: FormBuilder,
   private signInService: SignInService,
   private cookieService: CookieService,
   private router: Router,
   private toast : ToastrService
  ) { 
    this.signinForm = this.fb.group({
      email: ['', Utils.isValidEmail.bind(this)],
      password: ['',  Validators.minLength(5)]
    })
  }
  ngOnInit(): void {
  }

  sendLogin(){
    const form = this.signinForm.valid
    if(form){
      this.getAuth()
    } 
  }
  //
  //gavtech@mail.com
  //gavtech123

  async getAuth(){
    try {
      await this.authService(this.signinForm.value)
      .then((res: any) =>{
        this.cookieService.setCookie('session', res.token, res.expirationDate)
        this.router.navigate(['/'] ,);
        this.toast.success('Login efetuado', 'Sucesso', {progressBar: true, closeButton: true})
      })
      .catch((res: any) =>{
        this.toast.error('Houve um error na solicitação', 'Aviso', {progressBar: true, closeButton: true})
      })
    } catch (error) {
      this.toast.error('Houve um error na solicitação', 'Aviso', {progressBar: true, closeButton: true})
    }
  }
  authService(auth: SignInProps): Promise<any>{
    return new Promise((resolve, reject) =>{
      return this.signInService.singIn(auth).subscribe({
        next:(res:any) =>{
          resolve(res)
        }, error:(error:any) =>{
          reject(error)
        }
      })
    })
  }
}
