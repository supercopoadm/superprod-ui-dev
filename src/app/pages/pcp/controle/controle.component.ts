import { Component, OnInit, ViewChild } from '@angular/core';
import { PcpService } from '../pcp.service';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-pcp-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class PcpControleComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  maquinas = [];
  producao = [];
  combinado = [];
  cols: any[];

  constructor(private pcpService: PcpService) {}

  ngOnInit() {
    this.carregarDados();

    this.cols = [
      { field: 'dataproducao', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'nomeMaquina', header: 'Produto', width: '130px', type: 'text' },
      { field: 'nomeProduto', header: 'Atributo', width: '330px', type: 'text' },
      { field: 'nomeatributo', header: 'Status', width: '250px', type: 'text' },
      // { field: 'quantidade', header: 'Quantidade', width: '150px', type: 'numeric' },
      // { field: 'lote', header: 'Lote', width: '110px', type: 'text' },
      // { field: 'loginusuario', header: 'Usuário', width: '130px', type: 'text' },
      // { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' },
      // { field: 'statusformatado', header: 'Status', width: '120px', type: 'text'}
    ];
  }

  

  carregarDados() {
    Promise.all([
      this.pcpService.listarMaquinas(),
      this.pcpService.listarProduzindo()
    ]).then(([maquinas, producao]) => {
      this.maquinas = maquinas;
      this.producao = producao;
      this.combinarDados();
      console.log('Dados combinados:', this.combinado);
    });
  }

  combinarDados() {
    this.combinado = this.maquinas.map(maquina => {
      const producaoItem = this.producao.find(p => p.maquina === maquina.maquina);
      return {
        ...maquina,
        status: producaoItem ? producaoItem.status : 'Parada',
        atributo: producaoItem ? producaoItem.nomeatributo : '',
        quantidade: producaoItem ? producaoItem.quantidade : 0,
        ordem: producaoItem ? producaoItem.ordem : 'N/A'
      };
    });
  }
}
