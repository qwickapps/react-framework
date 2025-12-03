import { ICacheProvider, IDataProvider } from "@qwickapps/schema";
import { TemplateProvider } from "./TemplateProvider";

/**
 * Configuration for Data Provider orchestrator
 */

export interface TemplateResolverConfig {
  /** Data provider for fetching raw data */
  dataProvider: IDataProvider;
  /** Template resolver (optional, defaults to MustacheTemplateResolver) */
  templateResolver?: TemplateProvider;
  /** Cache provider (optional, defaults to MemoryCacheProvider, false = no cache) */
  cacheProvider?: ICacheProvider<unknown[]> | boolean;
  /** Enable debug logging */
  enableLogging?: boolean;
}/**
 * Content resolver interface
 * This is now an orchestrator that combines data, template, and cache providers
 */

export interface ITemplateResolver extends IDataProvider {
  /** Resolve template string with mustache syntax */
  resolveTemplate(template: string): Promise<string>;
}

