import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SubscriptionComponent } from './subscription.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [SubscriptionComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateModule,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [SubscriptionComponent],
    providers: [NgbPopoverConfig,
    ],
})
export class SubscriptionModule { }
