/**
 * @description
 * Configures a {@link PermissionDefinition}
 *
 * @docsCategory auth
 * @docsPage PermissionDefinition
 */
export class PermissionDefinitionConfig {
  /**
   * @description
   * The name of the permission. By convention this should be
   * UpperCamelCased.
   */
  name: string;
  /**
   * @description
   * A description of the permission.
   */
  description?: string;
  /**
   * @description
   * Whether this permission can be assigned to a Role. In general this
   * should be left as the default `true` except in special cases.
   *
   * @default true
   */
  assignable?: boolean;
  /**
   * @description
   * Internal permissions are not exposed via the API and are reserved for
   * special use-cases such at the `Owner` or `Public` permissions.
   *
   * @default false
   */
  internal?: boolean;
}
