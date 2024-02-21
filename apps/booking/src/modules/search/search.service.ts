import {
  DeleteResponse,
  GetResponse,
  IndexResponse,
  IndicesCreateResponse,
  IndicesResponseBase,
  SearchResponse,
  UpdateResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService<T> {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public createIndex(index: string): Promise<IndicesCreateResponse> {
    return this.elasticsearchService.indices.create({ index });
  }

  public deleteIndex(index: string): Promise<IndicesResponseBase> {
    return this.elasticsearchService.indices.delete({ index });
  }

  public index(index: string, id: string, body: T): Promise<IndexResponse> {
    return this.elasticsearchService.index({
      index,
      id,
      document: body,
    });
  }

  public get(index: string, id: string): Promise<GetResponse<T>> {
    return this.elasticsearchService.get({
      index,
      id,
    });
  }

  public search(
    index: string,
    field: string,
    keyword: string,
  ): Promise<SearchResponse<T>> {
    return this.elasticsearchService.search({
      index,
      query: { match: { [field]: keyword } },
    });
  }

  public update(
    index: string,
    id: string,
    body: T,
  ): Promise<UpdateResponse<T>> {
    return this.elasticsearchService.update({
      index,
      id,
      doc: body,
    });
  }

  public delete(index: string, id: string): Promise<DeleteResponse> {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }
}
