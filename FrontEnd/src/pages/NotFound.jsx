import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main className="grid min-h-[90vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center tracking-normal">
          <p className="text-base font-semibold text-tomato">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-tomato px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-tomato-hov focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-tomato sm:text-7xl">
            Potato.
          </h1>
        </div>
      </main>
    </>
  );
};

export default NotFound;
