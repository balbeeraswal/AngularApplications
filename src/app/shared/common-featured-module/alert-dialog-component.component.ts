import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog-component',
  templateUrl: './alert-dialog-component.component.html',
  styleUrls: ['./alert-dialog-component.component.css']
})
export class AlertDialogComponentComponent {
 constructor(
    public dialogRef: MatDialogRef<AlertDialogComponentComponent>,
      // @Inject(MAT_DIALOG_DATA) public data: { title: string; message1: string},
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string,message1: string,message2: string,message3: string,message4: string },
  ) {dialogRef.disableClose = true;}

  close() {
    this.dialogRef.close()
  }
}
