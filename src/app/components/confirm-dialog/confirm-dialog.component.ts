import { Component } from '@angular/core';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styles: [`
  .md-dialog-container {
                      position: fixed !important;
                      left: 20%;
                      top: 0%;
                      background-color: white;
                      z-index: 100000;
}`]
})
export class ConfirmDialogComponent {}
