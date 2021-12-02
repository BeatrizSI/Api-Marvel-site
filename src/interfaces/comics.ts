export interface IImages {
    path: string,
    extension: string
}
export interface IComic {
    id: number
    title: string,
    description: string,
    thumbnail: IImages
}