import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadTitleComponent } from './bread-title.component';

describe('BreadTitleComponent', () => {
  let component: BreadTitleComponent;
  let fixture: ComponentFixture<BreadTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
