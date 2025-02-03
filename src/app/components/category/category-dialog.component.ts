import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddCategoryRequest } from '../../models/requests/AddCategoryRequest';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  styleUrls: ['./category-dialog.component.scss'],
  template: `
    <h2 mat-dialog-title>Add New Category</h2>
    
    <mat-dialog-content class="dialog-content">
      <form [formGroup]="categoryForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Category Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter category name">
          <mat-error *ngIf="categoryForm.get('name')?.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!categoryForm.valid">
        <span>Create Category</span>
      </button>
    </mat-dialog-actions>
  `
})
export class CategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<CategoryDialogComponent>,
    private readonly fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: AddCategoryRequest = {
        name: this.categoryForm.value.name
      };
      this.dialogRef.close(category);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}