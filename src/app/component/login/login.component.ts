
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
import sharing from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private share:ShareService) {}

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onlogin() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      const passwordValue = this.LoginForm.get('password')?.value;
      const email = this.LoginForm.get('email')?.value;
      localStorage.setItem('email',email)

      this.auth.login(this.LoginForm.value).subscribe({
        next: (res) => {
          alert(res.message);

          if (passwordValue === 'admin') {
            this.router.navigate(['admin/addservicecenter']);
          } else {
            
            
            this.router.navigate(['user/homepage']);
          }

          // this.LoginForm.reset();
        },
        error: (err) => {
          alert(err?.error.message);
        }
      });
    } else {
      ValidateForm.validateAllFormFileds(this.LoginForm);
      alert('Form is invalid');
    }
  }}
