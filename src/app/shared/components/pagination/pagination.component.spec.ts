import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PaginationComponent } from "./pagination.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { UtilsService } from "../../services/utils.service";
import { By } from "@angular/platform-browser";
import { first } from "rxjs";

describe('Pagination component', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PaginationComponent,
        CommonModule,
        RouterLink,
      ],
      providers: [UtilsService],
    });

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders correct pagination', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]'),
    );

    expect(pageContainers.length).toBe(5);
    expect(pageContainers[0].nativeElement.textContent).toContain("1");
  });

  it('should emit a clicked page', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]'),
    );
    let clickedPage: number | undefined;

    component.pageChangeEvent.pipe(first()).subscribe(page => {
      clickedPage = page;
    }); // таким чином ми перевіряємо тільки перший елемент

    pageContainers[0].triggerEventHandler('click'); // or pageContainers[0].nativeElement.click();

    expect(clickedPage).toEqual(1);
  });
});
