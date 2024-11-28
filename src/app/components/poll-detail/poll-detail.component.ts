import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll-detail',
  standalone: true,
  styleUrl: './poll-detail.component.css',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  template: `
    <div class="container mt-5">

      <h2>{{ poll?.title }}</h2>


      <canvas height="80px" id="pollChart"></canvas>
      
      <div *ngIf="!poll" class="alert alert-info mt-3">Anket yükleniyor...</div>

      <div *ngIf="poll" class="mt-4">
        <h4>Seçenekler</h4>
        <form (ngSubmit)="vote()">
          <div class="form-check" *ngFor="let option of poll.options">
            <input 
              class="form-check-input" 
              type="radio" 
              name="pollOption" 
              [value]="option.id" 
              [(ngModel)]="selectedOptionId" 
              [id]="'option' + option.id" 
              required
            />
            <label class="form-check-label" [for]="'option' + option.id">
              {{ option.optionText }}
            </label>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Oy Ver</button>
        </form>
      </div>
    </div>
  `,
})
export class PollDetailComponent implements OnInit {
  poll: any;
  pollId!: number;
  selectedOptionId!: number;
  chart: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.pollId = +this.route.snapshot.paramMap.get('pollId')!;
    this.loadPollDetail();
  }

  loadPollDetail() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('JWT Token bulunamadı!');
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>(`http://localhost:5126/api/Poll/${this.pollId}`, { headers }).subscribe({
      next: (response) => {
        console.log('Poll Detayları:', response);
        this.poll = response;
        this.createChart();
      },
      error: (err) => {
        console.error('Anket detayları yüklenirken hata oluştu:', err);
        this.toastr.error('Anket detayları yüklenirken hata oluştu!', 'Hata');
      },
    });
  }

  createChart() {
    if (this.poll && this.poll.options) {
      const labels = this.poll.options.map((option: any) => option.optionText);
      const data = this.poll.options.map((option: any) => option.voteCount);

      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      } else {
        this.chart = new Chart('pollChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Oy Sayıları',
                data: data,
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true },
            },
          },
        });
      }
    }
  }
  vote() {
    if (!this.selectedOptionId) {
      this.toastr.warning('Lütfen bir seçenek seçin', 'Uyarı', { positionClass: 'toast-top-right' });
      return;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.toastr.error('Lütfen giriş yapın', 'Hata', { positionClass: 'toast-top-right' });
      return;
    }

    const headers = { 'Authorization': `Bearer ${token}` };
    const body = {
      pollId: this.pollId,
      optionId: this.selectedOptionId,
    };

    this.http.post<any>('http://localhost:5126/api/Vote/vote', body, { headers }).subscribe({
      next: (response) => {
        console.log('Oy Verme Yanıtı:', response);

        if (response && response.message === 'Vote registered successfully.') {
          this.toastr.success('Oy başarıyla verildi!', 'Başarılı', { positionClass: 'toast-top-right' });
          this.loadPollDetail();
        } else {
          this.toastr.error('Beklenmeyen bir hata oluştu.', 'Hata', { positionClass: 'toast-top-right' });
        }
      },
      error: (err) => {
        console.error('Oy verme sırasında hata oluştu:', err);

        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, 'Hata', { positionClass: 'toast-top-right' });
        } else {
          this.toastr.error('Oy verme sırasında bir hata oluştu.', 'Hata', { positionClass: 'toast-top-right' });
        }
      },
    });
  }
}
