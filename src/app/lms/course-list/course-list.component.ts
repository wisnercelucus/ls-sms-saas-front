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
                          name:'Master the fundamental of Math. This course is entended to initiate you to the fundamental.', 
                          description:'This course is entended to initiate you to the fundamental.',
                          base:10,
                          coefficient:1,
                          code:'math101',
                          image:'https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_251/hated_math_1200x627.jpg?quality=89&w=800'
                         },
                          
                         {  id: 2, 
                          name:'English 101. This course is entended to initiate you to the fundamental.', 
                          description:'This course is an intro to English composition 1.'+ 
                                        'It is focuses in helping you with citation, quote and helping you to avoid plagiarism.',
                          base:20,
                          coefficient:2,
                          code:'eng101',
                          image:'https://m.jagranjosh.com/imported/images/E/Articles/English%20class%2010%20all%20chapters.jpg'
                         },

                         { id: 3, 
                          name:'Creole 101. This course is entended to initiate you to the fundamental.', 
                          description:'You will discover the beauty of creole, the languange spoken by a vast majority of people living in the Caraibe.'+ 
                                        'It will also focus on helping you with citation, quote and helping you to avoid plagiarism. This course is entended to initiate you to the fundamental.',
                          base:10,
                          coefficient:1,
                          code:'creo101',
                          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUrdF2YcD-nn45obzMiLmTSkIIVR9cXtzdeA&usqp=CAU'
                         },
                         
                         {  id: 4, 
                          name:'Math fundamental', 
                          description:'This course is entended to initiate you to the fundamental.',
                          base:10,
                          coefficient:1,
                          code:'math101',
                          image:'https://m.jagranjosh.com/imported/images/E/Articles/cbse-board-exam-2020-12th-maths-paper-last-month-tips-updates.jpg'
                         },

                         {  id: 5, 
                          name:'English 101', 
                          description:'This course is an intro to English composition 1.'+ 
                                        'It is focuses in helping you with citation, quote and helping you to avoid plagiarism.',
                          base:20,
                          coefficient:2,
                          code:'eng101',
                          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUrdF2YcD-nn45obzMiLmTSkIIVR9cXtzdeA&usqp=CAU'
                         },

                         { id: 6, 
                          name:'Creole 101', 
                          description:'You will discover the beauty of creole, the languange spoken by a vast majority of people living in the Caraibe.'+ 
                                        'It will also focus on helping you with citation, quote and helping you to avoid plagiarism.',
                          base:10,
                          coefficient:1,
                          code:'creo101',
                          image:'https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_251/hated_math_1200x627.jpg?quality=89&w=800'
                         },
                        ]
  constructor() { }

  ngOnInit(): void {
  }


  isEven(num:number): boolean
  { 
    return num % 2== 0? true: false;
  }

}
