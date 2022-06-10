import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IndexService {

  private url = environment.baseUrl + '/public';
  public original_url = environment.baseUrl;

  constructor(private http?: HttpClient) {
  }
  getImages(imageUrl:any){
    return this.http.get(imageUrl);
  }
   getToken(): any {
    return localStorage.getItem('token');
  }

   loadMenu() {
    return this.http.get(this.url + '/menu/?language=' + localStorage.getItem('currentLanguage'));
   }

   loadMembersOnlyMenu() {
    return this.http.get(this.url + '/menu/?language=' + localStorage.getItem('currentLanguage')
     + ' & status=true & memberOnly=true');
   }

   loadQuickLink() {
    return this.http.get(this.url + '/link/?language=' + localStorage.getItem('currentLanguage') + ' & status=' + false);
   }

   loadFeaturedNews(data: any) {
    return this.http.post(this.url + '/article/featured', data);
   }

   loadArticles(categoryId: any, memberOnly?: any) {
    let result;
    const url = this.url + '/article/?categoryId=' + categoryId + '&';
    result = this.http.get(url + 'status=false & membersOnly=False & language=' + localStorage.getItem('currentLanguage'));

    if (memberOnly) {
      result = this.http.get(url + 'status=false & language=' + localStorage.getItem('currentLanguage'));
     }

    return result;
   }

   articleReadMore(id: any) {
    return this.http.get(this.url + '/article/detail/' +  id);
   }

   loadCategoryId(id: any) {
    return this.http.get(this.url + '/menu/?id=' +  id);
   }

   loadMenuCategoryId(id: any) {
    return this.http.get(this.url + '/menu/GetCategory/' +  id);
   }



   subscribe(subscription: any) {
    return this.http.post(this.url + '/subscription/', subscription);
   }
   checkSubscription(email: any) {
    return this.http.get(this.url + '/subscription/?email=' + email);
   }

   loadComment(articleId: any) {
    return this.http.get(this.url + '/comment/?commentForArticle=' +  articleId);
   }

   postComment(comment: any) {
    return this.http.post(this.url + '/comment/', comment);
   }

   getOurTeamMembers() {
    return this.http.get(this.url + '/team/?language=' + localStorage.getItem('currentLanguage'));
   }

   loadContact() {
    return this.http.get(this.url + '/setting');
   }

   filterEvents() {
    return this.http.get(this.url + '/event/Filter/' + localStorage.getItem('currentLanguage'));
   }

   getEvent(id: any) {
    return this.http.get(this.url + '/event/Detail/' + id);
   }

   // assessment plan
  Assessment_Create(data: any): any {
    return this.http.post(this.url + '/Assessment_Plan', data);
  }

  Assessment_Update(data: any): any {
    return this.http.post(this.url + '/Assessment_Plan/Update', data);
  }

  Assessment_Gets(college_id: any): any {
    return this.http.get(this.url + '/Assessment_Plan/Filter/' + college_id);
  }

  Assessment_Get(id: any): any {
    return this.http.get(this.url + '/Assessment_Plan/Get/' + id);
  }

  Occupations(): any {
    return this.http.get(this.url + '/Assessment_Plan/Occupations');
  }

  Assessment_Delete(id: any): any {
    return this.http.delete(this.url + '/Assessment_Plan/' + id);
  }


}
