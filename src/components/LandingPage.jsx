import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-white text-gray-800">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex w-full max-w-5xl flex-col flex-1 px-4 md:px-10">
            
            {/* Header */}
            <header className="sticky top-4 z-50 flex items-center justify-between whitespace-nowrap rounded-full border border-gray-200 bg-white/80 px-6 py-3 backdrop-blur-md">
              <div className="flex items-center gap-4 text-gray-800">
                <div className="size-6 text-red-500">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">QuotationAI</h2>
              </div>
              <div className="hidden md:flex flex-1 items-center justify-end gap-8">
                <div className="flex items-center gap-9">
                  <a className="text-sm font-medium leading-normal text-gray-600 hover:text-red-500 transition-colors" href="#features">Features</a>
                  <a className="text-sm font-medium leading-normal text-gray-600 hover:text-red-500 transition-colors" href="https://github.com/yourusername/quotationai" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <Link 
                  to="/tool"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-gray-800 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-700 transition-shadow shadow-sm hover:shadow-lg"
                >
                  <span className="truncate">Try Now - Free</span>
                </Link>
              </div>
              <button className="md:hidden flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </header>

            <main className="flex flex-col gap-16 md:gap-24 mt-16">
              
              {/* Hero Section */}
              <section className="relative flex flex-col items-center justify-center gap-6 text-center md:gap-8 py-10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,193,7,0.1),rgba(255,255,255,0))]"></div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl text-gray-800">
                    Smart quotations. <span className="text-red-500">Instantly.</span> Beautifully.
                  </h1>
                  <h2 className="text-base font-medium leading-normal text-gray-600 md:text-lg max-w-2xl">
                    QuotationAI instantly generates professional project quotations so you can focus on winning more bids, not on paperwork. Free & Open Source.
                  </h2>
                </div>
                <Link 
                  to="/tool"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-red-500 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-600 transition-shadow shadow-md hover:shadow-xl"
                >
                  <span className="truncate">Generate Your First Quote for Free</span>
                </Link>
              </section>

              {/* Features Section */}
              <section id="features" className="flex flex-col gap-10 py-10">
                <div className="flex flex-col gap-3 text-center">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl text-gray-800">
                    Everything you need to create winning quotes
                  </h2>
                  <p className="text-base font-normal leading-normal text-gray-600 max-w-3xl mx-auto">
                    Our powerful features are designed to save you time and help you create professional, accurate quotations with ease.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-purple-100 text-purple-600">
                      <span className="material-symbols-outlined">auto_awesome</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold leading-tight text-gray-800">AI-Powered Generation</h3>
                      <p className="text-sm font-normal leading-normal text-gray-600">
                        Leverage our AI to generate accurate quotations in just a few clicks, saving you hours of manual work.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-green-100 text-green-600">
                      <span className="material-symbols-outlined">tune</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold leading-tight text-gray-800">Easy Customization</h3>
                      <p className="text-sm font-normal leading-normal text-gray-600">
                        Easily apply discounts, select from multiple currencies, and tailor every detail to fit your client's needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-blue-100 text-blue-600">
                      <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold leading-tight text-gray-800">Professional Output</h3>
                      <p className="text-sm font-normal leading-normal text-gray-600">
                        Export your quotations as beautifully formatted, professional PDF documents ready to send to clients.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-yellow-100 text-yellow-600">
                      <span className="material-symbols-outlined">devices</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-bold leading-tight text-gray-800">Elegant & Responsive UI</h3>
                      <p className="text-sm font-normal leading-normal text-gray-600">
                        Enjoy a seamless experience on any device with our modern and intuitive user interface designed for efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Demo Video Section */}
              <section className="p-4">
                <div className="relative flex items-center justify-center bg-gray-300 bg-cover bg-center aspect-video rounded-xl p-4 shadow-2xl shadow-red-500/20 border border-gray-200" 
                     style={{backgroundImage: 'linear-gradient(rgba(16, 19, 34, 0.4) 0%, rgba(16, 19, 34, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnff8Ki5mQhZSUrKMGYpbdIsakp8uR6cVvRdIun0sFYjCrHo8xRoCCAR1ttDtuNX3hAuK5sZapgJif4UyIyy36_0d6_5pOFdFZpvyQxKyMkNiJh8m_fYifMkkQzhetaSBjmL7OfyH0-09vM0iz42nZwRO-qIhd4CUMazvtEZtdd0vBRXuLr6l6Wgfuh4OhSP44r3R5sDV1J6gJocLzzjfID48QIrXj-6khkbVhzuI2bUGD_hTvsmnMyKRlBg6OiMndDQ0D7DqR0aHV")'}}>
                  <Link 
                    to="/tool"
                    className="flex shrink-0 items-center justify-center rounded-full size-16 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  </Link>
                </div>
              </section>

              {/* CTA Section */}
              <section className="flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-800 p-10 text-center md:gap-8 md:p-20">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl text-white">
                    Stop Wasting Time. Start Winning Bids.
                  </h2>
                  <p className="text-base font-normal leading-normal text-gray-300 max-w-2xl">
                    Experience the future of project quotations. It's fast, smart, and completely free to use. No signup required.
                  </p>
                </div>
                <Link 
                  to="/tool"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-red-500 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-600 transition-shadow shadow-md hover:shadow-xl"
                >
                  <span className="truncate">Try QuotationAI Now</span>
                </Link>
              </section>
            </main>

            {/* Footer */}
            <footer className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 text-sm text-gray-600 border-t border-gray-200 mt-16 md:mt-24">
              <p>© 2024 QuotationAI. Free & Open Source.</p>
              <div className="flex items-center gap-6">
                <a className="hover:text-red-500 transition-colors" href="https://github.com/yourusername/quotationai" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="hover:text-red-500 transition-colors" href="#">Documentation</a>
                <a className="hover:text-red-500 transition-colors" href="#">Report Issues</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;