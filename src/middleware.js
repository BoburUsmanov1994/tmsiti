export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/customer/:path*",
    "/selected",
    "/cart",
  ],
};
