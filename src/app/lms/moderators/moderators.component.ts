import { Component, OnInit } from '@angular/core';

interface Moderator{
  name:string;
  title:string;
  image:string;
}


@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.css']
})
export class ModeratorsComponent implements OnInit {

  moderators:Moderator[] = [
    {name:'Naomie Beaujour', title: 'Teacher', image:'https://png.pngtree.com/element_our/png/20181124/businessman-vector-icon-png_246587.jpg'},
    {name:'Wisner Celucus', title: 'Mentor', image:'https://f0.pngfuel.com/png/348/800/man-wearing-blue-shirt-illustration-png-clip-art.png'},
    {name:'Fara Jeanbart', title: 'Moderator', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2lgDguQcZmHjor0eEKenJYpNn69G7-dKxSQ&usqp=CAU'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
