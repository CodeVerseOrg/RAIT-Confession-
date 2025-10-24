import { Separator } from './components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-headline font-bold text-gray-100">RAIT Confession</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            An anonymous platform for RAIT students to share their thoughts, experiences, and feelings freely.
          </p>
          <Separator className="bg-gray-700" />
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
              Contact Us
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
              Community Guidelines
            </a>
          </div>
          <p className="text-sm text-gray-500">
            Made with ❤️ at RAIT Coder • © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
