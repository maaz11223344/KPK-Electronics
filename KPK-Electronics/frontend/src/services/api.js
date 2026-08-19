const API=import.meta.env.VITE_API_URL||'http://localhost:5000/api';
export const assetUrl=(path)=>path?.startsWith('http')?path:`${API.replace('/api','')}${path||''}`;
async function request(path,options={}){const token=localStorage.getItem('kpk-token');const headers={...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(token?{Authorization:`Bearer ${token}`}:{})};const r=await fetch(`${API}${path}`,{...options,headers});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.message||'Request failed');return data}
export const getProducts=(params={})=>{const qs=new URLSearchParams(Object.entries(params).filter(([,v])=>v!==''&&v!=null));return request(`/products?${qs}`)};
export const getProduct=slug=>request(`/products/${slug}`);
export const getBrands=(all=false)=>request(`/brands${all?'?all=true':''}`);
export const getCategories=(all=false)=>request(`/categories${all?'?all=true':''}`);
export const login=data=>request('/auth/login',{method:'POST',body:JSON.stringify(data)});
export const register=data=>request('/auth/register',{method:'POST',body:JSON.stringify(data)});
export const createOrder=data=>request('/orders',{method:'POST',body:JSON.stringify(data)});
export const myOrders=()=>request('/orders/mine');
export const getStats=()=>request('/admin/stats');
export const getAdminCustomers=()=>request('/admin/customers');
export const getAdminProducts=()=>request('/products/admin/all');
export const getOrders=()=>request('/orders');
export const updateOrderStatus=(id,status)=>request(`/orders/${id}/status`,{method:'PUT',body:JSON.stringify({status})});
export const createBrand=data=>request('/brands',{method:'POST',body:JSON.stringify(data)});
export const updateBrand=(id,data)=>request(`/brands/${id}`,{method:'PUT',body:JSON.stringify(data)});
export const deleteBrand=id=>request(`/brands/${id}`,{method:'DELETE'});
export const createCategory=data=>request('/categories',{method:'POST',body:JSON.stringify(data)});
export const updateCategory=(id,data)=>request(`/categories/${id}`,{method:'PUT',body:JSON.stringify(data)});
export const deleteCategory=id=>request(`/categories/${id}`,{method:'DELETE'});
export const createProduct=form=>request('/products',{method:'POST',body:form});
export const updateProduct=(id,form)=>request(`/products/${id}`,{method:'PUT',body:form});
export const archiveProduct=id=>request(`/products/${id}`,{method:'DELETE'});

export const getSettings=()=>request('/settings');
export const updateSettings=data=>request('/settings',{method:'PUT',body:JSON.stringify(data)});
