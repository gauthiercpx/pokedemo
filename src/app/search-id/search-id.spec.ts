import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchId } from './search-id';

describe('SearchId', () => {
  let component: SearchId;
  let fixture: ComponentFixture<SearchId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
