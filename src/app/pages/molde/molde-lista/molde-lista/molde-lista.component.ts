import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { MoldeService } from '../../molde.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltrosMolde } from 'src/app/core/models/filtro.model';

@Component({
  selector: 'app-molde-lista',
  templateUrl: './molde-lista.component.html',
  styleUrls: ['./molde-lista.component.css']
})
export class MoldeListaComponent implements OnInit {


  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  moldes = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';


  filtro = new FiltrosMolde();

  constructor(
    public auth: AuthService,
    private title: Title,
    private moldeService: MoldeService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Moldes');
    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarConvenios();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'sku', header: 'SKU', width: '150px', type: 'text', key: 3 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 4 },
      { field: 'loginusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 5 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 6 }
    ]

  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }


  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarConvenios();
  }

  carregarConvenios() {
    this.spinner.show();
    this.moldeService.listarMoldes()
      .then((obj) => {
        this.moldes = obj;
        this.moldes = this.validationService.formataAtivoeInativo(this.moldes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      })
  }

  // AlternarLista() {
  //   if (this.filtro.status === 'Ativos') {
  //     this.filtro.status = 'Inativos';
  //   } else {
  //     this.filtro.status = 'Ativos';
  //   }
  //   this.carregarConvenios();
  // }

  AlternarLista() {
    this.spinner.show();
    // Alterna o valor de this.sinal
    this.sinal = !this.sinal;

    // Define o valor baseado em this.sinal
    const valor = this.sinal ? '/inativos' : '/';

    // Define o tooltip baseado em this.sinal
    this.valorTooltip = this.sinal ? 'Inativos' : 'Ativos';

    console.log(this.sinal);

    this.moldeService.AlternarLista(valor)
      .then((obj) => {
        this.moldes = obj;
        this.moldes = this.validationService.formataAtivoeInativo(this.moldes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  refresh() {
    this.carregarConvenios();
  }
  onClear() {
    this.table.clear();
  }

}
