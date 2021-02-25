import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ModalContainerComponent } from '../modal/modal-container/modal-container.component';

@Injectable({ providedIn: 'root' })
export class ModalService {

  private config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false, // prevent Esc key from closing the modal especially while loading
    //  class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) {
  }

  open(component: any, title: string): void {
    const ref = this.modalService.show(ModalContainerComponent, this.config);
    const container = (ref.content as ModalContainerComponent);
    container.title = title
    container.componentType = component;
    //this.modalService.onHide.pipe(take(1))
    //  .subscribe(() => {
    //    console.log(234);
    //  });
  }

  close(): void {
    this.modalService.hide();
  }

}
