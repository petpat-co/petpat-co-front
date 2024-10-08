export namespace Category {
  export interface Category {
    firstCategoryId: number;
    firstCategoryName: string;
    secondCategory: Array<SecondCategory>;
  }

  export interface ThirdCategory {
    thirdCategoryId: number;
    thirdCategoryName: string;
    thirdCategoryCnt: number;
  }

  export interface SecondCategory {
    secondCategoryId: number;
    secondCategoryName: string;
    thirdCategoryList: ThirdCategory[];
  }

  export interface FirstCategory {
    firstCategoryId: number;
    firstCategoryName: string;
    firstCategoryCnt: number;
    secondCategoryList: SecondCategory[];
  }
}
