import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexService } from './index/Services/index.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthGarde } from './AuthGarde';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EventComponent } from './event/event.component';
import { SubscriptionModule } from './subscription/subscription.module';
import { SpinnerService } from './core/spinner.service';
import { InterceptorService } from './core/interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent, EventComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SubscriptionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [],
  providers: [
    IndexService, 
    AuthGarde, 
    NgbPopoverConfig,  
    SpinnerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
