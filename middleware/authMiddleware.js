import { NextResponse } from 'next/server';
import { supabase } from '../utils/supabaseClient';

export async function middleware(req) {
  const user = supabase.auth.user();

  if (!user) {
    return NextResponse.redirect('/auth/login');
  }

  // If user is authenticated, check their role and redirect accordingly
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userData.role === 'admin' && req.nextUrl.pathname !== '/dashboard/admin') {
    return NextResponse.redirect('/dashboard/admin');
  }

  if (userData.role === 'student' && req.nextUrl.pathname !== '/dashboard/student') {
    return NextResponse.redirect('/dashboard/student');
  }

  return NextResponse.next();
}

