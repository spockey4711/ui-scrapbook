import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../site.data';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  readonly site = SITE;
}
