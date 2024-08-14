import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OperadorListaComponent } from "./operador-lista/operador-lista.component";
import { OperadorCadastroComponent } from "./operador-cadastro/operador-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: OperadorListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['R_OPE']}
    },
    {
        path: 'novo',
        component: OperadorCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['C_OPE']}
    },
    {
        path: ':id',
        component: OperadorCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['U_OPE']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class OperadorRouting { }