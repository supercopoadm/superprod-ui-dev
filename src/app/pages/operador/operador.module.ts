import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { OperadorCadastroComponent } from "./operador-cadastro/operador-cadastro.component";
import { OperadorListaComponent } from "./operador-lista/operador-lista.component";
import { OperadorRouting } from "./operador.routing";





@NgModule({
declarations: [
    OperadorListaComponent,
    OperadorCadastroComponent

],
imports: [
    PrimeNgModule,
    SharedModule,
    OperadorRouting
]
})


export class OperadorModule {}