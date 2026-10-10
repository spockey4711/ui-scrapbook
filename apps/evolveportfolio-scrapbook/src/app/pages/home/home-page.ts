import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from './hero';
import { ScrapbookPolaroid } from '../../shared/scrapbook-polaroid';

@Component({
  imports: [RouterLink, Hero, ScrapbookPolaroid],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {}
