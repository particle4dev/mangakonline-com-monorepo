/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GenresTabFragment
// ====================================================

export interface GenresTabFragment_images_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface GenresTabFragment_images {
  __typename: "MediaPictureEntity";
  _id: string;
  filename: string | null;
  alt: string | null;
  sizes: (GenresTabFragment_images_sizes | null)[] | null;
}

export interface GenresTabFragment {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
  slug: string | null;
  images: (GenresTabFragment_images | null)[] | null;
}
