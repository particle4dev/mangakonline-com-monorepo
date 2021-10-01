/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ScrollbarBooksFragment
// ====================================================

export interface ScrollbarBooksFragment_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface ScrollbarBooksFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: ScrollbarBooksFragment_cover_findSize | null;
}

export interface ScrollbarBooksFragment {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: ScrollbarBooksFragment_cover | null;
}
