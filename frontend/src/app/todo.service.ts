import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Bug 5: Incorrect API endpoint
  private apiUrl = 'http://localhost:5001/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(todo: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, todo, { headers });
  }

  updateTodo(id: number, todo: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     // Bug 6: Missing String Interpolation (Backticks) 
    return this.http.put<any>(this.apiUrl + '/' + id, todo, { headers });
  }

  deleteTodo(id: number): Observable<any> {
     // Bug 7: Missing String Interpolation (Backticks) 
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
