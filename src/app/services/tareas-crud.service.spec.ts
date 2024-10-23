import { TestBed } from '@angular/core/testing';

import { TareasCrudService } from './tareas-crud.service';

describe('TareasCrudService', () => {
  let service: TareasCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
