import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { DocumentService } from '../../_services/document.services';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService, AlertService } from '../../_services';
import { User } from '../../_models/user';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  public loading: boolean;
  public progress: number;
  public fileName: string;
  public documents = [];
  public user: User;
  url: string;
  
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private documentService: DocumentService,
              private alertService: AlertService,
              private accountService: AccountService) {
      this.url = environment.apiUrl,
      this.documents = [];
      this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.documentService.getAll()
      .subscribe(success => {
        if (success) {
          this.documents = this.documentService.documents;
        }
        this.loading = false;
      });
  }

  public uploadFile = (files) => {
    this.progress = 0;

    if (files.length === 0) {
      return;
    }

    let filesToUpload: FileList = files;
    this.fileName = filesToUpload[0].name;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.loading = true;

    this.documentService.upload(filesToUpload.item(0), this.fileName).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {

          let message = `Файлът с име "${this.fileName}" беше качен успешно :)`;
          this.alertService.success(message, { autoClose: true });
          this.getAllDocuments();
          if (this.progress == 100) {
            this.loading = false
          }
        }
      },
      err => {
        this.loading = false;
        this.alertService.error(err.error.err, { autoClose: true });
      }
    );
  }

  downloadFile(event, document) {
    console.log(event);
    console.log(document);
  }

  public deleteFile = (id: number, name: string) => {

    this.documentService.deleteById(id)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {

            let message = `${name} - беше премахнат успешно!`;
            this.alertService.success(message, { autoClose: true });
            this.getAllDocuments();

            if (this.progress == 100) {
              this.loading = false
            }
          }
        },
        err => {
          this.loading = false;
          this.alertService.error(err.error.err, { autoClose: true });
        }
      );

  }

  public deleteAll = () => {

    this.documentService.deleteAll()
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {

            let message = `Успешно изтрихте всички файлове!`;
            this.alertService.success(message, { autoClose: true });
            this.getAllDocuments();

            if (this.progress == 100) {
              this.loading = false
            }
          }
        },
        err => {
          this.loading = false;
          this.alertService.error(err.error.err, { autoClose: true });
        }
      );

  }

}
