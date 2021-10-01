/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewReleasesTabFragment
// ====================================================

export interface NewReleasesTabFragment_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  type: string | null;
}

export interface NewReleasesTabFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: NewReleasesTabFragment_cover_findSize | null;
}

export interface NewReleasesTabFragment {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: NewReleasesTabFragment_cover | null;
}
