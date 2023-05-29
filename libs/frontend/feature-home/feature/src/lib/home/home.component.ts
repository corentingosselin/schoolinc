import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradeService } from '@schoolinc/frontend/feature-home/data-access';
import { GradeResponse } from '@schoolinc/shared/api-interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'schoolinc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  grades: GradeResponse[] = []; // Adjust this to fit your data model

  constructor(private gradeService: GradeService, private router: Router) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('userId');
    if(!studentId) return;
    this.gradeService.findGradesByStudentId(studentId).valueChanges.pipe(map((response) => response.data.findGradeByStudent)).subscribe(response => {
      this.grades = response;
    });
    
    
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
