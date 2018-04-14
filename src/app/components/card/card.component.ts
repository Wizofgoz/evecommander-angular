import { ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { CardHostDirective } from '../../directives/card-host.directive';
import * as Cards from './cards/index';
import { ResourceInterface } from '../../services/base.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {
  @Input() resource: ResourceInterface;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(CardHostDirective) cardHost: CardHostDirective;
  ready = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ref: ChangeDetectorRef
  ) { }

  ngOnChanges() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.resource.cardComponent);
    const viewContainerRef = this.cardHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Cards.CardComponent>componentRef.instance).resource = this.resource;
    (<Cards.CardComponent>componentRef.instance).select.subscribe(e => this.select.next(e));
    (<Cards.CardComponent>componentRef.instance).delete.subscribe(e => this.delete.next(e));
    (<Cards.CardComponent>componentRef.instance).edit.subscribe(e => this.edit.next(e));
    this.ready = true;
    this.ref.detectChanges();
  }
}
