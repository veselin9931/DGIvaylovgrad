import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { AccountService, AlertService } from '../../_services';
import { ArticleService } from '../../_services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public articles = [];
  public loading: boolean;
  public user: User;
  public progress: number;
  
  constructor(private articleService: ArticleService,
              private accountService: AccountService,
              private alertService: AlertService) { 
                this.articles = []; 
                this.user = this.accountService.userValue;
              }

  ngOnInit(): void {
    this.loading = true;
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAll()
      .subscribe(success => {
        if (success) {
          this.articles = this.articleService.articles;
        }
        this.loading = false;
      })
  }

  public deleteFile = (id: number, name: string) => {

    this.articleService.deleteArticle(id)
      .subscribe(
        event => {
            let message = `${name} - беше премахнат успешно!`;
            this.alertService.success(message, { autoClose: true });
            this.getAllArticles();    
        },
        err => {
          this.loading = false;
          this.alertService.error(err.error.err, { autoClose: true });
        }
      );

  }
}
