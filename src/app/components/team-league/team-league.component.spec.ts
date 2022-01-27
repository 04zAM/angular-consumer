import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeagueComponent } from './team-league.component';

describe('TeamLeagueComponent', () => {
  let component: TeamLeagueComponent;
  let fixture: ComponentFixture<TeamLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
