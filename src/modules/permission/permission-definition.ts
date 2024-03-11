import { PermissionDefinitionConfig } from './dtos/permission-definition-config.dto';

/**
 * @description
 * Permission metadata used internally in generating the GraphQL `Permissions` enum.
 *
 * @internal
 */
export type PermissionMetadata = Required<PermissionDefinitionConfig>;

/**
 * @description
 * Defines a new Permission with which to control access to GraphQL resolvers & REST controllers.
 * Used in conjunction with the {@link Allow} decorator (see example below).
 *
 * **Note:** To define CRUD permissions, use the {@link CrudPermissionDefinition}.
 *
 * @example
 * ```TypeScript
 * export const sync = new PermissionDefinition({
 *   name: 'SyncInventory',
 *   description: 'Allows syncing stock levels via Admin API'
 * });
 * ```
 *
 * ```TypeScript
 * const config: VendureConfig = {
 *   authOptions: {
 *     customPermissions: [sync],
 *   },
 * }
 * ```
 *
 * ```TypeScript
 * \@Resolver()
 * export class ExternalSyncResolver {
 *
 *   \@Allow(sync.Permission)
 *   \@Mutation()
 *   syncStockLevels() {
 *     // ...
 *   }
 * }
 * ```
 * @docsCategory auth
 * @docsPage PermissionDefinition
 * @docsWeight 0
 */
export class PermissionDefinition {
  constructor(protected config: PermissionDefinitionConfig) {}

  /** @internal */
  getMetadata(): PermissionMetadata[] {
    const { name, description, assignable, internal } = this.config;
    return [
      {
        name,
        description: description || `Grants permissions on ${name} operations`,
        assignable: assignable ?? true,
        internal: internal ?? false,
      },
    ];
  }

  /**
   * @description
   * Returns the permission defined by this definition, for use in the
   * {@link Allow} decorator.
   */
  get Permission() {
    return this.config.name;
  }

  get name() {
    return this.config.name;
  }

  get description() {
    return this.config.description;
  }
}

/**
 * @description
 * Defines a set of CRUD Permissions for the given name, i.e. a `name` of 'Wishlist' will create
 * 4 Permissions: 'CreateWishlist', 'ReadWishlist', 'UpdateWishlist' & 'DeleteWishlist'.
 *
 * @example
 * ```TypeScript
 * export const wishlist = new CrudPermissionDefinition('Wishlist');
 * ```
 *
 * ```TypeScript
 * const config: VendureConfig = {
 *   authOptions: {
 *     customPermissions: [wishlist],
 *   },
 * }
 * ```
 *
 * ```TypeScript
 * \@Resolver()
 * export class WishlistResolver {
 *
 *   \@Allow(wishlist.Create)
 *   \@Mutation()
 *   createWishlist() {
 *     // ...
 *   }
 * }
 * ```
 *
 * @docsCategory auth
 * @docsPage PermissionDefinition
 * @docsWeight 1
 */
export class CrudPermissionDefinition extends PermissionDefinition {
  constructor(
    name: string,
    internal?: boolean,
    private descriptionFn?: (operation: 'create' | 'read' | 'update' | 'delete') => string
  ) {
    super({ name, internal });
  }

  /** @internal */
  getMetadata(): PermissionMetadata[] {
    return ['Create', 'Read', 'Update', 'Delete'].map((operation) => ({
      name: `${operation}${this.config.name}`,
      description:
        typeof this.descriptionFn === 'function'
          ? this.descriptionFn(operation.toLocaleLowerCase() as any)
          : `Grants permission to ${operation.toLocaleLowerCase()} ${this.config.name}`,
      assignable: true,
      internal: this.config.internal,
    }));
  }

  extractNames() {
    return this.getMetadata().map((p) => p.name);
  }

  /**
   * @description
   * Returns the 'Create' CRUD permission defined by this definition, for use in the
   * {@link Allow} decorator.
   */
  get Create() {
    return new PermissionDefinition({ name: `Create${this.config.name}` });
  }

  /**
   * @description
   * Returns the 'Read' CRUD permission defined by this definition, for use in the
   * {@link Allow} decorator.
   */
  get Read() {
    return new PermissionDefinition({ name: `Read${this.config.name}` });
  }

  /**
   * @description
   * Returns the 'Update' CRUD permission defined by this definition, for use in the
   * {@link Allow} decorator.
   */
  get Update() {
    return new PermissionDefinition({ name: `Update${this.config.name}` });
  }

  /**
   * @description
   * Returns the 'Delete' CRUD permission defined by this definition, for use in the
   * {@link Allow} decorator.
   */
  get Delete() {
    return new PermissionDefinition({ name: `Delete${this.config.name}` });
  }
}
