import LaptopSpin from '../components/ui/laptop-spin';

const TestSpin = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Interactive Laptop Spin Test
                </h1>

                <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 shadow-2xl">
                    <div className="h-96 relative">
                        <LaptopSpin />
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-600">
                    <p className="text-lg">Drag the laptop to rotate it in 3D!</p>
                    <p className="text-sm mt-2">Works with both mouse and touch gestures</p>
                </div>
            </div>
        </div>
    );
};

export default TestSpin;