import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

    public peliculas!: Pelicula[];


    constructor(){
        this.peliculas=[
            new Pelicula("Spiderman 4",2019,'https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg'),
            new Pelicula("Avengers Endgame", 2020, 'https://i.blogs.es/d1f406/avengers-endgame-poster-cropped/1366_2000.jpg'),
            new Pelicula ("Encanto", 2021, 'https://i0.wp.com/www.homosensual.com/wp-content/uploads/2021/11/luisa-encanto-disney-e1637876305839.jpg?fit=1280%2C720&quality=80&ssl=1')    
          ];
    }
    holaMundo(){
        return 'Hola Mundo desde el servicio de Angular';
    }
    getPeliculas(){
        return this.peliculas
       
    }
}