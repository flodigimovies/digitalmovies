import { supabase } from './supabaseClient'

export async function login(authDetail) {
  let data, error

  if (authDetail.phone) {
    // Normalize phone: convert 09XXXXXXXXX to +639XXXXXXXXX
    const normalizedPhone = authDetail.phone.startsWith('0')
      ? '+63' + authDetail.phone.slice(1)
      : authDetail.phone

    const result = await supabase.auth.signInWithPassword({
      phone: normalizedPhone,
      password: authDetail.password,
    })
    data = result.data
    error = result.error
  } else {
    const result = await supabase.auth.signInWithPassword({
      email: authDetail.email,
      password: authDetail.password,
    })
    data = result.data
    error = result.error
  }

  if (error) throw { message: error.message, status: error.status }

  if (!data.session) {
    throw { message: "Login failed. Please check your credentials and try again." }
  }

  sessionStorage.setItem("token", JSON.stringify(data.session.access_token))
  sessionStorage.setItem("cbid", JSON.stringify(data.user.id))

  return { accessToken: data.session.access_token, user: data.user }
}

export async function register(authDetail) {
  let data, error

  // Normalize phone: convert 09XXXXXXXXX to +639XXXXXXXXX
  const normalizedPhone = authDetail.phone
    ? authDetail.phone.startsWith('0')
      ? '+63' + authDetail.phone.slice(1)
      : authDetail.phone
    : null

  if (normalizedPhone) {
    const result = await supabase.auth.signUp({
      phone: normalizedPhone,
      password: authDetail.password,
      options: {
        data: { name: authDetail.name }
      }
    })
    data = result.data
    error = result.error
  } else {
    const result = await supabase.auth.signUp({
      email: authDetail.email,
      password: authDetail.password,
      options: {
        data: { name: authDetail.name }
      }
    })
    data = result.data
    error = result.error
  }

  if (error) throw { message: error.message, status: error.status }

  if (!data.session) {
    throw { message: "Registration successful! Please check your phone for OTP verification." }
  }

  sessionStorage.setItem("token", JSON.stringify(data.session.access_token))
  sessionStorage.setItem("cbid", JSON.stringify(data.user.id))

  return { accessToken: data.session.access_token, user: data.user }
}

export async function logout() {
  await supabase.auth.signOut()
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("cbid")
}