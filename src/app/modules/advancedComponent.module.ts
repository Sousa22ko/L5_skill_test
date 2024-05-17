import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "primeng/accordion";
import { InputTextModule } from "primeng/inputtext";
import { PaginatorModule } from "primeng/paginator";
import { CommomComponentModule } from "./commomComponent.module";

@NgModule({
    imports: [
    ],
    exports: [
        CommomComponentModule,
        AccordionModule,
        InputTextModule,
        FormsModule,
        PaginatorModule
    ]
  })
  export class AdvancedComponentModule { }