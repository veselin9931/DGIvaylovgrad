import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../_services/document.services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
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
          this.documents = this.documentService.documents[0].filter(x => x.name.includes('2_2.'));;
        }
        this.loading = false;
      });
  }

}
