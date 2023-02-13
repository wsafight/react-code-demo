import React, { createRef, useEffect } from 'react';
import { StorageHelper, IndexedDBAdaptor } from 'storage-tools'


function App() {

    const ref = createRef();

    useEffect(() => {
        const store = new StorageHelper({
            storageKey: 'jump.1',
            version: 1,
            adapter: new IndexedDBAdaptor({
                dbName: 'test',
                storeName: 'test',
            })
        })

        store.whenReady().then(() => {
            console.log(store.get('createdOn'));
            console.log(store.getData())
            // store.setData('123213')
            // store.commit().then(() => {
                
            // })
                 
        })
    }, [])

    return (
        <div className="App">
            <div>
                测试动画
            </div>
        </div>
    );
}
export default App;