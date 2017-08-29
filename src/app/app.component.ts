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

              <p>spaces$: {{ num }}</p>
            `,
})
export class AppComponent {

  public name: string;

  public num;
  private activitySubscription = new Subscription();

  constructor(private ngZone: NgZone) {
    this.name = `Angular! v${VERSION.full}`
  }

  // ngDoCheck() {
  //   console.log('doCheck!!!');
  // }

  ngOnInit() {
    console.log('ngOninit');

    let repeater$;

    this.ngZone.runOutsideAngular(() => {

      repeater$ = Observable.of({})
        .do(() => {
          const num = Math.floor(Math.random() * 100);
          console.log('Poll action dispatched', num);
          this.num = num;
        })
        .map((_) => {
          return _;
        })
        .delay(2000)
        .repeat()
        .throttleTime(20000);
    });

    this.activitySubscription = repeater$
      .subscribe(
        () => {
        },
        (error) => {
          console.error('refresh error', error);
        },
        () => console.info('finished')
      );
  }
}
