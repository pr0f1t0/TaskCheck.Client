import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHanlderService {
  toastr = inject(ToastrService)

  handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case HttpStatusCode.NotFound:
        this.toastr.error(error.error.message)
        break
      case HttpStatusCode.BadRequest:
        this.toastr.error(error.error.message)
        break
      case HttpStatusCode.InternalServerError:
        this.toastr.error("Server Error", "Error")
        break
      default:
        this.toastr.error("Unknown Error.", "Error")
        break
    }
  }
}
