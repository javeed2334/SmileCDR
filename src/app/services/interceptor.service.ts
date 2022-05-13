import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataShareService } from './data-share.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private dataShareService : DataShareService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now()
    return next.handle(req).pipe(
      finalize(() => {
        const elapsed = Date.now() - started;
        this.dataShareService.SharingData.next(elapsed);
      }))
  }
}
