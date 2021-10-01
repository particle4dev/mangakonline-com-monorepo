
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BookOrderField {
    CREATED_AT = "CREATED_AT",
    UPDATED_AT = "UPDATED_AT"
}

export class CreatingNewCategoryInput {
    slug: string;
    label: string;
    description?: Nullable<string>;
    parent?: Nullable<ObjectId>;
}

export class BookOrder {
    field: BookOrderField;
}

export class DeleteBookInput {
    slug: string;
}

export class DeleteChapterInput {
    id: string;
}

export class DeleteChaptersInput {
    ids: Nullable<string>[];
}

export class CreateNewBookInput {
    slug?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    cover?: Nullable<ObjectId>;
    categories?: Nullable<Nullable<ObjectId>[]>;
    connections?: Nullable<Nullable<string>[]>;
}

export class CreateNewChapterInput {
    slug?: Nullable<string>;
    title?: Nullable<string>;
    book?: Nullable<ObjectId>;
    cover?: Nullable<ObjectId>;
    number?: Nullable<number>;
    releaseDate?: Nullable<Date>;
    images?: Nullable<Nullable<ObjectId>[]>;
    connections?: Nullable<Nullable<string>[]>;
}

export class DeletePictureInput {
    id: string;
}

export class DeletePicturesInput {
    ids: Nullable<string>[];
}

export class AddNewPictureURLInput {
    url?: Nullable<string>;
    alt?: Nullable<string>;
}

export class CreateReviewInput {
    detail?: Nullable<string>;
}

export class AddNewDocumentInput {
    _id: string;
    slug?: Nullable<string>;
    title?: Nullable<string>;
    type?: Nullable<string>;
    cover?: Nullable<string>;
}

export interface Node {
    _id: string;
}

export interface PageInfo {
    total?: Nullable<number>;
}

export class Set {
    id: number;
    name?: Nullable<string>;
    year?: Nullable<number>;
    numParts?: Nullable<number>;
}

export abstract class IQuery {
    abstract allSets(): Nullable<Nullable<Set>[]> | Promise<Nullable<Nullable<Set>[]>>;

    abstract category(_id: string): Nullable<CatalogCategoryEntity> | Promise<Nullable<CatalogCategoryEntity>>;

    abstract findCategoryByLabel(label?: Nullable<string>): Nullable<CatalogCategoryEntity> | Promise<Nullable<CatalogCategoryEntity>>;

    abstract findCategoryBySlug(slug?: Nullable<string>): Nullable<CatalogCategoryEntity> | Promise<Nullable<CatalogCategoryEntity>>;

    abstract categories(first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>): Nullable<CatalogCategoryEntityCursorPagingConnection> | Promise<Nullable<CatalogCategoryEntityCursorPagingConnection>>;

    abstract findCategoriesByIds(ids: Nullable<ObjectId>[]): Nullable<Nullable<CatalogCategoryEntity>[]> | Promise<Nullable<Nullable<CatalogCategoryEntity>[]>>;

    abstract book(_id: string): Nullable<LibraryBookEntity> | Promise<Nullable<LibraryBookEntity>>;

    abstract findBookBySlug(slug: string): Nullable<LibraryBookEntity> | Promise<Nullable<LibraryBookEntity>>;

    abstract findBookByCategory(category: string, first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>): Nullable<LibraryBookEntityCursorPagingConnection> | Promise<Nullable<LibraryBookEntityCursorPagingConnection>>;

    abstract books(first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>, orderBy?: Nullable<BookOrder>): Nullable<LibraryBookEntityCursorPagingConnection> | Promise<Nullable<LibraryBookEntityCursorPagingConnection>>;

    abstract chapter(_id: string): Nullable<LibraryChapterEntity> | Promise<Nullable<LibraryChapterEntity>>;

    abstract chapters(first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>): Nullable<LibraryChapterEntityConnection> | Promise<Nullable<LibraryChapterEntityConnection>>;

    abstract findChapterBySlug(slug: string): Nullable<LibraryChapterEntity> | Promise<Nullable<LibraryChapterEntity>>;

    abstract findChapterByBookSlug(slug: string, first?: Nullable<number>, after?: Nullable<string>, last?: Nullable<number>, before?: Nullable<string>): Nullable<LibraryChapterEntityConnection> | Promise<Nullable<LibraryChapterEntityConnection>>;

    abstract findChaptersByBookSlugOffsetPaging(slug: string, first?: Nullable<number>, last?: Nullable<number>, offset?: Nullable<number>): Nullable<LibraryChapterEntityOffsetPagingConnection> | Promise<Nullable<LibraryChapterEntityOffsetPagingConnection>>;

    abstract picture(_id: string): Nullable<MediaPictureEntity> | Promise<Nullable<MediaPictureEntity>>;

