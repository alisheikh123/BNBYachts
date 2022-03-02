import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  public languageChangeEmmitter = new EventEmitter<any>();
  currentLanguage: any = 'en';
  data: any = {};
  constructor(private http: HttpClient) { }

  use(lang: string) {
    this.currentLanguage = lang;
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this.http.get(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          this.languageChangeEmmitter.emit(lang);
        },
        error => {
          this.data = {};
        }
    ); 
  }
}
