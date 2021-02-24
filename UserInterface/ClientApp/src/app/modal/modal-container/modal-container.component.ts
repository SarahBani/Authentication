import {
  Component, ViewChild, ViewContainerRef, Input,
  ComponentFactoryResolver, ComponentRef, OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { selectIsLoading } from '../../store/auth.selector';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnDestroy {

  @Input() title: string;
  @Input() set componentType(c: any) {
    this.component = c;
    this.renderContent();
  };
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private component: any;
  private componentRef: ComponentRef<any>;
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private store: Store<fromApp.AppState>,
    private resolver: ComponentFactoryResolver) {
  }

  renderContent(): void {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.component);
    this.componentRef = this.container.createComponent(factory);
  }

  onCancel(): void {
    this.store.dispatch(AuthActions.hideLoginModal());
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
