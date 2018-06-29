import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root',
})
export class ArtistService {

  private itunezAPI:string = "https://itunes.apple.com/search";
  private itunezLimit:number = 1;

  private musicBrainzAPI:string = "https://musicbrainz.org/ws/2/artist";
  private musicBrainzFormat:string = "json";

  constructor(private http:HttpClient) { }

  getData(queryArtist){
    //return this.http.get('../assets/data/artist.json');
    return this.http.get(this.musicBrainzAPI+'?query='+queryArtist+'&fmt='+this.musicBrainzFormat);
  }

  getItunezInfo(artist){
    return this.http.get(this.itunezAPI+'?term='+artist+'&limit='+this.itunezLimit);
  }
}
