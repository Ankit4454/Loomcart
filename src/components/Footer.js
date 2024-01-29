import React from 'react';

function Footer() {
  return (<>
    <section className="w-full bg-white">
      <div className="px-10 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-12 lg:gap-20">
          <div className="col-span-3">
            <a href="/_" className="text-xl font-black leading-none text-gray-900 select-none logo">loomcart</a>
            <p className="my-4 text-xs leading-normal text-gray-500">
              Beautifully hand-crafted components to help you build amazing pages.
            </p>
          </div>
          <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Product</p>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Features</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Integrations</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Documentation</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">FAQs</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Pricing</a>
          </nav>
          <nav className="col-span-1 md:col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">About</p>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Our Story</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Company</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Privacy</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Blog</a>
          </nav>
          <nav className="col-span-2 md:col-span-1 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Contact</p>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Advertising</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Press</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Email</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Partners</a>
            <a href="/" className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2 hover:text-primary">Jobs</a>
          </nav>
          <div className="col-span-3">
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">SUBSCRIBE TO OUR NEWSLETTER</p>
            <form action="/" className="mb-2">
              <div className="relative flex items-center overflow-hidden border border-gray-200 rounded-lg">
                <input className="w-full px-3 py-2 text-base leading-normal transition duration-150 ease-in-out bg-white appearance-none focus:outline-none" type="email" placeholder="Enter your email" />
                <button className="px-3 py-2 text-xs text-sm font-medium text-center text-white no-underline bg-teal-700 hover:bg-teal-800 border-2 border-teal-700" type="submit">Subscribe</button>
              </div>
            </form>
            <p className="text-xs leading-normal text-gray-500">Get the latest updates and news about our service.</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
          <p className="mb-6 text-sm text-left text-gray-600 md:mb-0">© Copyright 2024 loomcart. All Rights Reserved.</p>
          <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
            <a href="/_" className="text-sm text-gray-600 transition hover:text-primary">Terms</a>
            <a href="/_" className="text-sm text-gray-600 transition hover:text-primary">Privacy</a>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Footer;