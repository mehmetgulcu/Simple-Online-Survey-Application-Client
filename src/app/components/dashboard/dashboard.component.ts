import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
<app-navbar></app-navbar>
    <div class="container mt-5">
      <h2>Anket Listesi</h2>
      <div *ngIf="polls.length === 0" class="alert alert-info">Anket yükleniyor...</div>
      <div *ngIf="polls.length > 0">
        <div *ngFor="let poll of polls" class="card mt-3">
          <div class="card-header">
            <h5><a [routerLink]="['/poll', poll.id]">{{ poll.title }}</a> Oy kullan</h5>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li *ngFor="let option of poll.options" class="list-group-item d-flex justify-content-between align-items-center">
                {{ option.optionText }}
                <span class="badge bg-primary rounded-pill">{{ option.voteCount }}<span class="text-light"> Oy verildi</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  polls: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.http.get<any[]>('http://localhost:5126/api/Poll').subscribe({
      next: (response) => {
        this.polls = response;
      },
      error: (err) => {
        console.error('Anket verileri yüklenirken hata oluştu:', err);
      },
    });
  }
}
