/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChapterDetailFragment
// ====================================================

export interface ChapterDetailFragment_categories {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
  slug: string | null;
}

export interface ChapterDetailFragment_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  type: string | null;
}

export interface ChapterDetailFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: ChapterDetailFragment_cover_findSize | null;
}

export interface ChapterDetailFragment {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  totalChapters: number | null;
  description: string | null;
  createdAt: any | null;
  categories: (ChapterDetailFragment_categories | null)[] | null;
  cover: ChapterDetailFragment_cover | null;
}
