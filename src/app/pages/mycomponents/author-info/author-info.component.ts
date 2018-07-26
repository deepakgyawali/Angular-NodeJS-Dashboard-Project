import { Component, Input, OnInit } from '@angular/core';

import { GetAuthorInfoService} from '../get-author-info/get-author-info.service'

import { AuthorInfoData } from '../data/author-info-data';
import { LegInfo } from '../data/leg-info'

@Component({
  selector: 'author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css'],
  providers: [ GetAuthorInfoService ]
})
export class AuthorInfoComponent implements OnInit {

    @Input('strategy-code') strategyCode: string;
    
    public author: string;
    public coAuthor: string;
    public description: string;
    public reference: string;
    public pubDate: string;
    public url: string;
    public startDate: string;
    public endDate: string;
    public summary: string;
    
  constructor(private dataService: GetAuthorInfoService) { }

  ngOnInit() 
  {
      var message = this.dataService.getDataFromUrl(this.strategyCode)
      .subscribe(
      (message: AuthorInfoData) => {
          
          //console.log(message);
          
          this.author = message.author;
          this.coAuthor = message.coAuthor;
          this.description = message.description;
          this.reference = message.reference;
          this.pubDate = message.pubDate;
          this.url = message.url;
          this.startDate = message.startDate;
          this.endDate = message.endDate;
          this.summary = message.summary;
          
      });
  }

}
