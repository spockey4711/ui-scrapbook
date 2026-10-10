import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileCard } from './profile-card/profile-card';
import { TEAM_MEMBERS } from './team-member';

@Component({
  imports: [ProfileCard, RouterLink],
  selector: 'app-team-page',
  styleUrl: './team-page.css',
  templateUrl: './team-page.html',
})
export class TeamPage {
  readonly members = TEAM_MEMBERS;
}
