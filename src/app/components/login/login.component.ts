import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
  
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="card" style="width: 100%; max-width: 400px;">
        <div class="card-body">
          <h5 class="card-title text-center">Giriş Yap</h5>
          <form (ngSubmit)="login()">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                [(ngModel)]="email"
                name="email"
                placeholder="Email"
                value="mehmet@mail.com"
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
                value="Mehmet123*"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Giriş Yap</button>
          </form>
        </div>
        <div class="card-footer text-center">
          <small>Hesabınız yok mu? <a class="text-warning" (click)="goToRegister()">Kaydolun</a></small>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {}

  login() {
    const payload = { email: this.email, password: this.password };

    this.http.post('http://localhost:5126/api/Auth/login', payload).subscribe({
      next: (response: any) => {
        localStorage.setItem('jwtToken', response.token);
        this.toastr.success('Giriş başarılı!', 'Başarılı', { positionClass: 'toast-top-right' });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastr.error('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.', 'Hata', {
          positionClass: 'toast-top-right',
        });
        console.error(err);
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
