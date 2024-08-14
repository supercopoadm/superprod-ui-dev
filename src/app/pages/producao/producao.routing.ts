import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProducaoListaComponent } from "./producao-lista/producao-lista.component";
import { ProducaoCadastroComponent } from "./producao-cadastro/producao-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: ProducaoListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['R_PRODU']}
    },
    {
        path: 'novo',
        component: ProducaoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['C_PRODU']}
    },
    {
        path: ':id',
        component: ProducaoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['U_PRODU']}
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class ProducaoRouting {}