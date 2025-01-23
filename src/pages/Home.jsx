import React from "react";
import { useState } from "react";
import {
  Play,
  Upload,
  Scissors,
  Layers,
  Volume2,
  Share2,
  Save,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                VideoForge
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-600 hover:text-gray-900">
                Features
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                Pricing
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button className="block text-gray-600 hover:text-gray-900 px-3 py-2 w-full text-left">
                Features
              </button>
              <button className="block text-gray-600 hover:text-gray-900 px-3 py-2 w-full text-left">
                Pricing
              </button>
              <button className="block bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 w-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Professional Video Editing
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Edit your videos like a pro with our intuitive online video editor.
            Cut, trim, add effects, and share your creations in minutes.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Start Editing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Feature
            </h2>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Cut and Trim
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Precisely trim your videos and remove unwanted sections with
                  frame-accurate controls.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Multiple Tracks
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Work with multiple video and audio tracks for complex
                  compositions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Volume2 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Audio Editing
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Add background music, adjust volume levels, and apply audio
                  effects.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Easy Upload
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Upload your videos directly from your device or import from
                  cloud storage.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Share Instantly
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Export and share your videos directly to social media
                  platforms.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Save className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  Auto-Save
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Never lose your progress with automatic project saving and
                  version history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
