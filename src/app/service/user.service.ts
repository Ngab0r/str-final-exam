import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/users';
  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all users from the database.
   * @returns on observable with all users.
   */
  // getAll(): Observable<User[]> {
  getAll(): void {

    // return this.http.get<User[]>(`${this.endpoint}`);

    this.http.get<User[]>(`${this.endpoint}`).subscribe(
      user => this.list$.next(user)
    );
  }

  /**
   * Get a specified user from the database by id.
   * @param id {number} user id.
   * @returns an observable with a user object.
   */
  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  /**
   * Delete a user from the database.
   * The method is: this.http.delete
   */
  remove(user: User): void {
    this.http.delete<User>(
      (`${this.endpoint}/${user.id}`)
    ).subscribe(
      () => this.getAll()
    );
  }


  /**
   * Create a user in the database.
   * The method is: this.http.post
   */
  create(user: User): void {
    this.http.post<User>(
      `${this.endpoint}`,
      user
    ).subscribe(
      () => this.getAll()
    );
  }

  update(user: User): void {
    this.http.patch<User>(
      `${this.endpoint}/${user.id}`,
      user
    ).subscribe(() => this.getAll());
  }


  /**
   * Update a user in the database.
   * The method is: this.http.patch
   */

}
