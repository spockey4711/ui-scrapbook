import { Component, input, signal } from '@angular/core';
import { TEAM_MEMBERS, TeamMember } from '../team-member';

@Component({
  imports: [],
  selector: 'app-profile-card',
  styleUrl: './profile-card.css',
  templateUrl: './profile-card.html',
})
export class ProfileCard {
  readonly member = input<TeamMember>(TEAM_MEMBERS[0]);
  readonly expanded = signal(false);
}
