import type { Resource } from "../models";
import {api} from "./client";

export async function getResources(): Promise<Resource[]>{
    const response = await api.get("library/resources/");
    return response.data.data;
}

export async function getResource(resourceId:string): Promise<Resource>{
    const response = await api.get(`library/resources/${resourceId}`);
    return response.data.data;
}
