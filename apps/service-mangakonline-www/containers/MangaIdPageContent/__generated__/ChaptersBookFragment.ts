/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChaptersBookFragment
// ====================================================

export interface ChaptersBookFragment_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface ChaptersBookFragment_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (ChaptersBookFragment_cover_sizes | null)[] | null;
}

export interface ChaptersBookFragment_images_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  orientation: number | null;
}

export interface ChaptersBookFragment_images {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (ChaptersBookFragment_images_sizes | null)[] | null;
}

export interface ChaptersBookFragment {
  __typename: "LibraryChapterEntity";
  _id: string;
  number: number | null;
  title: string | null;
  slug: string | null;
  releaseDate: any | null;
  cover: ChaptersBookFragment_cover | null;
  images: (ChaptersBookFragment_images | null)[] | null;
}
