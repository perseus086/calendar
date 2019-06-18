/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeleteAllRemidersDialogComponent, DeleteAllRemidersDialogModule } from './delete-all-remiders-dialog.component';

xdescribe('DeleteAllRemidersDialogComponent', () => {
  let component: DeleteAllRemidersDialogComponent;
  let fixture: ComponentFixture<DeleteAllRemidersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteAllRemidersDialogModule
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(DeleteAllRemidersDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
