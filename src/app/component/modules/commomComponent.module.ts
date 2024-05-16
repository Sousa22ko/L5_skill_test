import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@NgModule({
    imports: [
    ],
    exports: [
        CommonModule,
        ButtonModule,
        CardModule
    ]
  })
  export class CommomComponentModule { }