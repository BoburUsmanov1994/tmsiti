export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/customer-dashboard/:path*",
    "/selected",
    "/cart",
  ],
};
