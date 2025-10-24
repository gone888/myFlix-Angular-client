import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  standalone: false,
  templateUrl: './director-view.html',
  styleUrl: './director-view.scss',
})
export class DirectorView {
  constructor(
    public dialogRef: MatDialogRef<DirectorView>,
    @Inject(MAT_DIALOG_DATA) public director: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
