import { Injectable } from '@angular/core';
import { GradeResponse } from '@schoolinc/shared/api-interfaces';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const FIND_GRADE_BY_STUDENT = gql`
  query FindGradeByStudent($studentId: String!) {
    findGradeByStudent(studentId: $studentId) {
      grade
      class {
        id
      }
    }
  }
`;

interface findGradeResponse {
  findGradeByStudent: GradeResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  constructor(private apollo: Apollo) {}

  findGradesByStudentId(studentId: string) {
    return this.apollo.watchQuery<findGradeResponse>({
      query: FIND_GRADE_BY_STUDENT,
      variables: {
        studentId,
      },
    });
  }

}
