/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CONTINUE_THE_MANGA_QUERY
// ====================================================

export interface CONTINUE_THE_MANGA_QUERY_chapters_edges_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface CONTINUE_THE_MANGA_QUERY_chapters_edges_cover {
  __typename: "MediaPictureEntity";
  alt: string | null;
  sizes: (CONTINUE_THE_MANGA_QUERY_chapters_edges_cover_sizes | null)[] | null;
}

export interface CONTINUE_THE_MANGA_QUERY_chapters_edges {
  __typename: "LibraryChapterEntity";
  slug: string | null;
  title: string | null;
  number: number | null;
  cover: CONTINUE_THE_MANGA_QUERY_chapters_edges_cover | null;
}

export interface CONTINUE_THE_MANGA_QUERY_chapters_pageInfo {
  __typename: "PageInfoWithCursor";
  hasNextPage: boolean;
  endCursor: string | null;
  total: number | null;
}

export interface CONTINUE_THE_MANGA_QUERY_chapters {
  __typename: "LibraryChapterEntityConnection";
  edges: (CONTINUE_THE_MANGA_QUERY_chapters_edges | null)[] | null;
  pageInfo: CONTINUE_THE_MANGA_QUERY_chapters_pageInfo | null;
}

export interface CONTINUE_THE_MANGA_QUERY {
  chapters: CONTINUE_THE_MANGA_QUERY_chapters | null;
}

export interface CONTINUE_THE_MANGA_QUERYVariables {
  slug: string;
}
