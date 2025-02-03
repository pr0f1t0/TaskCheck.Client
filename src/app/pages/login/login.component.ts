import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/auth/input/input.component";
import { LoginRequest } from '../../models/requests/LoginRequest';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ButtonComponent } from "../../components/auth/button/button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../../models/responses/LoginResponse';
import { ErrorHanlderService } from '../../services/error-hanlder/error-hanlder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [InputComponent, RouterLink, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: "",
    password: ""
  }

  apiService = inject(ApiService)
  router = inject(Router)
  errorHandler = inject(ErrorHanlderService)
  toastr = inject(ToastrService)

  onSubmit() {
    this.apiService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem("token", response.token)

        this.router.navigateByUrl("tasks")
      },
      error: (httpError: HttpErrorResponse) => {
        this.errorHandler.handleError(httpError)
      }
    })
  }
}
