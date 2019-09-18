import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;
    setTimeout(() => {});
    setTimeout(() => {
      test = true;
    }, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;
    Promise.resolve()
      .then(() => {
        console.log('promise 1');
        test = true;
        return Promise.resolve();
      })
      .then(() => {
        console.log('promise 2');
      });
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises plus setTimeout()', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  fit('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    expect(test).toBe(true);
  }));
});
