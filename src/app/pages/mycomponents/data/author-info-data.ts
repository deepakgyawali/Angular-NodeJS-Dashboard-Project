import { Injectable } from "@angular/core";
import { LegInfo } from './leg-info';

export class AuthorInfoData 
{
    public code: string;
    public author: string;
    public coAuthor: string;
    public coAuthors: string[];
    public description: string;
    public summary: string;
    public details: string;
    public startDate: string;
    public endDate: string;
    public legs: LegInfo[];
    public market: string;
    public seasonal: boolean;
    public sector: string;
    public strategyType: string;
    public pubDate: string;
    public reference: string;
    public url: string;

}
