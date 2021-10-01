/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BROWSE_PAGE_QUERY
// ====================================================

export interface BROWSE_PAGE_QUERY_categories_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface BROWSE_PAGE_QUERY_categories_edges_images_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface BROWSE_PAGE_QUERY_categories_edges_images {
  __typename: "MediaPictureEntity";
  _id: string;
  filename: string | null;
  alt: string | null;
  sizes: (BROWSE_PAGE_QUERY_categories_edges_images_sizes | null)[] | null;
}

export interface BROWSE_PAGE_QUERY_categories_edges {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
  slug: string | null;
  images: (BROWSE_PAGE_QUERY_categories_edges_images | null)[] | null;
}

export interface BROWSE_PAGE_QUERY_categories {
  __typename: "CatalogCategoryEntityCursorPagingConnection";
  pageInfo: BROWSE_PAGE_QUERY_categories_pageInfo | null;
  edges: (BROWSE_PAGE_QUERY_categories_edges | null)[] | null;
}

export interface BROWSE_PAGE_QUERY_newReleaseBooks_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface BROWSE_PAGE_QUERY_newReleaseBooks_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  type: string | null;
}

export interface BROWSE_PAGE_QUERY_newReleaseBooks_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: BROWSE_PAGE_QUERY_newReleaseBooks_edges_cover_findSize | null;
}

export interface BROWSE_PAGE_QUERY_newReleaseBooks_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: BROWSE_PAGE_QUERY_newReleaseBooks_edges_cover | null;
}

export interface BROWSE_PAGE_QUERY_newReleaseBooks {
  __typename: "LibraryBookEntityCursorPagingConnection";
  pageInfo: BROWSE_PAGE_QUERY_newReleaseBooks_pageInfo | null;
  edges: (BROWSE_PAGE_QUERY_newReleaseBooks_edges | null)[] | null;
}

export interface BROWSE_PAGE_QUERY {
  categories: BROWSE_PAGE_QUERY_categories | null;
  newReleaseBooks: BROWSE_PAGE_QUERY_newReleaseBooks | null;
}

export interface BROWSE_PAGE_QUERYVariables {
  afterCategories?: string | null;
  afterNewReleaseBooks?: string | null;
  skipCategories?: boolean | null;
  skipNewReleaseBooks?: boolean | null;
}
