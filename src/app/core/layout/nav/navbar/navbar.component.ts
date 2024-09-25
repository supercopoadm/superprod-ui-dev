import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Empresas } from 'src/app/core/models/empresas.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { EmpresaService } from 'src/app/pages/empresas/empresa.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openTabs: {[key: string]: boolean} = {
    cadastro: false,
    relatorio: false,
    producao: false
  };
  
  sair: any;
  logo: any = '/assets/imagem/logo branca.svg';
  logoDescricao: any = '/assets/images/Logo original.svg';
  visibleSidebar;
  menu;
  env = environment;
  displayEmpresas: boolean;
  loading: boolean;
  empresas = [];
  usuario = new Usuarios();
  usuarios = new Array<Usuarios>();
  colsEmpresa = [];
  razaosocial: string;
  idEmpresaativa: number;
  empresa = new Empresas();

  constructor(
  public auth: AuthService,
  private errorHandler: ErrorHandlerService,
  private router: Router,
  private confirmation: ConfirmationService,
  private empresaService: EmpresaService,
  private messageService: MessageService,
  private usuarioService: UsuarioService,
    
  ) { }

  ngOnInit() {
    this.razaosocial = '...';

    this.colsEmpresa = [
      { field: 'id', header: 'ID', width: '80px' },
      { field: 'cpfoucnpj', header: 'Cnpj', width: '300px' },
      { field: 'razaosocial', header: 'Empresa', width: '250px' },
      { field: 'cidade', header: 'Cidade', width: '100px' },
      { field: 'uf', header: 'Estado', width: '100px' },
    ];
  }

  ngAfterViewInit() {
    if (this.auth.jwtPayload) {
      this.usuarioLogado();
    }
  }

  toggleTab(tab: string) {
    // Verifica se a aba clicada já está aberta
    const isTabAlreadyOpen = this.openTabs[tab];

    // Fecha todas as abas
    for (let key in this.openTabs) {
      this.openTabs[key] = false;
    }
    
    // Abre a aba clicada
    if (!isTabAlreadyOpen) {
      this.openTabs[tab] = true;
    }
  }

novoAccessToken() {
  this.auth.obterNovoAccessToken();
}
confirmarLogout(sair: any) {
  this.confirmation.confirm({
    message: `Tem certeza que deseja sair? `,
    accept: () => {
      this.logout(sair);
    }
  });
}
logout(sair: any) {
 this.auth.logout()
   .then(() => {
    this.router.navigate(['/login']);
   })
  .catch(erro => this.errorHandler.handle(erro));
 }

 showEmpresas() {
    this.menu = false;
    this.displayEmpresas = true;
    // colocar timeOut
    this.carregarEmpresasUsuario();
  }
  carregarEmpresasUsuario() {
    this.loading = true;
    return this.empresaService
      .listarEmpresaUsuarios()
      .then((obj) => {
        this.empresas = obj;
        this.loading = false;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loading = false;
      });
  }

  selecionaEmpresa(id: number) {
    this.usuarioService
      .empresaUsuario(id)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Empresa',
          detail: `selecionada com sucesso!`,
        });
        this.displayEmpresas = false;
        this.usuarioLogado();
        this.redirectTo('/');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  redirectTo(uri: string) {
    if (this.router.url === '/dashboard') {
      window.location.reload();
    }
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  usuarioLogado() {
    this.usuarioService
      .listarUsuarios()
      .then((obj) => {
        this.usuarios = obj;
        this.verificarUsuarioLogado(this.usuarios);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  verificarUsuarioLogado(usuarios: Array<Usuarios>) {
    for (const i of Object.keys(usuarios)) {
      if (this.auth.jwtPayload?.user_name === usuarios[i].login) {
        this.usuario = usuarios[i];
        this.usuarioService.buscarPorId(usuarios[i].id).then((obj2) => {
          this.razaosocial = obj2.empresaativa;
          this.idEmpresaativa = obj2.idEmpresaativa;
        });
      } else {

        this.razaosocial = null;
      }
    }
  }

}
