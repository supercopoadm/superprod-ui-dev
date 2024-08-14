import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpresaListaComponent } from "./empresa-lista/empresa-lista/empresa-lista.component";
import { EmpresaCadastroComponent } from "./empresa-cadastro/empresa-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: EmpresaListaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['R_EMP'] }
    },
    {
        path: 'novo',
        component: EmpresaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['C_EMP'] }
    },
    {
        path: ':id',
        component: EmpresaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['U_EMP'] }
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
      exports: [ RouterModule ]

})

export class EmpresaRouting {}