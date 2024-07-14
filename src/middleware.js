import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import {getUserRole} from "@/utils";

export { default } from "next-auth/middleware";

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect("/login");
  }

  const role = await getUserRole(req);
  const url = req.nextUrl.pathname;

  if (url.startsWith("/dashboard/customer/my-orders") && role !== "customer") {
    return NextResponse.redirect("/login");
  }

  if (url.startsWith("/dashboard/path*") && role !== "company") {
    return NextResponse.redirect("/auth/e-imzo");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/selected", "/cart"],
};



