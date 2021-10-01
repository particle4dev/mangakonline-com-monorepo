/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HOME_PAGE_QUERY
// ====================================================

export interface HOME_PAGE_QUERY_books_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface HOME_PAGE_QUERY_books_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface HOME_PAGE_QUERY_books_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: HOME_PAGE_QUERY_books_edges_cover_findSize | null;
}

export interface HOME_PAGE_QUERY_books_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: HOME_PAGE_QUERY_books_edges_cover | null;
}

export interface HOME_PAGE_QUERY_books {
  __typename: "LibraryBookEntityCursorPagingConnection";
  pageInfo: HOME_PAGE_QUERY_books_pageInfo | null;
  edges: (HOME_PAGE_QUERY_books_edges | null)[] | null;
}

export interface HOME_PAGE_QUERY_actionBooks_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface HOME_PAGE_QUERY_actionBooks_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface HOME_PAGE_QUERY_actionBooks_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: HOME_PAGE_QUERY_actionBooks_edges_cover_findSize | null;
}

export interface HOME_PAGE_QUERY_actionBooks_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: HOME_PAGE_QUERY_actionBooks_edges_cover | null;
}

export interface HOME_PAGE_QUERY_actionBooks {
  __typename: "LibraryBookEntityCursorPagingConnection";
  pageInfo: HOME_PAGE_QUERY_actionBooks_pageInfo | null;
  edges: (HOME_PAGE_QUERY_actionBooks_edges | null)[] | null;
}

export interface HOME_PAGE_QUERY_comedyBooks_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface HOME_PAGE_QUERY_comedyBooks_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface HOME_PAGE_QUERY_comedyBooks_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: HOME_PAGE_QUERY_comedyBooks_edges_cover_findSize | null;
}

export interface HOME_PAGE_QUERY_comedyBooks_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: HOME_PAGE_QUERY_comedyBooks_edges_cover | null;
}

export interface HOME_PAGE_QUERY_comedyBooks {
  __typename: "LibraryBookEntityCursorPagingConnection";
  pageInfo: HOME_PAGE_QUERY_comedyBooks_pageInfo | null;
  edges: (HOME_PAGE_QUERY_comedyBooks_edges | null)[] | null;
}

export interface HOME_PAGE_QUERY_popularBooks_edges_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface HOME_PAGE_QUERY_popularBooks_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: HOME_PAGE_QUERY_popularBooks_edges_cover_findSize | null;
}

export interface HOME_PAGE_QUERY_popularBooks_edges {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: HOME_PAGE_QUERY_popularBooks_edges_cover | null;
}

export interface HOME_PAGE_QUERY_popularBooks {
  __typename: "LibraryBookEntityCursorPagingConnection";
  edges: (HOME_PAGE_QUERY_popularBooks_edges | null)[] | null;
}

export interface HOME_PAGE_QUERY {
  books: HOME_PAGE_QUERY_books | null;
  actionBooks: HOME_PAGE_QUERY_actionBooks | null;
  comedyBooks: HOME_PAGE_QUERY_comedyBooks | null;
  popularBooks: HOME_PAGE_QUERY_popularBooks | null;
}

export interface HOME_PAGE_QUERYVariables {
  afterNewReleaseBooks?: string | null;
  afterActionBooks?: string | null;
  afterComedyBooks?: string | null;
  skipBooks?: boolean | null;
  skipActionBooks?: boolean | null;
  skipComedyBooks?: boolean | null;
  skipPopularBooks?: boolean | null;
}
