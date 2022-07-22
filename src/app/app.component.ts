import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <form [formGroup]="form">
      <input type="checkbox" formControlName="published"> Published
      <div *ngIf="form.controls.published.value">

      <input placeholder="Username"  #user>
      <input placeholder="Password" #pwd>
      <button (click)="addCreds(user.value,pwd.value)">Add</button>
        <h2>Credentials</h2>
        

        <div formArrayName="credentials" *ngFor="let creds of form.controls.credentials?.value; let i = index">
          <ng-container [formGroupName]="i">
            {{creds.username}}
            {{creds.password}}
          </ng-container>
        </div>

      </div>
    </form>
  `,
})
export class AppComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }

  addCreds(user, pwd) {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(
      this.fb.group({
        username: user,
        password: pwd,
      })
    );
  }
}
