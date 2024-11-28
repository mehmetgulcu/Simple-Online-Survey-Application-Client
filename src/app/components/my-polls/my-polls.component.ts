import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-my-polls',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-5">
      <h2>Oluşturduğunuz Anketler</h2>

      <div *ngIf="polls.length === 0" class="alert alert-info">
        Henüz oluşturduğunuz anket yok.
      </div>

      <div class="card mb-4" *ngFor="let poll of polls">
        <div class="card-header">
          <h4>{{ poll.title }}</h4>
        </div>
        <div class="card-body">
          <div *ngFor="let option of poll.options">
            <p>
              {{ option.optionText }} - <strong>{{ option.voteCount }} oy</strong>
            </p>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" (click)="navigateToPollDetails(poll.id)">
            Detayları Gör
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MyPollsComponent implements OnInit {
  polls: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadMyPolls();
  }

  loadMyPolls() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.toastr.error('Token bulunamadı. Lütfen giriş yapın.', 'Hata');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any[]>('http://localhost:5126/api/Poll/my-pools', { headers }).subscribe({
      next: (response) => {
        this.polls = response;
        if (this.polls.length === 0) {
          this.toastr.info('Henüz oluşturduğunuz anket bulunmamaktadır.', 'Bilgi');
        }
      },
      error: (err) => {
        console.error('Anketler yüklenirken hata oluştu:', err);
        this.toastr.error('Anketler yüklenirken bir hata oluştu.', 'Hata');
      }
    });
  }

  navigateToPollDetails(pollId: number) {
    this.router.navigate(['/poll', pollId]);
  }
}
