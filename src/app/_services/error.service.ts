import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap, filter} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter(event => event instanceof HttpResponse),
      tap((event: HttpResponse<any>) => {
        if (event.body['Note']||event.body['Error Message']) {

          let timerInterval
          Swal.fire({
            title: 'Api that i use is free, so you need to wait a little time',
            html: 'I will close in <b></b> milliseconds.',
            timer: 20000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b && Swal.getTimerLeft()) {

                    b.textContent = Swal.getTimerLeft().toString()
                  }
                }
              }, 100)
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          })
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
