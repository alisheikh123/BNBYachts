import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorService {

  constructor() { }

  handleError(error : Error) {
    let errorMessage = '';
    if (error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.stack}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
