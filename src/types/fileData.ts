
export interface FilesType {
    id: string,
    is_folder: boolean,
    name: string,
    child: FilesType[]
}