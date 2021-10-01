/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CHAPTER_ID_PAGE_QUERY
// ====================================================

export interface CHAPTER_ID_PAGE_QUERY_chapter_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (CHAPTER_ID_PAGE_QUERY_chapter_cover_sizes | null)[] | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks_cover_findSize {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  findSize: CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks_cover_findSize | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks {
  __typename: "LibraryBookEntity";
  _id: string;
  title: string | null;
  slug: string | null;
  totalChapters: number | null;
  cover: CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks_cover | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_book {
  __typename: "LibraryBookEntity";
  _id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  relatedBooks: (CHAPTER_ID_PAGE_QUERY_chapter_book_relatedBooks | null)[] | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_images_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_images {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (CHAPTER_ID_PAGE_QUERY_chapter_images_sizes | null)[] | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_nextChapter_cover_sizes {
  __typename: "MediaPictureEntitySize";
  url: string | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_nextChapter_cover {
  __typename: "MediaPictureEntity";
  _id: string;
  alt: string | null;
  sizes: (CHAPTER_ID_PAGE_QUERY_chapter_nextChapter_cover_sizes | null)[] | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter_nextChapter {
  __typename: "LibraryChapterEntity";
  _id: string;
  slug: string | null;
  title: string | null;
  number: number | null;
  cover: CHAPTER_ID_PAGE_QUERY_chapter_nextChapter_cover | null;
}

export interface CHAPTER_ID_PAGE_QUERY_chapter {
  __typename: "LibraryChapterEntity";
  _id: string;
  slug: string | null;
  number: number | null;
  title: string | null;
  cover: CHAPTER_ID_PAGE_QUERY_chapter_cover | null;
  book: CHAPTER_ID_PAGE_QUERY_chapter_book | null;
  images: (CHAPTER_ID_PAGE_QUERY_chapter_images | null)[] | null;
  nextChapter: (CHAPTER_ID_PAGE_QUERY_chapter_nextChapter | null)[] | null;
}

export interface CHAPTER_ID_PAGE_QUERY {
  chapter: CHAPTER_ID_PAGE_QUERY_chapter | null;
}

export interface CHAPTER_ID_PAGE_QUERYVariables {
  slug: string;
}
