import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  action: string = 'Agregar';
  userForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        password: new FormControl('', [Validators.required]),
        repeatPassword: new FormControl('', []),
      },
      [this.checkPassword]
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = parseInt(params.iduser);
      if (id) {
        this.action = 'Actualizar';
        try {
          const response = await this.usersService.getById(id);
          if (!response.error) {
            this.userForm = new FormGroup(
              {
                id: new FormControl(response?.id, []),
                firstName: new FormControl(response?.first_name, [
                  Validators.required,
                  Validators.minLength(4)
                ]),
                lastName: new FormControl(response?.last_name, [
                  Validators.required,
                  Validators.minLength(4)
                ]),
                username: new FormControl(response?.username, [
                  Validators.required,
                ]),
                email: new FormControl(response?.email, [
                  Validators.required,
                  Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
                ]),
                password: new FormControl('', []),
                repeatPassword: new FormControl('', []),
              },
              []
            );
          }
        } catch (err) {
          alert(err);
        }
      }
    });
  }

  async getDataForm(): Promise<void> {
    let user: User = {
      id: this.userForm.value.id,
      first_name: this.userForm.value.firstName,
      last_name: this.userForm.value.lastName,
      email: this.userForm.value.email,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
    };

    if (user.id) {
      try {
        let response = await this.usersService.update(user);
        if (!response.error) {
          this.router.navigate(['/home']);
        } else {
          alert('No se pudo actualizar el usuario');
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          this.router.navigate(['/home']);
        } else {
          alert('No se pudo agregar el usuario');
        }
      } catch (err) {
        alert(err);
      }
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if (
      this.userForm.get(pControlName)?.hasError(pError) &&
      this.userForm.get(pControlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkPassword(pForm: AbstractControl): any {
    const password: string = pForm.get('password')?.value;
    const repeatPassword: string = pForm.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      return { 'checkpassword': true };
    } else {
      return null;
    }
  }
}
