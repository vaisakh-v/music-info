import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'musicinfo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[
    ArtistService
  ]
})
export class SearchComponent implements OnInit {

  public searchVisible:boolean = false;
  public isImageLoaded:boolean = false;
  public artistData:object[];
  public artistItunez:object[];

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
  }

  handleSearch(searchText){
    this.getArtistInfo(searchText.value).subscribe(artists=>{
      console.log("parsing:" + artists.artists);
      this.artistData = artists.artists;
      console.log("Artist count:"+this.artistData.length);
    });

    this.searchVisible = true;
  }

  getArtistInfo(value):Observable<{[artists:string]:any}>{
    console.log("Fetching artist info:"+value);
    return this.artistService.getData(value);
  }

  getArtistImage(artistName){
    let imageSrc = "";
    this.getArtistInfoFromItunez(artistName).subscribe(artists=>{
      imageSrc = artists.results[0].artworkUrl100;
    });
    console.log("Fetching image for: "+ artistName+" from : "+ imageSrc);
    return imageSrc;
  }

  getArtistInfoFromItunez(value):Observable<{[artists:string]:any}>{
    console.log("Fetching artist info:"+value);
    return this.artistService.getItunezInfo(encodeURI(value));
  }

  imageLoaded(){
    this.isImageLoaded = true;
  }

}
