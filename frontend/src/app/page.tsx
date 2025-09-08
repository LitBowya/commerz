export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛍️ Welcome to Commerz
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Africa-targeted e-commerce platform with mobile money integration
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">📱 Mobile Money</h3>
              <p className="text-gray-600">
                Integrated with M-Pesa, MTN Mobile Money, and other African payment systems
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">🌍 Multi-Language</h3>
              <p className="text-gray-600">
                Support for 90+ African languages with cultural adaptation
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">📶 Offline Ready</h3>
              <p className="text-gray-600">
                Works seamlessly even with poor internet connectivity
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
