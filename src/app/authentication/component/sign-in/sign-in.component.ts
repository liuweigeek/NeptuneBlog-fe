import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { UserStoreService } from '../../../shared/service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private router: Router,
                private message: NzMessageService,
                private authenticationService: AuthenticationService,
                private userStoreService: UserStoreService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
        }

        this.authenticationService.signIn(this.validateForm.controls.username.value, this.validateForm.controls.password.value)
            .subscribe(next => {
                this.userStoreService.setLoginUser(next);
                this.router.navigate(['/']);
            }, error => {
                this.message.error(error.error.message || '登录失败');
            });
    }

}
