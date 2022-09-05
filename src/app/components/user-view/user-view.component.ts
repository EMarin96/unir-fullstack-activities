import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: User | any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = parseInt(params.iduser);
      try {
        let response = await this.usersService.getById(id);
        if (!response.error) {
          this.myUser = response;
        } else {
          alert(response.error);
        }
      } catch (err) {
        alert(err);
      }
    });
  }

  deleteUser(): void {
    Swal.fire({
      title: `¿Desea eliminar el usuario ${this.myUser.first_name}?`,
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      heightAuto: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.usersService.delete(this.myUser.id);
        if (response.id) {
          Swal.fire({
            title: 'Eliminado!',
            text: `El usuario ${this.myUser.first_name} fue eliminado`,
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6', 
            heightAuto: false
          }).then((result) => {
            if(result.isConfirmed) {
              this.router.navigate(['/home']);
            }
          })
        }
      }
    });
  }

}
