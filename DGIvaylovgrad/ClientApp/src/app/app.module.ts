import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { GroupsComponent } from './groups/groups.component';
import { DocumentsComponent } from './documents/documents.component';
import { ActivityComponent } from './activity/activity.component';
import { AboutParentComponent } from './about-parent/about-parent.component';
import { AccountModule } from './account/account.module';
import { AlertComponent } from './alert';
import { ArticleComponent } from './article/article.component';
import { ParentComponent } from './parent/parent.component';
import { BudgetComponent } from './budget/budget.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'about-parent', component: AboutParentComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'budget', component: BudgetComponent },



];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavMenuComponent,
    AboutUsComponent,
    GroupsComponent,
    DocumentsComponent,
    ActivityComponent,
    AboutParentComponent,
    AlertComponent,
    ArticleComponent,
    ParentComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccountModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
