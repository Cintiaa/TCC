import { ProfessorService } from './../services/professor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  templateUrl: 'professor.component.html',
  styleUrls: ['professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professor: [];
  professorEdit: any;
  vinculo: any = [];
  cadtrProfessor = false;
  cadtrProfessorDisciplina = false;
  listaProfessor = false;
  msg = false;

  busca = {
    Nome: "",
  }

  limparInput() {
    this.busca = {
      Nome: "",
    }
    this.msg = false;
    this.listaProfessor = false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfessorService,
  ) { }

  ngOnInit() {
  }

  buscar() {
    console.log('Busca', this.busca);
    this.service.listarProfessores(this.busca).subscribe(res => {
      this.professor = res;

      if (res.length == 0) {
        this.msg = true;
        this.listaProfessor = false;
      } else {
        this.msg = false;
        this.listaProfessor = true;
      }
    })
  }


  editarProfessor(id) {
    console.log(id);
    this.service.buscaProfessorId(id).subscribe(res => {
      this.professorEdit = res;
      console.log(res);
      this.cadtrProfessor = true;
      this.listaProfessor = false;
    })
  }

  vincularDisciplina(id) {
    console.log(id);
    this.service.buscaProfessorId(id).subscribe(res => {
      this.vinculo = res;
      this.cadtrProfessorDisciplina = true;
      this.listaProfessor = false;
    });
  }

  cadastroCallback(e) {
    this.cadtrProfessor = false;
    this.cadtrProfessorDisciplina = false;
  }

  AdicionarProfessor(e) {
    this.cadtrProfessor = e;
    this.listaProfessor = false;
  }

}

