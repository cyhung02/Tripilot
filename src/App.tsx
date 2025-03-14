// src/App.tsx
import JournifyApp from './components/JournifyApp';
import { ItineraryProvider } from './context/ItineraryContext';
import PWAManager from './components/PWAManager';

function App() {
    return (
        <ItineraryProvider>
            <div>
                <PWAManager />
                <JournifyApp />
            </div>
        </ItineraryProvider>
    );
}

export default App;