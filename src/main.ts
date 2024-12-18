// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePollComponent } from './app/components/create-poll-component/create-poll-component.component';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { MyPollsComponent } from './app/components/my-polls/my-polls.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent), data: { showNavbar: false } },
      { path: 'register', loadComponent: () => import('./app/components/register/register.component').then(m => m.RegisterComponent), data: { showNavbar: false } },
      { path: 'dashboard', loadComponent: () => import('./app/components/dashboard/dashboard.component').then(m => m.DashboardComponent), data: { showNavbar: true } },
      { path: 'poll/:pollId', loadComponent: () => import('./app/components/poll-detail/poll-detail.component').then(m => m.PollDetailComponent), data: { showNavbar: true } },
      { path: 'create-poll', component: CreatePollComponent, data: { showNavbar: true } },
      { path: 'my-polls', component: MyPollsComponent, data: { showNavbar: true } },
    ]),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      }),
      BrowserAnimationsModule
    ),
    RouterModule
  ]
}).catch((err) => console.error(err));
