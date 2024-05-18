import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
    imports: [
    ],
    exports: [
        CommonModule,
        ButtonModule,
        CardModule,
        ProgressSpinnerModule
    ]
  })
  export class CommomComponentModule { }