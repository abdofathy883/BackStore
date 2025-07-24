import { Component } from '@angular/core';
import { CategoryService } from '../../../Services/Category/category.service';
import { PopUpService } from '../../../Services/PopUp/pop-up.service';
import { Category } from '../../../Models/Product/product';

@Component({
  selector: 'app-all-categories',
  imports: [],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent {
  constructor(
    private categoryService: CategoryService,
    private popUpService: PopUpService
  ) { }

  categories: Category[] = [];
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.GetAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openAddCategoryPopup() {
    this.popUpService.openPopup('addCategoryPopup');
  }
}
