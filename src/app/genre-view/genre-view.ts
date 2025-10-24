import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  standalone: false,
  templateUrl: './genre-view.html',
  styleUrl: './genre-view.scss',
})
export class GenreView {
  constructor(
    public dialogRef: MatDialogRef<GenreView>,
    @Inject(MAT_DIALOG_DATA) public genre: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
