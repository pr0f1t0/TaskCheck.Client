import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/requests/LoginRequest';
import { RegisterRequest } from '../../models/requests/RegisterRequest'
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/responses/LoginResponse';
import { UserInfoResponse } from '../../models/responses/UserInfoResponse';
import { AddTaskRequest } from '../../models/requests/AddTaskRequest';
import { TaskDto } from '../../models/dto/TaskDto';
import { AddCategoryRequest } from '../../models/requests/AddCategoryRequest';
import { CategoryDto } from '../../models/dto/CategoryDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.API_BASE_URL 

  httpClient = inject(HttpClient)

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
  }

  register(registerRequest: RegisterRequest): Observable<void>{
    return this.httpClient.post<void>(`${this.apiUrl}/register`, registerRequest)
  }

  getTasks(): Observable<TaskDto[]>{
    return this.httpClient.get<TaskDto[]>(`${this.apiUrl}/tasks`)
  }

  getCategories(): Observable<CategoryDto[]>{
    return this.httpClient.get<CategoryDto[]>(`${this.apiUrl}/categories`)
  }

  getUserInfo(): Observable<UserInfoResponse>{
    return this.httpClient.get<UserInfoResponse>(`${this.apiUrl}/users/me`)
  }

  addTask(addTaskRequest: AddTaskRequest): Observable<TaskDto> {
    return this.httpClient.post<TaskDto>(`${this.apiUrl}/tasks`, addTaskRequest)
  }

  addCategory(addCategoryRequest: AddCategoryRequest): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(`${this.apiUrl}/categories`, addCategoryRequest)
  }

  markAsCompleted(taskDto: TaskDto, taskId: string): Observable<TaskDto> {
    return this.httpClient.patch<TaskDto>(`${this.apiUrl}/tasks/${taskId}`, taskDto)
  }

  deleteTask(taskId: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/tasks/${taskId}`)
  }

  deleteCategory(categoryId: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/categories/${categoryId}`)
  }
}
