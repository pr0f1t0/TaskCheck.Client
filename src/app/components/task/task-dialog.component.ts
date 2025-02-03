import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'; 
import { AddTaskRequest } from '../../models/requests/AddTaskRequest';
import { CategoryDto } from '../../models/dto/CategoryDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHanlderService } from '../../services/error-hanlder/error-hanlder.service';
import { CUSTOM_DATE_FORMATS } from '../../shared/CustomDateFormat';


@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule  
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
    MatDatepickerModule,
    MatNativeDateModule
  ],
  styleUrls: ['./task-dialog.component.scss'],
  template: `
    <h2 mat-dialog-title>Add New Task</h2>
    
    <mat-dialog-content class="dialog-content">
      <form [formGroup]="taskForm">

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Enter task title">
          <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter task description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Due Date</mat-label>
          <input matInput [matDatepicker]="dueDatePicker" formControlName="dueDate" [min]="minDate">
          <mat-datepicker-toggle matSuffix [for]="dueDatePicker"></mat-datepicker-toggle>
          <mat-datepicker #dueDatePicker></mat-datepicker>
          <mat-error *ngIf="taskForm.get('dueDate')?.hasError('required')">
            Due date is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Category</mat-label>
          <mat-select formControlName="categoryId">
            <mat-option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="taskForm.get('categoryId')?.hasError('required')">
            Category is required
          </mat-error>
        </mat-form-field>


        <div class="checkbox-group">
          <mat-checkbox formControlName="important">Important</mat-checkbox>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!taskForm.valid">
        <span>Create Task</span>
      </button>
    </mat-dialog-actions>
  `
})
export class TaskDialogComponent {
  categories: CategoryDto[] = []; 
  taskForm: FormGroup; 
  minDate: Date = new Date();
  apiService = inject(ApiService)
  errorHandler = inject(ErrorHanlderService)

  ngOnInit(): void {
    this.loadCategories();
  }

  constructor(
    private readonly dialogRef: MatDialogRef<TaskDialogComponent>,
    private readonly fb: FormBuilder
  ) {

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
      completed: [false],
      important: [false],
      categoryId: [null, Validators.required]  
    });
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

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      const task: AddTaskRequest = {
        title: formValue.title,
        description: formValue.description,
        categoryId: formValue.categoryId, 
        dueDate: formValue.dueDate,
        important: formValue.important
      };

      this.dialogRef.close(task);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
