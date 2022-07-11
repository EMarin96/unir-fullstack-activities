import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog.interface';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: Blog[] = [];
  title: string = "";
  image: string = "";
  body: string = "";
  date: string = "";

  constructor() {
    /* URLS DE PRUEBA 
    https://via.placeholder.com/1500/312E81/FFFFFF
    https://via.placeholder.com/1500/4C1D95/FFFFFF
    https://via.placeholder.com/1500/60A5FA/FFFFFF
    https://via.placeholder.com/1500/134E4A/FFFFFF
    https://via.placeholder.com/1500/881337/FFFFFF
    */

    this.blogs = [
      { 
        title: 'Mejores Comidas', 
        image: 'https://via.placeholder.com/1500/0000FF/FFFFFF',
        body: 'Mejores Comidas de todos los tiempos en el Mundo.',
        date: new Date("05/06/2022")  
      },
      { 
        title: 'Mejores Películas', 
        image: 'https://via.placeholder.com/1500/FF0000/FFFFFF',
        body: 'Mejores películas del cine en la Historia de Hollywood.',
        date: new Date("08/07/2022")   
      }
    ]
  }

  ngOnInit(): void {
  }

  saveBlog(): void {
    if(this.title !== "" && this.image !== "" && this.body !== "") {
      let milliseconds = Date.parse(this.date);
      console.log(this.title);
      if(isNaN(milliseconds)) {
        alert("Fecha inválida");
      } else {
        let blog: Blog = {
          title: this.title,
          image: this.image,
          body: this.body,
          date: new Date(this.date)
        }
        
        this.blogs.push(blog);
        this.cleanForm();
      }
    } else {
      alert("Todos los campos son requeridos.");
    }
  }

  cleanForm(): void {
    this.title = "";
    this.image = "";
    this.body = "";
    this.date = "";
  }
}
