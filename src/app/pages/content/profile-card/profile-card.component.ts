import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Common, Form, User } from '../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../../core/services/custom-validator.service';
import { PasswordUtil } from '../../../shared/utils/password.util';

type Controls = keyof User.IProfileChangeEvent;

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent implements OnChanges {

    @Input() profile: User.IProfile;

    @Output() changeProfile = new EventEmitter<User.IProfileChangeEvent>();
    @Output() logout = new EventEmitter<void>();

    isViewMode = true;
    form: FormGroup;
    passwordPlaceholder = PasswordUtil.randomPassword();

    get FC(): Form.FormControls<Controls> {
        return this.form.controls as Form.FormControls<Controls>;
    }

    constructor(
        private FB: FormBuilder,
        private VALIDATOR: CustomValidatorService
    ) {}

    ngOnChanges(sc: Common.EcoLineSimpleChanges<this>) {
        const { profile } = sc;
        if (profile && profile.currentValue) {
            this.isViewMode = true;
        }
    }

    initForm(): void {
        this.form = this.FB.group({
            email: [this.profile.email, [Validators.required, Validators.email]],
            phone: [this.profile.phone, Validators.required],
            password: [this.passwordPlaceholder, [Validators.minLength(8), this.VALIDATOR.Password]]
        });
    }

    changeViewMode(): void {
        this.isViewMode = !this.isViewMode;
        if (!this.isViewMode) {
            this.initForm();
        }
    }

    onSubmit(): void {
        if (this.form.invalid) { return; }

        const dataForSave = this.form.value;

        if (this.passwordPlaceholder === dataForSave.password) {
            delete dataForSave.password;
        }

        this.changeProfile.emit(dataForSave);
    }

    onLogout() {
        this.logout.emit();
    }
}
