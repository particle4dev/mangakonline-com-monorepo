/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GENRES_ID_PAGE_QUERY
// ====================================================

export interface GENRES_ID_PAGE_QUERY_category {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
}

export interface GENRES_ID_PAGE_QUERY_books_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GENRES_ID_PAGE_QUERY_books_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  type: string | null;
}

export interface GENRES_ID_PAGE_QUERY_books_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: GENRES_ID_PAGE_QUERY_books_edges_cover_findSize | null;
}

export interface GENRES_ID_PAGE_QUERY_books_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: GENRES_ID_PAGE_QUERY_books_edges_cover | null;
}

export interface GENRES_ID_PAGE_QUERY_books {
  __typename: "LibraryBookEntityCursorPagingConnection";
  pageInfo: GENRES_ID_PAGE_QUERY_books_pageInfo | null;
  edges: (GENRES_ID_PAGE_QUERY_books_edges | null)[] | null;
}

export interface GENRES_ID_PAGE_QUERY {
  category: GENRES_ID_PAGE_QUERY_category | null;
  books: GENRES_ID_PAGE_QUERY_books | null;
}

export interface GENRES_ID_PAGE_QUERYVariables {
  slug: string;
  after?: string | null;
  skipCategory?: boolean | null;
}
