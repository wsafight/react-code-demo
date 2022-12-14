import React, { createRef, useEffect, useState } from 'react';
import { 
    tryRun,
    setReturnType
} from 'try-run-js'

setReturnType('tuple')

function App() {

    const ref = createRef(null);
    const [visible, setVisible] = useState(false);

    const getData = async () => {
        const [ error ] = await tryRun(Promise.reject(12))
        console.log(error)
    }

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 3000);

        tryRun(() => {
            const dom = document.getElementById('ppt')
            return dom.style
        }, {
            retryTime: 3,
            timeout: 3000
        }).then(res => {
            console.log(typeof res)
            console.log(res)
        })
        getData()
    }, [])

    return (
        <div className="App">
            {
                visible && <div id='ppt' ref={ref}>12321</div>
            }
        </div>
    );
}
export default App;