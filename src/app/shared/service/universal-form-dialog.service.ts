import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
        console.log('xxxx',  modalInstance)
        const caller =  modalInstance.modalApply() as any;
        if(caller instanceof Observable) {
          console.log('is obs')
          // modalRef.updateConfig({nzOkLoading: true, nzCancelDisabled: false})
          caller.toPromise().then(r => console.log('then', r))
          return caller.toPromise()
        } else {
          return new Promise(resolve => resolve(!!caller))
        } 
      },
      nzOnCancel: () => {
        const caller = modalRef.componentInstance.modalCancel();
        if(caller instanceof Observable) {
          modalRef.updateConfig({nzCancelLoading: true, nzOkDisabled: false});
          caller.subscribe(res => this.close(modalRef, res));
        } else if(!!caller) {
          this.close(modalRef, caller);
        } 
      },
    })
    modalRef.componentInstance.modalCreated(modalRef);
  }  

  private close(ref: NzModalRef, res?: any ) {
    ref.updateConfig({nzOkLoading: false, nzCancelLoading: false});
    ref.close(res);
    ref.destroy();
  }
}
