import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Toast {
  title?: string;
  message: string;
  type?: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast>({ message: '' });
  toast$ = this.toastSubject.asObservable();

  private toastVisibility = new BehaviorSubject<boolean>(false);
  toastVisibility$ = this.toastVisibility.asObservable();

  open(toast: Toast) {
    this.toastSubject.next({ type: 'success', ...toast });
    this.toastVisibility.next(true);
    setTimeout(() => {
      this.toastVisibility.next(false);
    }, 2000);
  }
}
