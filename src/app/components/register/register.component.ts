import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="card" style="width: 100%; max-width: 400px;">
        <div class="card-body">
          <h5 class="card-title text-center">Kayıt Ol</h5>
          <form (ngSubmit)="register()">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                [(ngModel)]="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Şifre</label>
              <input
                id="password"
                type="password"
                class="form-control"
                [(ngModel)]="password"
                name="password"
                placeholder="Şifre"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100" [disabled]="!email || !password">Kaydol</button>
          </form>
        </div>
        <div class="card-footer text-center">
          <small>Hesabınız var mı? <a (click)="goToLogin()">Giriş Yapın</a></small>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {}

  register() {
    const payload = { email: this.email, password: this.password };
  
    this.http.post('http://localhost:5126/api/Auth/register', payload).subscribe({
      next: (response: any) => {
        if (response && response.message === 'User registered successfully.') {
          this.toastr.success('Kayıt başarıyla tamamlandı!', 'Başarılı', { positionClass: 'toast-top-right' });
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if (err.status === 400 && err.error && err.error.message) {
          this.toastr.error(err.error.message, 'Hata', { positionClass: 'toast-top-right' });
        } else {
          this.toastr.error('Kayıt sırasında bir hata oluştu.', 'Hata', { positionClass: 'toast-top-right' });
        }
        console.error(err);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
