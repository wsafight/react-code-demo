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

      
        let index = 1
        tryRun(() => {
            return Promise.race([new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 1000000)
            }), new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`error${index++}`)
                    reject('error')
                }, 1000)
            })])
        }, {
            retryTime: 3,
            timeout: 5000
        }).then(res => {
            console.log(typeof res)
            console.log(res)
        })

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