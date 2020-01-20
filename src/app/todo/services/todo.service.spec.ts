import { TestBed } from "@angular/core/testing";

import { TodoService } from "./todo.service";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TodoService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NoopAnimationsModule]
    })
  );

  it("should be created", () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });
});
