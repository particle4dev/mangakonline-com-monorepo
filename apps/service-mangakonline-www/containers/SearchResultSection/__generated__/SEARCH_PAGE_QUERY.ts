/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SEARCH_PAGE_QUERY
// ====================================================

export interface SEARCH_PAGE_QUERY_mangas_edges_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface SEARCH_PAGE_QUERY_mangas_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (SEARCH_PAGE_QUERY_mangas_edges_cover_sizes | null)[] | null;
}

export interface SEARCH_PAGE_QUERY_mangas_edges {
  __typename: "SearchResultEntity";
  _id: string;
  slug: string | null;
  type: string | null;
  title: string | null;
  cover: SEARCH_PAGE_QUERY_mangas_edges_cover | null;
}

export interface SEARCH_PAGE_QUERY_mangas_pageInfo {
  __typename: "PageInfoWithOffset";
  limit: number | null;
  total: number | null;
}

export interface SEARCH_PAGE_QUERY_mangas {
  __typename: "SearchResultEntityConnection";
  edges: (SEARCH_PAGE_QUERY_mangas_edges | null)[] | null;
  pageInfo: SEARCH_PAGE_QUERY_mangas_pageInfo | null;
}

export interface SEARCH_PAGE_QUERY_chapters_edges_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface SEARCH_PAGE_QUERY_chapters_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (SEARCH_PAGE_QUERY_chapters_edges_cover_sizes | null)[] | null;
}

export interface SEARCH_PAGE_QUERY_chapters_edges {
  __typename: "SearchResultEntity";
  _id: string;
  slug: string | null;
  type: string | null;
  title: string | null;
  cover: SEARCH_PAGE_QUERY_chapters_edges_cover | null;
}

export interface SEARCH_PAGE_QUERY_chapters_pageInfo {
  __typename: "PageInfoWithOffset";
  limit: number | null;
  total: number | null;
}

export interface SEARCH_PAGE_QUERY_chapters {
  __typename: "SearchResultEntityConnection";
  edges: (SEARCH_PAGE_QUERY_chapters_edges | null)[] | null;
  pageInfo: SEARCH_PAGE_QUERY_chapters_pageInfo | null;
}

export interface SEARCH_PAGE_QUERY {
  mangas: SEARCH_PAGE_QUERY_mangas | null;
  chapters: SEARCH_PAGE_QUERY_chapters | null;
}

export interface SEARCH_PAGE_QUERYVariables {
  query?: string | null;
  limit?: number | null;
}
