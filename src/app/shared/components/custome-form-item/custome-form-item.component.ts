import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, forwardRef, Injector, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomeFormItemAccessor } from '../../domain/form.interface';

@Component({
  selector: 'custome-form-item',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => CustomeFormItemComponent ),
      multi: true
    }
  ]
})
export class CustomeFormItemComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() component!: Type<CustomeFormItemAccessor>;

  val: any;
  formChange!: (val: any) => void;
  componentRef!: ComponentRef<CustomeFormItemAccessor>;

  constructor(
    private container: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(!this.component) {
      console.error('未传入自定义组件');
      return;
    } 
    const factory     = this.cfr.resolveComponentFactory(this.component);
    const component   = factory.create(this.injector);
    this.componentRef = component;    
    this.componentRef.instance.registerValueChange( val => this.formChange(val) );
    // 通过setTimeout规避dirtyCheck错误
    setTimeout(() => {
      this.container.insert(component.hostView);
      if(this.val) this.componentRef.instance.writeValue(this.val);
    })    
  }

  writeValue(val: any): void {
    this.val = val;
    if(!this.componentRef) return;
    this.componentRef.instance.writeValue(val);
  }

  registerOnChange(fn: any): void {
    this.formChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    
  } 

}
