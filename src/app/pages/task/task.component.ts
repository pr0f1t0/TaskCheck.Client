import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { ErrorHanlderService } from '../../services/error-hanlder/error-hanlder.service';
import { TaskDto } from '../../models/dto/TaskDto';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryDto } from '../../models/dto/CategoryDto';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task/task-dialog.component';
import { AddTaskRequest } from '../../models/requests/AddTaskRequest';
import { CategoryDialogComponent } from '../../components/category/category-dialog.component';
import { AddCategoryRequest } from '../../models/requests/AddCategoryRequest';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  apiService = inject(ApiService)
  router = inject(Router)
  errorHandler = inject(ErrorHanlderService)
  toastr = inject(ToastrService)
  dialog = inject(MatDialog)

  tasks: TaskDto[] = []
  visibleTasks: TaskDto[] = []
  categories: CategoryDto[] = []
  username: string = 'user'
  

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
    this.getUsername();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data
      },
      error: (httpError: HttpErrorResponse) => {
        this.errorHandler.handleError(httpError);
      }
    })
  }


  loadTasks(): void {
    this.apiService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.visibleTasks = data;
      },
      error: (httpError: HttpErrorResponse) => {
        this.errorHandler.handleError(httpError);
      }
    }
    );
  }

  getUsername(): void {
    this.apiService.getUserInfo().subscribe({
      next: (data) => {
        this.username = data.username;
      },
      error: (httpError: HttpErrorResponse) => {
        this.errorHandler.handleError(httpError);
      }
    })
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: AddTaskRequest | undefined) => {
      if (result) {
        this.apiService.addTask(result).subscribe({
          next: (data) => {
            this.tasks.push(data)
          },
          error: (httpError: HttpErrorResponse) => {
            this.errorHandler.handleError(httpError);
          }
        })
      }
    });
  }

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((result: AddCategoryRequest | undefined) => {
      if (result) {
        console.log(result)
        this.apiService.addCategory(result).subscribe({
          next: (data) => {
            console.log(data)
            this.categories.push(data);
            console.log(this.categories)
          },
          error: (httpError: HttpErrorResponse) => {
            this.errorHandler.handleError(httpError);
          }
        });
      }
    });
  }

  filterTasksByCategory(id: string) {
    this.visibleTasks = this.tasks.filter(t => t.categoryId == id)
  }

  filterTasksByCompleted(){
    this.visibleTasks = this.tasks.filter(t => t.completed)
  }

  showAllTasks() {
    this.visibleTasks = this.tasks
  }

  markTaskAsCompleted(taskId: string, taskDto: TaskDto){
    taskDto.completed = !taskDto.completed
    this.apiService.markAsCompleted(taskDto, taskId).subscribe({
      next: (data) => {
        const index = this.tasks.findIndex(t => t.id === data.id);
        if (index !== -1) {
          this.tasks[index] = data;
        }
      },
      error: (httpError: HttpErrorResponse) => {
        this.errorHandler.handleError(httpError);
      }
    })
  }

  deleteTask(taskId: string) {
    this.apiService.deleteTask(taskId).subscribe({
      next: () => {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
          this.tasks.splice(index, 1); 
          this.visibleTasks = this.tasks
        }
      },
      error: (httpErr: HttpErrorResponse) => {
        this.errorHandler.handleError(httpErr)
      }
    });
  }
  
  deleteCategory(categoryId: string) {
    this.apiService.deleteCategory(categoryId).subscribe({
      next: () => {
        const index = this.categories.findIndex(category => category.id === categoryId);
        if (index !== -1) {
          this.categories.splice(index, 1); 
        }
      },
      error: (httpErr: HttpErrorResponse) => {
        this.errorHandler.handleError(httpErr)
      }
    });
  }
}

