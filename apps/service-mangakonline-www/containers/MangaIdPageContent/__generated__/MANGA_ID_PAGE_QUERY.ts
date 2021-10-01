/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MANGA_ID_PAGE_QUERY
// ====================================================

export interface MANGA_ID_PAGE_QUERY_getReviews {
  __typename: "Review";
  id: number | null;
}

export interface MANGA_ID_PAGE_QUERY_book_categories {
  __typename: "CatalogCategoryEntity";
  _id: string;
  label: string | null;
  slug: string | null;
}

export interface MANGA_ID_PAGE_QUERY_book_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  type: string | null;
}

export interface MANGA_ID_PAGE_QUERY_book_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: MANGA_ID_PAGE_QUERY_book_cover_findSize | null;
}

export interface MANGA_ID_PAGE_QUERY_book_relatedBooks_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface MANGA_ID_PAGE_QUERY_book_relatedBooks_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: MANGA_ID_PAGE_QUERY_book_relatedBooks_cover_findSize | null;
}

export interface MANGA_ID_PAGE_QUERY_book_relatedBooks {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: MANGA_ID_PAGE_QUERY_book_relatedBooks_cover | null;
}

export interface MANGA_ID_PAGE_QUERY_book {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  totalChapters: number | null;
  description: string | null;
  createdAt: any | null;
  categories: (MANGA_ID_PAGE_QUERY_book_categories | null)[] | null;
  cover: MANGA_ID_PAGE_QUERY_book_cover | null;
  relatedBooks: (MANGA_ID_PAGE_QUERY_book_relatedBooks | null)[] | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_edges_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_edges_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (MANGA_ID_PAGE_QUERY_chapters_edges_cover_sizes | null)[] | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_edges_images_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
  width: number | null;
  height: number | null;
  orientation: number | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_edges_images {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (MANGA_ID_PAGE_QUERY_chapters_edges_images_sizes | null)[] | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_edges {
  __typename: "LibraryChapterEntity";
  _id: string;
  number: number | null;
  title: string | null;
  slug: string | null;
  releaseDate: any | null;
  cover: MANGA_ID_PAGE_QUERY_chapters_edges_cover | null;
  images: (MANGA_ID_PAGE_QUERY_chapters_edges_images | null)[] | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters_pageInfo {
  __typename: "PageInfoWithOffset";
  offset: number | null;
  limit: number | null;
  total: number | null;
}

export interface MANGA_ID_PAGE_QUERY_chapters {
  __typename: "LibraryChapterEntityOffsetPagingConnection";
  edges: (MANGA_ID_PAGE_QUERY_chapters_edges | null)[] | null;
  pageInfo: MANGA_ID_PAGE_QUERY_chapters_pageInfo | null;
}

export interface MANGA_ID_PAGE_QUERY {
  getReviews: (MANGA_ID_PAGE_QUERY_getReviews | null)[] | null;
  book: MANGA_ID_PAGE_QUERY_book | null;
  chapters: MANGA_ID_PAGE_QUERY_chapters | null;
}

export interface MANGA_ID_PAGE_QUERYVariables {
  slug: string;
  first?: number | null;
  offset?: number | null;
  skipReviews?: boolean | null;
  skipBook?: boolean | null;
}
