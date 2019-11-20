import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserCreateService {
    // Define API  URL
    baseUrl = 'http://139.59.16.242:3000';

    constructor(private http: HttpClient) { }

    /*==========================================================
        Methods for consuming RESTful API
        ============================================================*/

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    getUsersByLimit(page: number, limit: number) {
        return this.http.get(this.baseUrl + `/users?page=${page}&limit=${limit}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    getUsers() {
        return this.http.get(this.baseUrl + '/users')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    addUserImage(User: any): Observable<Users> {
        return this.http.post<Users>(this.baseUrl + '/file/upload', User, this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    addUsers(User: any): Observable<Users> {
        return this.http.post<Users>(this.baseUrl + '/users', User, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    updateUser(id: string, User: any): Observable<Users> {
        return this.http.put<Users>(this.baseUrl + '/users/' + id, User, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getRoles() {
        return this.http.get(this.baseUrl + '/Roles')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getUser(id: string) {
        return this.http.get(this.baseUrl + '/users/' + id)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    // HttpClient API delete() method => Delete User
    deleteUsers(id: string) {
        return this.http.delete(this.baseUrl + '/users/' + id, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getCategories() {
        return this.http.get(this.baseUrl + '/categories')
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }


    // Error handling
    handleError(error: { error: { message: string; response_message: string; response_code: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {

            // Get client-side error
            errorMessage = error.error.message;
        } else {

            // Get server-side error
            errorMessage = `${error.error.response_code}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
