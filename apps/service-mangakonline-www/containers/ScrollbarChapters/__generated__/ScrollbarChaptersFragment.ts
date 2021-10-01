/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ScrollbarChaptersFragment
// ====================================================

export interface ScrollbarChaptersFragment_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface ScrollbarChaptersFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (ScrollbarChaptersFragment_cover_sizes | null)[] | null;
}

export interface ScrollbarChaptersFragment {
  __typename: "LibraryChapterEntity";
  _id: string;
  slug: string | null;
  title: string | null;
  number: number | null;
  cover: ScrollbarChaptersFragment_cover | null;
}
