import { Component, Input } from '@angular/core';

@Component({
  selector: 'schoolinc-grade-card',
  templateUrl: './grade-card.component.html',
  styleUrls: ['./grade-card.component.scss']
})
export class GradeCardComponent {
  @Input() className = '';
  @Input() grade = 0;

}