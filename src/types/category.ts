export namespace Category {
  export interface SecondCategory {
    secondCategoryId: number;
    secondCategoryName: string;
    secondCategoryCnt: number;
  }

  export interface FirstCategory {
    firstCategoryId: number;
    firstCategoryName: string;
    secondCategoryList: SecondCategory[];
  }
}
