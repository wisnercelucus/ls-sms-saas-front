import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/schools/models/entities.model';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [
                        {  id: 1, 
                          name:'Math fundamental', 
                          description:'This course is entended to initiate you to the fundamental',
                          base:10,
                          coefficient:1,
                          code:'math101'
                         },
                          /*
                         {  id: 2, 
                          name:'English 101', 
                          description:'This course is an intro to English composition 1.'+ 
                                        'It is focuses in helping you with citation, quote and helping you to avoid plagiarism.',
                          base:20,
                          coefficient:2,
                          code:'eng101'
                         },

                         { id: 3, 
                          name:'Creole 101', 
                          description:'You will discover the beauty of creole, the languange spoken by a vast majority of people living in the Caraibe.'+ 
                                        'It will also focus on helping you with citation, quote and helping you to avoid plagiarism.',
                          base:10,
                          coefficient:1,
                          code:'creo101'
                         },
                         {  id: 4, 
                          name:'Math fundamental', 
                          description:'This course is entended to initiate you to the fundamental',
                          base:10,
                          coefficient:1,
                          code:'math101'
                         },

                         {  id: 5, 
                          name:'English 101', 
                          description:'This course is an intro to English composition 1.'+ 
                                        'It is focuses in helping you with citation, quote and helping you to avoid plagiarism.',
                          base:20,
                          coefficient:2,
                          code:'eng101'
                         },

                         { id: 6, 
                          name:'Creole 101', 
                          description:'You will discover the beauty of creole, the languange spoken by a vast majority of people living in the Caraibe.'+ 
                                        'It will also focus on helping you with citation, quote and helping you to avoid plagiarism.',
                          base:10,
                          coefficient:1,
                          code:'creo101'
                         },*/
                        ]
  constructor() { }

  ngOnInit(): void {
  }

}
