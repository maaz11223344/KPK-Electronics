export function jsonParse(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return fallback; }
}

export function bool(value) { return Boolean(Number(value)); }

export function userView(row, includePassword = false) {
  if (!row) return null;
  const user = {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    phone: row.phone,
    addresses: jsonParse(row.addresses, [])
  };
  if (includePassword) user.password = row.password;
  return user;
}

export function brandView(row) {
  if (!row) return null;
  return { _id: row.id, id: row.id, name: row.name, slug: row.slug, country: row.country, description: row.description, logo: row.logo, active: bool(row.active), createdAt: row.created_at, updatedAt: row.updated_at };
}

export function categoryView(row) {
  if (!row) return null;
  return { _id: row.id, id: row.id, name: row.name, slug: row.slug, icon: row.icon, description: row.description, active: bool(row.active), createdAt: row.created_at, updatedAt: row.updated_at };
}

export function productView(row, brand = null, category = null) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    slug: row.slug,
    brand: brand ? brandView(brand) : row.brand_id,
    category: category ? categoryView(category) : row.category_id,
    sku: row.sku,
    price: Number(row.price),
    oldPrice: row.old_price == null ? null : Number(row.old_price),
    discount: Number(row.discount),
    stock: Number(row.stock),
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    warranty: row.warranty,
    shortDescription: row.short_description,
    description: row.description,
    specifications: jsonParse(row.specifications, {}),
    images: jsonParse(row.images, []),
    tags: jsonParse(row.tags, []),
    featured: bool(row.featured),
    bestSeller: bool(row.best_seller),
    active: bool(row.active),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function settingsView(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    key: row.setting_key,
    storeName: row.store_name,
    announcement: row.announcement,
    heroEyebrow: row.hero_eyebrow,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    heroPrimaryLabel: row.hero_primary_label,
    heroPrimaryUrl: row.hero_primary_url,
    heroSecondaryLabel: row.hero_secondary_label,
    heroSecondaryUrl: row.hero_secondary_url,
    heroAccent: row.hero_accent,
    freeShippingThreshold: Number(row.free_shipping_threshold),
    codEnabled: bool(row.cod_enabled),
    supportPhone: row.support_phone || '',
    supportEmail: row.support_email || '',
    primaryAccent: row.primary_accent,
    darkBackground: row.dark_background,
    lightText: row.light_text,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function orderView(order, items = [], user = null) {
  return {
    _id: order.id,
    id: order.id,
    user: user ? userView(user) : order.user_id,
    items: items.map(i => ({ _id: i.id, product: i.product_id, name: i.name, image: i.image || '', price: Number(i.price), quantity: Number(i.quantity) })),
    shipping: {
      fullName: order.shipping_full_name,
      phone: order.shipping_phone,
      address: order.shipping_address,
      city: order.shipping_city,
      province: order.shipping_province,
      postalCode: order.shipping_postal_code
    },
    subtotal: Number(order.subtotal),
    shippingFee: Number(order.shipping_fee),
    total: Number(order.total),
    paymentMethod: order.payment_method,
    status: order.status,
    createdAt: order.created_at,
    updatedAt: order.updated_at
  };
}
