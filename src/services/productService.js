import { supabase } from './supabaseClient'

export async function getProductList(searchTerm) {
  let query = supabase.from('products').select('*')

  if (searchTerm) {
    query = query.ilike('name', `%${searchTerm}%`)
  }

  const { data, error } = await query
  if (error) throw { message: error.message }
  return data
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw { message: error.message }
  return data
}

export async function getFeaturedList() {
  const { data, error } = await supabase
    .from('products').select('*')
    .eq('best_seller', true).eq('type', 'movie').limit(4)
  if (error) throw { message: error.message }
  return data
}

export async function getFeaturedVideoList() {
  const { data, error } = await supabase
    .from('products').select('*')
    .eq('type', 'video').eq('best_seller', true).limit(4)
  if (error) throw { message: error.message }
  return data
}

export async function getFeaturedMusicList() {
  const { data, error } = await supabase
    .from('products').select('*')
    .eq('type', 'music').eq('best_seller', true).limit(4)
  if (error) throw { message: error.message }
  return data
}