import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  template: `
  <app-navbar></app-navbar>
    <div class="container mt-5">
      <h2>Yeni Anket Oluştur</h2>
      <form (ngSubmit)="createPoll()">
        <div class="mb-3">
          <label for="pollTitle" class="form-label">Anket Başlığı</label>
          <input type="text" class="form-control" id="pollTitle" [(ngModel)]="pollTitle" name="pollTitle" required>
        </div>

        <div class="mb-3">
          <label for="pollOptions" class="form-label">Seçenekler</label>
          <div class="mb-2">
            <input type="text" class="form-control" [(ngModel)]="options[0]" name="option0" required placeholder="Seçenek 1">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" [(ngModel)]="options[1]" name="option1" required placeholder="Seçenek 2">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" [(ngModel)]="options[2]" name="option2" required placeholder="Seçenek 3">
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" [(ngModel)]="options[3]" name="option3" required placeholder="Seçenek 4">
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Anketi Oluştur</button>
      </form>
    </div>
  `,
})
export class CreatePollComponent {
  pollTitle: string = '';
  options: string[] = ['', '', '', ''];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  createPoll() {
    const token = localStorage.getItem('jwtToken');
  
    if (!token) {
      this.toastr.error('Token bulunamadı. Lütfen giriş yapın.', 'Hata');
      return;
    }
  
    const pollData = {
      title: this.pollTitle,
      options: this.options.filter(option => option.trim() !== '')
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    this.http.post('http://localhost:5126/api/Poll/create', pollData, { headers }).subscribe({
      next: (response: any) => {
        if (response && response.Message) {
          this.toastr.success(response.Message, 'Başarılı'); 
        }
      },
      error: (err) => {
        console.error('Anket oluşturulurken hata oluştu:', err);
        
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, 'Hata');
        } else if (err.error) {
          this.toastr.error(err.error, 'Hata');
        } else {
          this.toastr.error('Anket oluşturulurken bir hata oluştu.', 'Hata');
        }
      }
    });
  }
  
}
