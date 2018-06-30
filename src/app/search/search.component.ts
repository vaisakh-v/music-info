import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'musicinfo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    ArtistService
  ]
})
export class SearchComponent implements OnInit {

  public searchVisible: boolean = false;
  public isImageLoaded: boolean = false;
  public artistData: object[];
  public artistItunez: object[];
  private placeHolderURI: string = "http://loremflickr.com/g/200/200/music";
  public imageWidth: string = "100";
  public imageHeight: string = "100";
  private query: string = "";

  constructor(private artistService: ArtistService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['query']) {
        this.query = params['query'];
      }
      console.log("Query: " + this.query);
    }, error => {
      this.query = "";
      console.log("Query: " + this.query);
    });
  }

  handleSearch(searchText) {
    this.getArtistInfo(searchText.value).subscribe(artists => {
      console.log("parsing:" + artists.artists);
      this.artistData = artists.artists;
      console.log("Artist count:" + this.artistData.length);

      this.artistData.forEach((artist, idx, arr) => {
        this.getArtistInfoFromItunez(artist['name']).subscribe(artists => {
          if (artists.results.length > 0) {
            artist['imageURL'] = artists.results[0].artworkUrl100;
          } else {
            artist['imageURL'] = this.placeHolderURI;
          }
          console.log("Fetching image for: " + artist['name'] + " from : " + artist['imageURL']);
        });
      });
      /*
      //For using wikimedia commons to fetch image. TODO: fix 
      this.artistData.forEach((artist, idx, arr) => {
        this.getArtistInfoFromWikiCommons(artist['name']).subscribe(artists => {
          let pageInfo = artists.query.pages;
          let imageInfo = [];
          for(let pageId in pageInfo){
            if(pageInfo.hasOwnProperty(pageId)){
              imageInfo = pageInfo[pageId].images;
            }
          }

          if(imageInfo){
            artist['imageURL'] = 'https://commons.wikimedia.org/wiki/Special:FilePath/'+imageInfo[0].title+'?width=200';
          } else {
            artist['imageURL'] = this.placeHolderURI;
          }
          console.log("Fetching image for: " + artist['name'] + " from : " + artist['imageURL']);
        });
      });
      */
      this.searchVisible = true;
    });
  }

  getArtistInfo(value): Observable<{ [artists: string]: any }> {
    console.log("Fetching artist info:" + value);
    return this.artistService.getData(value);
  }

  getArtistInfoFromItunez(value): Observable<{ [artists: string]: any }> {
    console.log("Fetching artist info:" + value);
    return this.artistService.getItunezInfo(encodeURI(value));
  }

  getArtistInfoFromWikiCommons(value): Observable<{ [artists: string]: any }> {
    console.log("Fetching artist info:" + value);
    return this.artistService.getWikiMediaInfo(encodeURI(value));
  }


  imageLoaded() {
    this.isImageLoaded = true;
  }

}
