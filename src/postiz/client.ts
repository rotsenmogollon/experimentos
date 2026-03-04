import axios, { type AxiosInstance } from "axios";
import { createReadStream } from "node:fs";
import type {
  PostizIntegration,
  PostizMediaFile,
  CreatePostBody,
  PostizListPost,
} from "./types.js";

export function createPostizClient(
  baseUrl: string,
  apiKey: string
): {
  listIntegrations: () => Promise<PostizIntegration[]>;
  uploadMedia: (filePath: string) => Promise<PostizMediaFile>;
  createPost: (body: CreatePostBody) => Promise<unknown>;
  listPosts: (params: { startDate: string; endDate: string }) => Promise<{
    posts: PostizListPost[];
  }>;
  deletePost: (id: string) => Promise<{ id: string }>;
} {
  const api: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
    },
  });

  async function listIntegrations(): Promise<PostizIntegration[]> {
    const { data } = await api.get<PostizIntegration[]>("/integrations");
    return data;
  }

  async function uploadMedia(filePath: string): Promise<PostizMediaFile> {
    const FormData = (await import("form-data")).default;
    const form = new FormData();
    form.append("file", createReadStream(filePath));

    const { data } = await api.post<PostizMediaFile>("/upload", form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    return data;
  }

  async function createPost(body: CreatePostBody): Promise<unknown> {
    const { data } = await api.post("/posts", body);
    return data;
  }

  async function listPosts(params: {
    startDate: string;
    endDate: string;
  }): Promise<{ posts: PostizListPost[] }> {
    const { data } = await api.get<{ posts: PostizListPost[] }>("/posts", {
      params,
    });
    return data;
  }

  async function deletePost(id: string): Promise<{ id: string }> {
    const { data } = await api.delete<{ id: string }>(`/posts/${id}`);
    return data;
  }

  return { listIntegrations, uploadMedia, createPost, listPosts, deletePost };
}
