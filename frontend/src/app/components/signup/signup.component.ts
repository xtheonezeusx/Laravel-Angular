import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = {
    name: null,
    email: null,
    password: null
  }

  constructor(
    private Token: TokenService,
    private Jarwis: JarwisService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponde(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponde(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
