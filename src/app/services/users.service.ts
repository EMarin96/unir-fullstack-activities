import { getLocaleCurrencyCode } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = 'https://peticiones.online/api/users/';
  constructor(private httpClient: HttpClient) { }

  getAll(pPage: string = ""): Promise<any> {
    let queryParams: string = pPage !== "" ? `?page=${pPage}` : pPage;  
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${queryParams}`));
  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`));
  }

  create(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(`${this.baseUrl}`,pUser));
  }

  update(pUser: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${pUser.id}`, pUser));
  }

  delete(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`));
  }
}


