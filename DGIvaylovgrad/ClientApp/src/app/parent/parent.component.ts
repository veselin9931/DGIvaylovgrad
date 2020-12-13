import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../_services/document.services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  public loading: boolean;
  public progress: number;
  public fileName: string;
  public documents = [];
    url: any;

  constructor(private documentService: DocumentService) {
      this.url = environment.apiUrl,
      this.documents = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.documentService.getAll()
      .subscribe(success => {
        if (success) {
          console.log(this.documentService.documents[0].filter(x => x.name.includes('1_1')));
          this.documents = this.documentService.documents[0].filter(x => x.name.includes('1_1'));
        }
        this.loading = false;
      });
  }

}
