import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { UniversalDataFormComponent } from '../components/universal-data-form/universal-data-form.component';
import { UniversalFormDialogOptions, UniversalFormModal } from '../domain/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class UniversalFormModalService {

  constructor(
    private nzModal: NzModalService
  ) { }

  create(options: UniversalFormDialogOptions) {
    const modalRef = this.nzModal.create<UniversalFormModal>({
      nzTitle: options.title,
      nzWidth: '450px',
      nzContent: options.component || UniversalDataFormComponent,
      nzComponentParams: <any>options.data,
      nzOnOk: modalInstance => {
        const caller =  modalInstance.modalApply() as any;
        if(caller instanceof Observable) {      
          return caller.toPromise()
        } else {
          return new Promise(resolve => resolve(caller ? 'apply' : false))
        } 
      },
      nzOnCancel: modalInstance => {
        const caller = modalInstance.modalCancel();
        if(caller instanceof Observable) {
          return caller.toPromise()
        } else {
          return new Promise(resolve => resolve(caller ? 'cancel' : false))
        } 
      },
    })
    modalRef.afterOpen.subscribe(_ => {
      if(modalRef.componentInstance?.modalCreated) modalRef.componentInstance?.modalCreated(modalRef);
    })    
    return modalRef;
  }  
}
