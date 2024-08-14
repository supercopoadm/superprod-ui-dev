import { Component, OnInit } from '@angular/core';
import { Operador } from 'src/app/core/models/operador.model';
import { OperadorService } from '../operador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../../core/error-handler.service';

@Component({
  selector: 'app-operador-cadastro',
  templateUrl: './operador-cadastro.component.html',
  styleUrls: ['./operador-cadastro.component.css']
})
export class OperadorCadastroComponent implements OnInit {

  salvando: boolean = false;
  operador = new Operador()
  idOperador: number;

  constructor(
    private operadorService: OperadorService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Operador');
    this.idOperador = this.route.snapshot.params['id'];
    if(this.idOperador) {
      this.spinner.show();
      this.carregarOperador(this.idOperador);
    }else {
      this.operador.status = true;
    }
  }

  get editando() {
    return Boolean(this.operador.id);
  }

  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarOperador(form)
    }else {
      this.adiconarOperador(form);
    }
  }

  carregarOperador(id: number) {
    this.operadorService.buscarPorId(id)
    .then((obj) => {
      this.operador = obj;
      this.atualizarTituliEdicao();
      this.spinner.hide();
    })
    .catch((erro) => {
      this.spinner.hide();
     this.erroHandler.handle(erro);
    })
  }

  atualizarOperador(form: NgForm) {
    this.salvando = true;
    this.operadorService.atualizar(this.operador)
    .then((obj) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Molde',
        detail: `${obj.nome}, atualizado com sucesso!`
      });
      this.atualizarTituliEdicao();
      this.salvando = false;
     
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  adiconarOperador(form: NgForm) {
    this.salvando = true;
    this.operadorService.adicionar(this.operador)
    .then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Molde',
        detail: `${obj.nome}, adicionado com sucesso!`
      });
      this.salvando = false;
      this.router.navigate(['/operadores']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Molde: ${this.operador.nome}`)
  }

}
