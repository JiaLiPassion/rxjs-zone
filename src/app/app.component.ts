//our root app component
import { Component, NgModule, NgZone, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Observable, Subscription, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
    
    <p>spaces$: {{ spaces$ | async }}</p>
  `,
})
export class AppComponent {
  
  public name:string;

  public spaces$: Observable<any>;
  
  private store$ = new Subject();
  private activitySubscription = new Subscription();
  
  constructor(private ngZone: NgZone) {
    this.name = `Angular! v${VERSION.full}`
  }
  
  ngOnInit() {
    console.log('ngOninit');
    
    this.spaces$ = this.store$
      .asObservable()
      .do((value) => {
        const inZone = NgZone.isInAngularZone();
        console.log('spaces$ next => assertInAngularZone', value, inZone);
      });
                        
    const repeater$ = Observable.of({})
      .do(() => {
        const num = Math.floor(Math.random() * 100);
        console.log('Poll action dispatched', num);
        this.store$.next('store$.next(' + num + ')');
      })
      .delay(2000)
      .repeat();
      
    this.ngZone.runOutsideAngular(() => {
      this.activitySubscription = repeater$.subscribe(
        () => { },
        (error) => {
          console.error('refresh error', error);
        },
        () => console.info('finished')
      );
   });
  }
}