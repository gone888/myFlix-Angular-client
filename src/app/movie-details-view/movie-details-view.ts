import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-view',
  standalone: false,
  templateUrl: './movie-details-view.html',
  styleUrl: './movie-details-view.scss',
})
export class MovieDetailsView {
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsView>,
    @Inject(MAT_DIALOG_DATA) public movie: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
