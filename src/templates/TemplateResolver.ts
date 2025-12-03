/** 
* ContentResolver provides a unified interface to fetch and render content
* using data providers, template resolvers, and optional caching.
* 
* Copyright (c) 2025 QwickApps.com. All rights reserved.
*/
import { Logger, getLogger } from '../utils/logger';
import { CachedDataProvider, DataResponse, ICacheProvider, IDataProvider, MemoryCacheProvider, Model, MustacheTemplateProvider, SelectOptions } from '@qwickapps/schema';
import {
  DataProxy,
  ITemplateResolver,
  TemplateProvider,
  TemplateResolverConfig
} from "../types";

/**
 * ContentResolver - Combines data, template, and cache providers
 * 
 * This class follows the orchestrator pattern:
 * - Delegates data fetching to IDataProvider
 * - Delegates template resolution to ITemplateResolver  
 * - Optionally wraps data provider with ICacheProvider
 * - Creates ContentProxy objects for framework compatibility
 * 
 * Usage:
 * ```typescript
 * const resolver = new ContentResolver({
 *   dataProvider: new JsonDataProvider({ data: {...} }),
 *   templateResolver: new MustacheTemplateResolver(),
 *   cacheProvider: new MemoryCacheProvider({ maxSize: 50, defaultTtl: 60000 })
 * });
 * 
 * // Or with boolean cacheProvider (uses default MemoryCacheProvider)
 * const resolver = new ContentResolver({
 *   dataProvider: new JsonDataProvider({ data: {...} }),
 *   cacheProvider: true
 * });
 * 
 * // Or no caching
 * const resolver = new ContentResolver({
 *   dataProvider: new JsonDataProvider({ data: {...} }),
 *   cacheProvider: false // or omit entirely
 * });
 * ```
 */
export class TemplateResolver implements ITemplateResolver {
  private dataProvider: IDataProvider;
  private templateResolver: TemplateProvider;
  private cacheProvider?: ICacheProvider<any[]>;  
  private enableLogging: boolean;
  private log: Logger;

  constructor(config: TemplateResolverConfig) {
    this.log = getLogger('ContentResolver');
    this.enableLogging = config.enableLogging || false;
    this.templateResolver = config.templateResolver || new MustacheTemplateProvider();
    if (config.cacheProvider === true) {
      const cacheProvider = new MemoryCacheProvider<any[]>({enableLogging: config.enableLogging || false});
      this.dataProvider = new CachedDataProvider(config.dataProvider);
    } else if (config.cacheProvider === false) {
      this.dataProvider = config.dataProvider;
    } else {
      const cacheProvider = new MemoryCacheProvider<any[]>({enableLogging: config.enableLogging || false});
      this.dataProvider = new CachedDataProvider(config.dataProvider);
    }

    
    this.log.debug('ContentResolver initialized', {
      dataProvider: config.dataProvider ? config.dataProvider.constructor.name : 'none',
      templateResolver: this.templateResolver.constructor.name,
      cacheProvider: config.cacheProvider ?
        (config.cacheProvider === true ? 'MemoryCacheProvider(default)' : config.cacheProvider.constructor.name) :
        'disabled'
    });
  }

  async get<T extends Model>(slug: string): Promise<DataResponse<T>> {
    return this.dataProvider.get<T>(slug);
  }

  async select<T extends Model>(schema: string, options?: SelectOptions): Promise<DataResponse<T[]>> {
    return this.dataProvider.select<T>(schema, options);
  }

  /**
   * Resolve template with lazy context loading
   */
  async resolveTemplate(template: string): Promise < string > {
      this.log.debug(`Resolving template: ${template}`);

      if(!template || !template.includes('{{')) {
      // No mustache syntax, return as-is
      return template;
    }

    // Create lazy context proxy
    const context = await this.createLazyContext(template);

    // Resolve using template resolver
    try {
      const resolved = this.templateResolver.resolve(template, context);
      this.log.debug(`Template resolved: ${template} -> ${resolved}`);
      return resolved;
    } catch (error) {
      this.log.debug(`Template resolution failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  /**
   * Create lazy loading context for template resolution
   * Only fetches data when accessed by mustache template
   */
  private async createLazyContext(template: string): Promise<unknown> {
    // Extract field group IDs from template
    const mustachePattern = /\{\{([^}]+)\}\}/g;
    const matches = Array.from(template.matchAll(mustachePattern));
    const fieldGroups = new Set<string>();

    for (const match of matches) {
      const fullPath = match[1].trim();
      const [fieldGroupId] = fullPath.split('.');
      fieldGroups.add(fieldGroupId);
    }

    // Fetch all needed data
    const contextData: Record<string, unknown> = {};

    for (const fieldGroupId of fieldGroups) {
      try {
        // First try to get it as an array using select
        const arrayData = await this.select(fieldGroupId);
        
        if (arrayData.data && arrayData.data.length > 0) {
          // Use first item for template context - use data directly
          contextData[fieldGroupId] = arrayData.data[0];
        } else {
          // Fallback to get single item
          const data = await this.get(fieldGroupId);
          if (data.data) {
            contextData[fieldGroupId] = data.data;
          }
        }
      } catch (error) {
        this.log.error(`Failed to load data for ${fieldGroupId}: ${error instanceof Error ? error.message : String(error)}`);
        // Continue with other field groups
      }
    }

    return contextData;
  }
}