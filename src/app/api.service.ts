import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  pullSongs() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    const baseUrl = 'https://andrew-tate.s3.eu-west-1.amazonaws.com'
    const soundsFile = '/sounds.json'

    return this.httpClient.get<Array<any>>(baseUrl + soundsFile,httpOptions)
      // TODO: add photo:string
      .pipe(map((data:Array<any>) => {
          console.log(JSON.stringify(data))
        const sounds = []
        //TODO:replace with map
          for(let link of data) {
            if(!link.file.startsWith("http")) {
              if(!link.file.startsWith("/")) {
                link.file = "/" + link.file;
              }
              link.file = baseUrl + link.file;
            }
            sounds.push({
              title: link.title,
              file: link.file,
              isPlaying: false,
              imgSrc: baseUrl + link.imgSrc
            });
          }

          return sounds;
        }));
  }
}
