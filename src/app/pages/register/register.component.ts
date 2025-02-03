import { Component, inject} from '@angular/core';
import { InputComponent } from "../../components/auth/input/input.component";
import { RegisterRequest } from '../../models/requests/RegisterRequest';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ButtonComponent } from "../../components/auth/button/button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHanlderService } from '../../services/error-hanlder/error-hanlder.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [InputComponent, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegisterRequest = {
    email: "",
    password: "",
    username: ""
  }

    apiService = inject(ApiService)
    router = inject(Router)
    errorHandler = inject(ErrorHanlderService)
    toastr = inject(ToastrService)

    onSubmit() {
      this.apiService.register(this.registerRequest).subscribe({
        next: () => {
          this.toastr.success("Your account was created successfully", "Success")
          this.router.navigateByUrl("login")
        },
        error: (httpError: HttpErrorResponse) => {
          this.errorHandler.handleError(httpError)
        }
      })
    }

}
