import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/schools/models/entities.model';



@Component({
  selector: 'app-course-item-odd',
  templateUrl: './course-item-odd.component.html',
  styleUrls: ['./course-item-odd.component.css']
})
export class CourseItemOddComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }



}
