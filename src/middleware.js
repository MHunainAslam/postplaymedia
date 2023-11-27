import { NextResponse } from 'next/server'

export function middleware(request) {

  const url = request.nextUrl.clone()

  let islogin = request.cookies.get('logged');
  console.log(islogin)
  //if (request.nextUrl.pathname.startsWith('/activity'))
  //   if (request.nextUrl.pathname.startsWith('/activity')) {
  //     return NextResponse.rewrite(new URL('/', request.url))
  //   } else {
  //     if (url.pathname === "/") {
  //       url.pathname = "/activity";
  //       return NextResponse.redirect(url)
  //     }
  //   }
  // }
  if (!islogin) {
    // if (request.nextUrl.pathname.startsWith('/forums/:slug*')) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
    return NextResponse.redirect(new URL('/', request.url))

  }

 
}

// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'


// export function middleware(request) {
//   const path = request.nextUrl.pathname

//   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

//   const token = request.cookies.get('logged')?.value || ''

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL('/activity', request.nextUrl))
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }

// }


// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/login',
//     '/signup',
//     '/verifyemail'
//   ]
// }

export const config = {
  matcher: [
    '/about',
    '/activity',
    '/forums',
    '/forums/:path*',
    '/forums/:path*/:path*',
    '/groups',
    '/jobs',
    '/people',
    '/photos',
    '/watch',
  ]
}