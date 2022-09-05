import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  page: number = 0;
  totalPages: number = 0;
  users: User[] = [];
  constructor(private usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getAll();
    this.page = response.page;
    this.totalPages = response.total_pages;
    this.users = response.data;
  }

  async filterUsers(pPage: number): Promise<void> {
    let response = await this.usersService.getAll(pPage.toString());
    this.page = response.page;
    this.users = response.data;
  }
}
