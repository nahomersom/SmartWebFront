import { Component, OnInit, Input } from '@angular/core';
import { IndexService } from 'src/app/index/Services/index.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public invalidClass = false;
  public comments: any[] = [];
  public isCollapsed = true;
  public userId = localStorage.getItem('userId');

  @Input() articleId: any;

  constructor(private indexService: IndexService,private router?: Router, private translate?: TranslateService) {
    this.formgroup = new FormGroup
    ({
      comment : new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
      this.indexService.loadComment(this.articleId)
      .subscribe((data: any[]) => {
        this.comments = data;
    });
  }

  get getcomment(): FormControl {
    return this.formgroup.get('comment') as FormControl;
  }

  onSubmit(): any {
    if (this.getcomment.errors ) {
          this.formSubmitted = true;
          this.invalidClass = true;
          return;
    } else {
          this.invalidClass = false;
          return this.indexService.postComment(
          {
            comment : this.formgroup.controls.comment.value,
            commentBy : localStorage.getItem('userFullName'),
            commentForArticle : this.articleId,
          })
            .subscribe(response => {
              window.alert('comment posted !');
              this.ngOnInit();
              this.getcomment.setValue('');
            });
    }

  }


  isEmpety(str: any) {
    if (str === '' || str === null) {
      return true;
    } else {
      return false;
    }
  }

}
