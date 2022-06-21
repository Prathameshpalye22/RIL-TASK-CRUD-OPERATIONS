import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errorMessage:any
  encoded:any
  decoded:any
  
  constructor(
    private _builder: FormBuilder, 
    private _service: UserService, 
    private _router: Router
    ) { }

    loginForm : FormGroup = this._builder.group({
      username:["",Validators.required], password:["",Validators.required]
    });
    
  
    ngOnInit(): void {
    }
    handleLogin(){
      let username = this.loginForm.controls['username'].value;
      let password = this.loginForm.controls['password'].value;
      this._service.login(username,password).subscribe({
        next : (data) => {
          this.encoded=window.btoa(data);
          //let encoded = window.btoa(text);
          console.log(this.encoded)

         //let decoded = window.atob(this.encoded);
         this.decoded=window.atob(this.encoded);
         console.log("decoded"+this.decoded.value)
  
          // this._router.navigate(['success', data.username, data.password])
          this._router.navigate(['success', username])
  
        },
        error:(err)=>{
          this.errorMessage = err.error.message;
          alert("Please enter correct Username or Password")
          this.loginForm.reset({});
        }
      })
    }
  }