export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  introduction: string;
  interests: string[];
  note: string;
  placeholder: boolean;
}

// Layout slots, not statements about the real team size or its members.
export const TEAM_MEMBERS: TeamMember[] = [1, 2, 3, 4].map((number) => ({
  id: `placeholder-${number}`,
  name: `Profil ${String(number).padStart(2, '0')}`,
  initials: String(number).padStart(2, '0'),
  introduction:
    'Hier ist Platz für eine persönliche Vorstellung: Was interessiert dich, was bringst du mit und was möchtest du gemeinsam im Team lernen?',
  interests: ['Interesse ergänzen', 'Skill ergänzen'],
  note: [
    'Was begeistert dich?',
    'Was möchtest du lernen?',
    'Was bringst du mit?',
    'Was macht dich aus?',
  ][number - 1],
  placeholder: true,
}));
