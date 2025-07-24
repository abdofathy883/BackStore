import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  // private popupOpenSource = new BehaviorSubject<boolean>(false);
  // popupOpen$ = this.popupOpenSource.asObservable();

  // openPopupFromService() {
  //   this.popupOpenSource.next(true);
  // }

  private popupStates = new BehaviorSubject<{ [key: string]: boolean }>({});
  popupStates$ = this.popupStates.asObservable();

  openPopup(id: string) {
    const current = this.popupStates.value;
    this.popupStates.next({ ...current, [id]: true });
  }

  closePopup(id: string) {
    const current = this.popupStates.value;
    this.popupStates.next({ ...current, [id]: false });
  }

  isPopupOpen(id: string): boolean {
    return !!this.popupStates.value[id];
  }
}
