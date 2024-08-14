import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) { }

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      switch (selected[i].data) {
        // Permissão em Molde---------------------------------
        case 'moldeCriar':
          console.log('existe atendimento');
          permissao[0].permission.create = true;
          break;
        case 'moldeVisualizar':
          permissao[0].permission.read = true;
          console.log(permissao[0].permission.read)
          break;
        case 'moldeEditar':
          permissao[0].permission.update = true;
          break;
        case 'moldeStatus':
          permissao[0].permission.status = true;
          break;
        case 'moldeExcluir':
          permissao[0].permission.delete = true;
          break;

        // Permissão em Maquina---------------------------------
       case 'maquinaCriar':
          console.log('existe atendimento');
          permissao[1].permission.create = true;
          break;
        case 'maquinaVisualizar':
          permissao[1].permission.read = true;
          break;
        case 'maquinaEditar':
          permissao[1].permission.update = true;
          break;
        case 'maquinaStatus':
          permissao[1].permission.status = true;
          break;
        case 'maquinaExcluir':
          permissao[1].permission.delete = true;
          break;

 
        case 'produtoCriar':
          console.log('existe atendimento');
          permissao[2].permission.create = true;
          break;
        case 'produtoVisualizar':
          permissao[2].permission.read = true;
          break;
        case 'produtoEditar':
          permissao[2].permission.update = true;
          break;
        case 'produtoStatus':
          permissao[2].permission.status = true;
          break;
        case 'produtoExcluir':
          permissao[2].permission.delete = true;
          break;

        case 'producaoCriar':
          console.log('existe atendimento');
          permissao[3].permission.create = true;
          break;
        case 'producaoVisualizar':
          permissao[3].permission.read = true;
          break;
        case 'producaoEditar':
          permissao[3].permission.update = true;
          break;
        case 'producaoStatus':
          permissao[3].permission.status = true;
          break;
        case 'producaoExcluir':
          permissao[3].permission.delete = true;
          break;
 
        case 'usuarioCriar':
          console.log('existe atendimento');
          permissao[4].permission.create = true;
          break;
        case 'usuarioVisualizar':
          permissao[4].permission.read = true;
          break;
        case 'usuarioEditar':
          permissao[4].permission.update = true;
          break;
        case 'usuarioStatus':
          permissao[4].permission.status = true;
          break;
        case 'usuarioExcluir':
          permissao[4].permission.delete = true;
          break;

          case 'relatoriosVisualizar':
            console.log('existe Relatorio');
            permissao[5].permission.read = true;
            break;

        case 'empresaCriar':
          console.log('existe atendimento');
          permissao[6].permission.create = true;
          break;
        case 'empresaVisualizar':
          permissao[6].permission.read = true;
          break;
        case 'empresaEditar':
          permissao[6].permission.update = true;
          break;
        case 'empresaStatus':
          permissao[6].permission.status = true;
          break;
        case 'empresaExcluir':
          permissao[6].permission.delete = true;
          break;



        // Permissão em Operador---------------------------------
        case 'operadorCriar':
          console.log('existe atendimento');
          permissao[7].permission.create = true;
          break;
        case 'operadorVisualizar':
          permissao[7].permission.read = true;
          break;
        case 'operadorEditar':
          permissao[7].permission.update = true;
          break;
        case 'operadorStatus':
          permissao[7].permission.status = true;
          break;
        case 'operadorExcluir':
          permissao[7].permission.delete = true;
          break; 
        // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'producao'

        // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'usuarios'

        // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'relatorios'

        // Adaptação para a entidade 'empresas'


        // Adaptação para a entidade 'operador'


      }
    }

  }
  carregarPermissoesTreeNode(permissao: any, selectedpermissao: any) {
    // Início de Permissao de Molde--------------------------------------------------------------
    if (permissao[0].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'moldeCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.read !== true) {
      console.log(permissao[0].permission.read)
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'moldeVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'moldeEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'moldeStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'moldeExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'molde') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Molde -------------------------------------------------------------------

    // Início de Permissao de Maquina--------------------------------------------------------------
 if (permissao[1].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquinaCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquinaVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquinaEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquinaStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquinaExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'maquina') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Maquina -------------------------------------------------------------------

    // Início de Permissao de Exames--------------------------------------------------------------
 
    if (permissao[2].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produtoExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.operador !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'produto') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Operador -------------------------------------------------------------------
 
    // Início de Permissao de Produto--------------------------------------------------------------
    if (permissao[3].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producaoCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producaoVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producaoEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producaoStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producaoExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'producao') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Produto -------------------------------------------------------------------
 
    // Início de Permissao de Usuarios--------------------------------------------------------------
    if (permissao[4].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarioCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarioVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarioEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarioStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarioExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[4].permission.create !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.status !== true &&
      permissao[4].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuario') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Usuarios -------------------------------------------------------------------
 
    // Início de Permissao de Relatórios------------------------------------------------
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatorioVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatorio') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
   
    
    // Fim permissao de Relatórios------------------------------------------------

    // Início de Permissao de Empresas--------------------------------------------------------------
    if (permissao[6].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresaExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresa') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Empresas -------------------------------------------------------------------




    if (permissao[7].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operadorCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operadorVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operadorEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operadorStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operadorExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'operador') {
          selectedpermissao.splice(index, 1);
        }
      });
    } 
    // Fim permissao de Producao -------------------------------------------------------------------

    // Verificar Node de Cadastro-------------------------------------------------------------------
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true &&
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true &&
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true &&
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.delete !== true &&
      permissao[5].permission.create !== true &&
      permissao[5].permission.read !== true &&
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true &&
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
  }
}