import React, { createRef, useEffect } from 'react';
import ReactFitText from 'react-fittext'


function App() {

    const ref = createRef();

    useEffect(() => {
        setTimeout(() => {
            console.log(ref)
        }, 2000);
    }, [])

    return (
        <div className="App">
            213213123
            <ReactFitText>
  <h2>Testing React Fittext</h2>
</ReactFitText>
        </div>
    );
}
export default App;