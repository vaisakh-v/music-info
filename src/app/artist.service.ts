import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root',
})
export class ArtistService {

  private itunezAPI:string = "https://itunes.apple.com/search";
  private itunezLimit:number = 1;

  private wikiMediaAPI:string = "https://commons.wikimedia.org/w/api.php?action=query&prop=images&redirects=1&format=json";
  private wikiMediaLimit:number = 1;

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

  getWikiMediaInfo(artist){
    return this.http.get(this.wikiMediaAPI+'?titles='+artist+'&imlimit='+this.wikiMediaLimit,{headers:{origin: 'https://www.mediawiki.org'}});
  }
}
