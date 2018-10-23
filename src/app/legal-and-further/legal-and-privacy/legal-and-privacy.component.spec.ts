import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAndPrivacyComponent } from './legal-and-privacy.component';

describe('LegalAndPrivacyComponent', () => {
  let component: LegalAndPrivacyComponent;
  let fixture: ComponentFixture<LegalAndPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalAndPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalAndPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
