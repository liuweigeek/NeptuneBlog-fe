import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthorityService } from '../service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly authHeader = 'Authorization';

    private readonly ignoreUrls: string[] = [
        '/user/user/authentication',
        '/user/user/register'
    ];

    constructor(private auth: AuthorityService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const ignoreUrl of this.ignoreUrls) {
            if (req.url.endsWith(ignoreUrl)) {
                return next.handle(req);
            }
        }
        const authToken = this.auth.getAuthorizationToken();
        if (!authToken) {
            this.router.navigate(['/authentication/signIn']);
            return;
        }
        const authReq = req.clone({
            headers: req.headers.set(this.authHeader, authToken)
        });
        return next.handle(authReq).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    if (event.body.status && event.body.status === 10) {
                        this.router.navigate(['/authentication/signIn']);
                        return;
                    }
                }
                return event;
            })
        );
    }

}
