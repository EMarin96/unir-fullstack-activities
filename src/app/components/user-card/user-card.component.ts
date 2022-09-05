import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() myUser: User | any;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
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
          });
        }
      }
    });
  }

}
