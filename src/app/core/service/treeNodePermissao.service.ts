import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeNodePermissoesService {
  treeNodePermissoes: TreeNode[];
  constructor() { }

  criarTreeNodePermissoes() {
    return [

      {
        label: 'Todas Permissões',
        selectable: true,
        data: 'cadastroNode',
        key: 'cadastroNode',

        children: [
          {
            label: 'Molde',
            data: 'molde',
            key: 'molde',
            children: [
              {
                label: 'Criar',
                data: 'moldeCriar',
                key: 'moldeCriar',
              },
              {
                label: 'Visualizar',
                data: 'moldeVisualizar',
                key: 'moldeVisualizar',
              },
              {
                label: 'Editar',
                data: 'moldeEditar',
                key: 'moldeEditar',
              },
              {
                label: 'Excluir',
                data: 'moldeExcluir',
                key: 'moldeExcluir',
              },
              {
                label: 'Status',
                data: 'moldeStatus',
                key: 'moldeStatus',
              },
            ],
          },
         {
            label: 'Maquina',
            data: 'maquina',
            key: 'maquina',
            children: [
              {
                label: 'Criar',
                data: 'maquinaCriar',
                key: 'maquinaCriar',
              },
              {
                label: 'Visualizar',
                data: 'maquinaVisualizar',
                key: 'maquinaVisualizar',
              },
              {
                label: 'Editar',
                data: 'maquinaEditar',
                key: 'maquinaEditar',
              },
              {
                label: 'Excluir',
                data: 'maquinaExcluir',
                key: 'maquinaExcluir',
              },
              {
                label: 'Status',
                data: 'maquinaStatus',
                key: 'maquinaStatus',
              },
            ],
          },
         
          {
            label: 'Produto',
            data: 'produto',
            key: 'produto',
            children: [
              {
                label: 'Criar',
                data: 'produtoCriar',
                key: 'produtoCriar',
              },
              {
                label: 'Visualizar',
                data: 'produtoVisualizar',
                key: 'produtoVisualizar',
              },
              {
                label: 'Editar',
                data: 'produtoEditar',
                key: 'produtoEditar',
              },
              {
                label: 'Excluir',
                data: 'produtoExcluir',
                key: 'produtoExcluir',
              },
              {
                label: 'Status',
                data: 'produtoStatus',
                key: 'produtoStatus',
              },
            ],
          },
         {
            label: 'Produção',
            data: 'producao',
            key: 'producao',
            children: [
              {
                label: 'Criar',
                data: 'producaoCriar',
                key: 'producaoCriar',
              },
              {
                label: 'Visualizar',
                data: 'producaoVisualizar',
                key: 'producaoVisualizar',
              },
              {
                label: 'Editar',
                data: 'producaoEditar',
                key: 'producaoEditar',
              },
              {
                label: 'Status',
                data: 'producaoStatus',
                key: 'producaoStatus',
              },
            ],
          },
            {
            label: 'Usuários',
            data: 'usuario',
            key: 'usuario',
            children: [
              {
                label: 'Criar',
                data: 'usuarioCriar',
                key: 'usuarioCriar',
              },
              {
                label: 'Visualizar',
                data: 'usuarioVisualizar',
                key: 'usuarioVisualizar',
              },
              {
                label: 'Editar',
                data: 'usuarioEditar',
                key: 'usuarioEditar',
              },
              {
                label: 'Status',
                data: 'usuarioStatus',
                key: 'usuarioStatus',
              },
            ],
          }, 
          {
            label: 'Relatorio',
            data: 'relatorio',
            key: 'relatorio',
            children: [
              
              {
                label: 'Visualizar',
                data: 'relatoriosVisualizar',
                key: 'relatoriosVisualizar',
              }
             
            ],
          },
        {
            label: 'Empresas',
            data: 'empresa',
            key: 'empresa',
            children: [
              {
                label: 'Criar',
                data: 'empresaCriar',
                key: 'empresaCriar',
              },
              {
                label: 'Visualizar',
                data: 'empresaVisualizar',
                key: 'empresaVisualizar',
              },
              {
                label: 'Editar',
                data: 'empresaEditar',
                key: 'empresaEditar',
              },
              {
                label: 'Status',
                data: 'empresaStatus',
                key: 'empresaStatus',
              },
            ],
          },
            {
            label: 'Operador',
            data: 'operador',
            key: 'operador',
            children: [
              {
                label: 'Criar',
                data: 'operadorCriar',
                key: 'operadorCriar',
              },
              {
                label: 'Visualizar',
                data: 'operadorVisualizar',
                key: 'operadorVisualizar',
              },
              {
                label: 'Editar',
                data: 'operadorEditar',
                key: 'operadorEditar',
              },
              {
                label: 'Excluir',
                data: 'operadorExcluir',
                key: 'operadorExcluir',
              },
              {
                label: 'Status',
                data: 'operadorStatus',
                key: 'operadorStatus',
              },
            ],
          },

          
         

          
          

        ]
      }
    ];
  }
}