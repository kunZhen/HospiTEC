import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Evaluation } from '../interfaces/evaluation.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  addEvaluation(evaluation: Evaluation) {
    const url = `${this.baseUrl}/evaluation`;

    return this.http.post(url, evaluation);
  }

  updateEvaluation(evaluation: Evaluation) {
    const url = `${this.baseUrl}/evaluation/${evaluation.recordId}`;

    return this.http.put(url, evaluation);
  }

  existEvaluation(recordId: string): Observable<boolean> {
    const url = `${this.baseUrl}/evaluation?recordId=${recordId}`;

    return this.http.get<Evaluation[]>(url)
      .pipe(
        map(evaluations => evaluations.length > 0)
      );
  }
}
