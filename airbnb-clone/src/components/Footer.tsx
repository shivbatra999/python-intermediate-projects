import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 px-8 py-14 text-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-6">
          <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">ABOUT</h5>
            <p className="cursor-pointer hover:underline">How Airbnb works</p>
            <p className="cursor-pointer hover:underline">Newsroom</p>
            <p className="cursor-pointer hover:underline">Investors</p>
            <p className="cursor-pointer hover:underline">Airbnb Plus</p>
            <p className="cursor-pointer hover:underline">Airbnb Luxe</p>
          </div>

          <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">COMMUNITY</h5>
            <p className="cursor-pointer hover:underline">Accessibility</p>
            <p className="cursor-pointer hover:underline">This is not a real site</p>
            <p className="cursor-pointer hover:underline">Its a pretty awesome clone</p>
            <p className="cursor-pointer hover:underline">Referrals accepted</p>
            <p className="cursor-pointer hover:underline">Papafam</p>
          </div>

          <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">HOST</h5>
            <p className="cursor-pointer hover:underline">Papa React</p>
            <p className="cursor-pointer hover:underline">Presents</p>
            <p className="cursor-pointer hover:underline">Zero to Full Stack Hero</p>
            <p className="cursor-pointer hover:underline">Hundreds of Students</p>
            <p className="cursor-pointer hover:underline">Join Now</p>
          </div>

          <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">SUPPORT</h5>
            <p className="cursor-pointer hover:underline">Help Centre</p>
            <p className="cursor-pointer hover:underline">Trust & Safety</p>
            <p className="cursor-pointer hover:underline">Say Hi YouTube</p>
            <p className="cursor-pointer hover:underline">Easter Eggs</p>
            <p className="cursor-pointer hover:underline">For the Win</p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-14 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Airbnb Clone. No rights reserved - this is a demo.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                Privacy Policy
              </p>
              <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                Terms of Service
              </p>
              <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                Sitemap
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
