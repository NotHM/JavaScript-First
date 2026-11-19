/**
 * Lesson 18.2 Content-Negotiated REST Responder Strategies
 * Modeled directly after HansUXdev/Learn-MongoDB-4.x (chapters/06/src/web/responder/strategy/)
 *
 * Supports:
 *   - JSend:    Accept: application/json (default)
 *   - JSON:API: Accept: application/vnd.api+json
 *   - HAL+JSON: Accept: application/hal+json
 */

export class ResponderStrategy {
  constructor(contentType) {
    this.contentType = contentType;
  }

  render({ data = null, error = null, link = '/', resourceType = 'resource', idField = 'id' }) {
    void data;
    void error;
    void link;
    void resourceType;
    void idField;
    throw new Error('render() must be implemented by strategy subclass');
  }
}

export class JsendStrategy extends ResponderStrategy {
  constructor() {
    super('application/json; charset=utf-8');
  }

  render({ data = null, error = null, status = 200, link = '/', resourceType = 'items' }) {
    if (error) {
      const state = status >= 500 ? 'error' : 'fail';
      return {
        contentType: this.contentType,
        body: { status: state, message: error, link },
      };
    }

    const payloadData = Array.isArray(data) ? { [resourceType]: data } : { item: data };
    return {
      contentType: this.contentType,
      body: {
        status: 'success',
        link,
        data: payloadData,
      },
    };
  }
}

export class JsonApiStrategy extends ResponderStrategy {
  constructor() {
    super('application/vnd.api+json; charset=utf-8');
  }

  render({ data = null, error = null, status = 200, link = '/', resourceType = 'resource', idField = '_id' }) {
    if (error) {
      return {
        contentType: this.contentType,
        body: {
          links: { self: link },
          errors: [{ status: String(status), detail: error }],
        },
      };
    }

    const mapResource = (item) => {
      if (!item || typeof item !== 'object') return { type: resourceType, id: '0', attributes: { value: item } };
      const id = String(item[idField] ?? item.productKey ?? item.propertyKey ?? item.bookingKey ?? item._id ?? '0');
      const attributes = { ...item };
      delete attributes._id;
      return {
        type: item.category ?? item.propInfo?.type ?? resourceType,
        id,
        attributes,
      };
    };

    return {
      contentType: this.contentType,
      body: {
        links: { self: link },
        data: Array.isArray(data) ? data.map(mapResource) : mapResource(data),
      },
    };
  }
}

export class HalJsonStrategy extends ResponderStrategy {
  constructor() {
    super('application/hal+json; charset=utf-8');
  }

  render({ data = null, error = null, link = '/', resourceType = 'items', idField = '_id' }) {
    if (error) {
      return {
        contentType: this.contentType,
        body: {
          _links: { self: { href: link } },
          error,
        },
      };
    }

    if (Array.isArray(data)) {
      const embeddedItems = data.map((item) => {
        const itemId = item?.[idField] ?? item?.productKey ?? item?.propertyKey ?? item?._id;
        const selfHref = itemId !== undefined ? `${link.replace(/\/$/, '')}/${encodeURIComponent(String(itemId))}` : link;
        return {
          _links: { self: { href: selfHref } },
          ...item,
        };
      });
      return {
        contentType: this.contentType,
        body: {
          _links: { self: { href: link } },
          count: embeddedItems.length,
          _embedded: { [resourceType]: embeddedItems },
        },
      };
    }

    return {
      contentType: this.contentType,
      body: {
        _links: { self: { href: link } },
        ...(data && typeof data === 'object' ? data : { value: data }),
      },
    };
  }
}

export function negotiateResponder(acceptHeader = '') {
  const normalized = String(acceptHeader).toLowerCase();
  if (normalized.includes('application/vnd.api+json')) return new JsonApiStrategy();
  if (normalized.includes('application/hal+json')) return new HalJsonStrategy();
  return new JsendStrategy();
}
