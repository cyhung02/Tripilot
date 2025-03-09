// src/App.tsx
import TravelApp from './components/japan-travel-app';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
    return (
        <ItineraryProvider>
            <div>
                <TravelApp />
            </div>
        </ItineraryProvider>
    );
}

export default App;