    abstract getReviews(): Nullable<Nullable<Review>[]> | Promise<Nullable<Nullable<Review>[]>>;

    abstract review(id: string): Nullable<Review> | Promise<Nullable<Review>>;

    abstract search(query?: Nullable<string>, type?: Nullable<string>, limit?: Nullable<number>, offset?: Nullable<number>): Nullable<SearchResultEntityConnection> | Promise<Nullable<SearchResultEntityConnection>>;

    abstract user(_id: string): Nullable<AuthUserEntity> | Promise<Nullable<AuthUserEntity>>;

    abstract me(): Nullable<AuthUserEntity> | Promise<Nullable<AuthUserEntity>>;
}

export abstract class IMutation {
    abstract addSet(name?: Nullable<string>, year?: Nullable<string>, numParts?: Nullable<number>): Nullable<Set> | Promise<Nullable<Set>>;

    abstract login(username: string, password: string): Nullable<LoginPayload> | Promise<Nullable<LoginPayload>>;

    abstract refreshToken(refreshToken: string): Nullable<RefreshTokenPayload> | Promise<Nullable<RefreshTokenPayload>>;

    abstract createNewCategory(input: CreatingNewCategoryInput, skipError?: Nullable<boolean>): Nullable<CreatingNewCategoryPayload> | Promise<Nullable<CreatingNewCategoryPayload>>;

    abstract createNewBook(input: CreateNewBookInput, skipError?: Nullable<boolean>): Nullable<CreateNewBookPayload> | Promise<Nullable<CreateNewBookPayload>>;

    abstract createNewChapter(input: CreateNewChapterInput, skipError?: Nullable<boolean>): Nullable<CreateNewChapterPayload> | Promise<Nullable<CreateNewChapterPayload>>;

    abstract deleteBook(input: DeleteBookInput): Nullable<DeleteBookPayload> | Promise<Nullable<DeleteBookPayload>>;

    abstract deleteChapter(input: DeleteChapterInput): Nullable<DeleteChapterPayload> | Promise<Nullable<DeleteChapterPayload>>;

    abstract deleteChapters(input: DeleteChaptersInput): Nullable<DeleteChaptersPayload> | Promise<Nullable<DeleteChaptersPayload>>;

    abstract addNewPictureURL(input: AddNewPictureURLInput): Nullable<AddNewPictureURLPayload> | Promise<Nullable<AddNewPictureURLPayload>>;

    abstract addNewPicturesURL(input: Nullable<AddNewPictureURLInput>[]): Nullable<AddNewPicturesURLPayload> | Promise<Nullable<AddNewPicturesURLPayload>>;

    abstract deletePicture(input: DeletePictureInput): Nullable<DeletePicturePayload> | Promise<Nullable<DeletePicturePayload>>;

    abstract deletePictures(input: DeletePicturesInput): Nullable<DeletePicturesPayload> | Promise<Nullable<DeletePicturesPayload>>;

    abstract createReview(createReviewInput?: Nullable<CreateReviewInput>): Nullable<Review> | Promise<Nullable<Review>>;

    abstract addNewDocument(input: AddNewDocumentInput): Nullable<SearchResultEntity> | Promise<Nullable<SearchResultEntity>>;

    abstract addNewDocuments(input: Nullable<AddNewDocumentInput>[]): Nullable<Nullable<SearchResultEntity>[]> | Promise<Nullable<Nullable<SearchResultEntity>[]>>;
}

export class LoginPayload {
    accessToken: string;
}

export class RefreshTokenPayload {
    accessToken: string;
}

export class CreatingNewCategoryPayload {
    category?: Nullable<CatalogCategoryEntity>;
}

export class CatalogCategoryEntityCursorPagingConnection {
    pageInfo?: Nullable<PageInfoWithCursor>;
    edges?: Nullable<Nullable<CatalogCategoryEntity>[]>;
}

