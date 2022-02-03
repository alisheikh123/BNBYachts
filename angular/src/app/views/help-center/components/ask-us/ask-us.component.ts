import { Component, OnInit } from '@angular/core';
import { HelpCenterService } from 'src/app/core/help-center/help-center.service';
import { QuestionCategories } from 'src/app/shared/enums/question-category';
import { IQuestions } from './interfaces/questions';

@Component({
  selector: 'app-ask-us',
  templateUrl: './ask-us.component.html',
  styleUrls: ['./ask-us.component.scss']
})
export class AskUsComponent implements OnInit {

  questions:IQuestions[];
  filteredQuestions:IQuestions[];
  searchTerm = '';
  QUESTION_CATEGORIES = QuestionCategories;
  constructor(private service: HelpCenterService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.service.getQuestions().subscribe((res: any) => {
      this.questions = res?.data;
      this.filterPrivilegeQuestion();
    })
  }

  filterPrivilegeQuestion() {
    if (this.searchTerm == '') {
      this.filteredQuestions = this.questions.filter((res: IQuestions) => res?.categoryId == this.QUESTION_CATEGORIES.PrivilegeFaq);
    }
    else {
      this.filteredQuestions = this.questions.filter((res: IQuestions) => res?.categoryId == this.QUESTION_CATEGORIES.PrivilegeFaq && res?.question.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
    }
  }
}
