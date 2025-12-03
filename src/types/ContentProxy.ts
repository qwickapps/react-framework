/**
 * DataProxy class to enhance Data with nested property access
 * This class wraps a Data object and provides a proxy to allow
 * accessing nested properties using dot notation, e.g., {{company.name}}
 * 
 * Copyright (c) 2024 QwickApps.com. All rights reserved.
 */
import { Data, Field, FieldGroup, Action } from "./DataTypes";

/**
 * Enhanced data with nested property access for template resolution
 * Supports deep nested access like {{company.profile.address.city}}
 */
export class DataProxy implements Data {
  public name!: string;
  public type!: string;
  public title?: string;
  public subtitle?: string;
  public overline?: string;
  public icon?: string;
  public fields?: Field[];
  public fieldGroups?: FieldGroup[];
  public actions?: Action[];
  public repeatable?: boolean;
  public minRows?: number;
  public maxRows?: number;
  public autoCreate?: boolean;

  private data: Record<string, unknown>;

  constructor(content: Data, data: Record<string, unknown> = {}) {
    Object.assign(this, content);
    this.data = data;

    // Create proxy to enable nested property access
    return new Proxy(this, {
      get: (target, prop: string | symbol) => {
        // Return existing properties first
        if (prop in target || typeof prop === 'symbol') {
          return target[prop as keyof DataProxy];
        }

        // Handle nested property access for data
        return this.getNestedValue(String(prop));
      }
    });
  }

  /**
   * Get nested value from data using dot notation
   * Supports: company.name, user.profile.avatar.url, etc.
   */
  private getNestedValue(path: string): unknown {
    const keys = path.split('.');
    let current = this.data;

    for (const key of keys) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }

  /**
   * Set nested value in data using dot notation
   */
  public setNestedValue(path: string, value: unknown): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    let current = this.data;

    // Create nested objects as needed
    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[lastKey] = value;
  }

  /**
   * Get all data including nested structures
   */
  public getData(): Record<string, unknown> {
    return this.data;
  }

  /**
   * Update data while preserving nested structure
   */
  public updateData(newData: Record<string, unknown>): void {
    this.data = { ...this.data, ...newData };
  }
}