export class CatalogCategoryEntity implements Node {
    _id: string;
    slug?: Nullable<string>;
    label?: Nullable<string>;
    weight?: Nullable<number>;
    level?: Nullable<number>;
    description?: Nullable<string>;
    parent?: Nullable<CatalogCategoryEntity>;
    images?: Nullable<Nullable<MediaPictureEntity>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class PageInfoWithOffset implements PageInfo {
    offset?: Nullable<number>;
    total?: Nullable<number>;
    limit?: Nullable<number>;
}

export class PageInfoWithCursor implements PageInfo {
    endCursor?: Nullable<string>;
    startCursor?: Nullable<string>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total?: Nullable<number>;
}

export class DeleteBookPayload {
    _id?: Nullable<string>;
}

export class DeleteChapterPayload {
    _id?: Nullable<string>;
}

export class DeleteChaptersPayload {
    _ids?: Nullable<Nullable<string>[]>;
}

export class CreateNewBookPayload {
    book?: Nullable<LibraryBookEntity>;
}

export class CreateNewChapterPayload {
    chapter?: Nullable<LibraryChapterEntity>;
}

export class LibraryBookEntityCursorPagingConnection {
    pageInfo?: Nullable<PageInfoWithCursor>;
    edges?: Nullable<Nullable<LibraryBookEntity>[]>;
}

export class ConnectionEntity {
    id?: Nullable<string>;
    url?: Nullable<string>;
}

export class LibraryBookEntity implements Node {
    _id: string;
    title?: Nullable<string>;
    slug?: Nullable<string>;
    description?: Nullable<string>;
    cover?: Nullable<MediaPictureEntity>;
    categories?: Nullable<Nullable<CatalogCategoryEntity>[]>;
    totalChapters?: Nullable<number>;
    relatedBooks?: Nullable<Nullable<LibraryBookEntity>[]>;
    connections?: Nullable<Nullable<ConnectionEntity>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class LibraryChapterEntityConnection {
    pageInfo?: Nullable<PageInfoWithCursor>;
    edges?: Nullable<Nullable<LibraryChapterEntity>[]>;
}

export class LibraryChapterEntityOffsetPagingConnection {
    pageInfo?: Nullable<PageInfoWithOffset>;
    edges?: Nullable<Nullable<LibraryChapterEntity>[]>;
}

export class LibraryChapterEntity implements Node {
    _id: string;
    title?: Nullable<string>;
    slug?: Nullable<string>;
    number?: Nullable<number>;
    releaseDate?: Nullable<Date>;
    book?: Nullable<LibraryBookEntity>;
    cover?: Nullable<MediaPictureEntity>;
    images?: Nullable<Nullable<MediaPictureEntity>[]>;
    connections?: Nullable<Nullable<ConnectionEntity>[]>;
    nextChapter?: Nullable<Nullable<LibraryChapterEntity>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class DeletePicturePayload {
    _id?: Nullable<string>;
}

export class DeletePicturesPayload {
    _ids?: Nullable<Nullable<string>[]>;
}

export class AddNewPictureURLPayload {
    picture?: Nullable<MediaPictureEntity>;
}

export class AddNewPicturesURLPayload {
    pictures?: Nullable<Nullable<MediaPictureEntity>[]>;
}

export class MediaPictureEntitySize {
    url?: Nullable<string>;
    orientation?: Nullable<number>;
    width?: Nullable<number>;
    height?: Nullable<number>;
    type?: Nullable<string>;
}

export class MediaPictureEntityAspectRatio implements Node {
    _id: string;
    width?: Nullable<number>;
    height?: Nullable<number>;
    text?: Nullable<string>;
}

export class MediaPictureEntity implements Node {
    _id: string;
    filename?: Nullable<string>;
    alt?: Nullable<string>;
    sizes?: Nullable<Nullable<MediaPictureEntitySize>[]>;
    aspectRatio?: Nullable<MediaPictureEntityAspectRatio>;
    findSize?: Nullable<MediaPictureEntitySize>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export abstract class ISubscription {
    abstract reviewCreated(): Nullable<Review> | Promise<Nullable<Review>>;
}

export class Review {
    id?: Nullable<number>;
    detail?: Nullable<string>;
}

export class SearchResultEntity implements Node {
    _id: string;
    slug?: Nullable<string>;
    title?: Nullable<string>;
    type?: Nullable<string>;
    cover?: Nullable<MediaPictureEntity>;
}

export class SearchResultEntityConnection {
    pageInfo?: Nullable<PageInfoWithOffset>;
    edges?: Nullable<Nullable<SearchResultEntity>[]>;
}

export class AuthUserEntityEmail {
    address?: Nullable<string>;
    verified?: Nullable<boolean>;
}

export class AuthUserEntityProfile {
    picture?: Nullable<string>;
    fullname?: Nullable<string>;
}

export class AuthUserEntityServiceFacebook {
    id?: Nullable<string>;
    accessToken?: Nullable<string>;
    tokenExpire?: Nullable<Date>;
}

export class AuthUserEntityServicePassword {
    bcrypt?: Nullable<string>;
}

export class AuthUserEntityService {
    facebook?: Nullable<AuthUserEntityServiceFacebook>;
    password?: Nullable<AuthUserEntityServicePassword>;
}

export class AuthUserEntity implements Node {
    _id: string;
    username?: Nullable<string>;
    emails?: Nullable<Nullable<AuthUserEntityEmail>[]>;
    profile?: Nullable<AuthUserEntityProfile>;
    services?: Nullable<AuthUserEntityService>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export type ObjectId = any;
export type JSON = any;
export type JSONObject = any;
type Nullable<T> = T | null;
