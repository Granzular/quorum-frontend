import type { Resource } from "../models";
import {api} from "./client";

export async function getResources(): Promise<Resource[]>{
    const response = await api.get("library/resources/");
    console.log(response.data)
    return response.data.data;
}

export async function getResource(resourceId:string|undefined): Promise<Resource>{
    const response = await api.get(`library/resources/${resourceId}`);
    console.log(response.data)
    return response.data.data;
}