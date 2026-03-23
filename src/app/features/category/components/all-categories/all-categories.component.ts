import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ICategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-all-categories',
  imports: [RouterLink],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent {
  categories: ICategory[] = [];

  private categoryService = inject(CategoryService);
  private router = inject(Router);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(response)
      },
    });
  }

  goToCategoryDetails(id: string) {
    this.router.navigate(['/categories', id]);
  }
}
