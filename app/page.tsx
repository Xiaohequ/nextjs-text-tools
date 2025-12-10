import TextProcessor from "./components/TextProcessor";
import GoogleAdSense from "./components/GoogleAdSense";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] xl:grid-cols-[250px_1fr_250px] gap-4">
        {/* Left Ad */}
        <div className="hidden lg:block p-4">
          <div className="sticky top-4">
            <GoogleAdSense slot="3751926173" style={{ width: '100%', height: '600px' }} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <TextProcessor />
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block p-4">
          <div className="sticky top-4">
            <GoogleAdSense slot="9633425358" style={{ width: '100%', height: '600px' }} />
          </div>
        </div>
      </div>
    </main>
  );
}
