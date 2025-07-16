// types/contentful.d.ts
import { EntryFields } from 'contentful';

declare module 'contentful' {
  export interface Asset {
    fields: {
      title?: string;
      description?: string;
      file: {
        url: string;
        details: {
          size: number;
          image?: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  }

  export interface Entry<T> {
    sys: {
      id: string;
      type: string;
      createdAt: string;
      updatedAt: string;
      revision: number;
      contentType: {
        sys: {
          id: string;
          linkType: string;
          type: string;
        };
      };
    };
    fields: T;
    toPlainObject(): object;
  }
}