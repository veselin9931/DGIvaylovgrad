import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services';
import { ArticleService } from '../../_services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.articleService.createArticle(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Успешно създадохте съобщение.', { autoClose: true});
          this.router.navigate(['/home'], { relativeTo: this.route });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}













// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { first } from 'rxjs/operators';
// import { AlertService } from '../../_services';
// import { ArticleService } from '../../_services/article.service';

// @Component({
//   selector: 'app-article',
//   templateUrl: './article.component.html',
//   styleUrls: ['./article.component.css']
// })
// export class ArticleComponent implements OnInit {

//   //form: FormGroup;
//   loading = false;
//   submitted = false;

//   form = new FormGroup({
//     name: new FormControl(),
//     description: new FormControl()
//   });

//   constructor(private formBuilder: FormBuilder,
//     private alertService: AlertService,
//     private articleService: ArticleService,
//     private router: Router,
//     private route: ActivatedRoute,) { }

//   ngOnInit(): void {
//   }

//   //get f() { return this.form.controls; }

//   onSubmit() {
//     this.submitted = true;

//     // reset alerts on submit
//     this.alertService.clear();

//     // stop here if form is invalid
//     if (this.form.invalid) {
//       return;
//     }

//     this.loading = true;

//     const article = { ...this.form.value };
//         this.articleService.createArticle(article)
//             .subscribe({
//                 next: () => this.router.navigate(["home"]),
//                 error: () => console.log('error')
//             });

//         this.router.navigate(["home"]);
//   }

// }
