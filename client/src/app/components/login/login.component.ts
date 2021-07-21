import { Component, OnInit } from '@angular/core';
import { LoginservicesService } from 'src/app/services/loginservices.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginServicesService:LoginservicesService, private location:Location, private router:Router) { }

  usuario = {
    user : null,
    pass : null
  }
  isDisabled:boolean=true
  public sessionStorage=sessionStorage

  ngOnInit(): void {
    if(this.sessionStorage.getItem('user')){
      this.redirectToVeReportes()
    }
  }

  login(){
    if(this.usuario.user && this.usuario.pass){
      this.loginServicesService.login(this.usuario).subscribe(
        res=>{
          if(res){
            sessionStorage.setItem('user',this.usuario.user)
            this.isDisabled=true
            this.redirectToVeReportes()
          }
          else{
            this.isDisabled=false
          }
        },
        err=>console.error(err)
      )
    }
    else{
      this.isDisabled=false
    }
  }
  redirectToVeReportes(){
    this.location.replaceState('/');
    this.router.navigate(['/vereportes'])
  }
}
