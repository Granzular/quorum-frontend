export  interface Course{
    id:string,
    title: string|null,
    code:  string,
    level: string,
    unit: number|null,
    semester: string,
    synopsis: string|null,
    outline: string|null,
    drive_id: string,
    resource: string[]
}

export interface Resource{
    id: string,
    name: string,
    mime_type: string,
    size: string,
    drive_id: string,
    preview_url: string,
    download_url: string,
    file: null,
    is_active: boolean,
    created: string,
    updated: string

}