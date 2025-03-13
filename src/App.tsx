// src/App.tsx
import JournifyApp from './components/JournifyApp';
import { ItineraryProvider } from './context/ItineraryContext';

function App() {
    return (
        <ItineraryProvider>
            <div>
                <JournifyApp />
            </div>
        </ItineraryProvider>
    );
}

export default App;