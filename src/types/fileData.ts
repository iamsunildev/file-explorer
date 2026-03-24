
export interface FilesType {
    id: number,
    is_folder: boolean,
    name: string,
    child: FilesType[]
}