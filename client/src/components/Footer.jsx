import React from "react";
import {
  Facebook,
  GitBranchIcon,
  Github,
  GithubIcon,
  Instagram,
  LucideGithub,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-teal-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              About NxtGen Groceries
            </h3>
            <p className="text-sm">
              We are committed to providing fresh, organic produce and
              high-quality groceries to our community, supporting local farmers
              and sustainable practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Our Products
                </a>
              </li>
              <li>
                <Link
                  to={"/product/createproduct"}
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-200 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Green Street, Eco City, EC 12345</p>
            <p className="text-sm mb-2">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@nxtgengroceries.com</p>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-2">
              Subscribe to our newsletter for offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white text-green-800 placeholder-green-600 border-green-500 focus:border-green-400"
              />
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-green-500 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-200 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} NxtGen Groceries. All rights reserved.
          </p>
          <p className="text-sm flex gap-2  text-green-300">
            Developed by <span className="font-bold "> Pradeep Bisen </span>
            <a href="https://github.com/pradeepSDE">
              <LucideGithub size={24} className="text-white" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
