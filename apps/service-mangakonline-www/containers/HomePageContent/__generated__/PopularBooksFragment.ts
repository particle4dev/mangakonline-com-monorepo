/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PopularBooksFragment
// ====================================================

export interface PopularBooksFragment_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface PopularBooksFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: PopularBooksFragment_cover_findSize | null;
}

export interface PopularBooksFragment {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: PopularBooksFragment_cover | null;
}
