import React, { useEffect } from "react";

// PAGE IMPORT
import Home from "./Pages/Home";

function App() {
    useEffect(() => {
        document.body.style.margin = "0";
    });

    return (
        <div className="App">
            <Home />
        </div>
    );
}

export default App;
