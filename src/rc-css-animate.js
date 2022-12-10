import React, { createRef, useEffect } from 'react';
import { CompatibleRAnimate } from 'rc-css-animate'
import 'animate.css'

function App() {

    const ref = createRef();

    useEffect(() => {
        setTimeout(() => {
            console.log(ref)
        }, 2000);
    }, [])

    return (
        <div className="App">
            <CompatibleRAnimate
                tag='div'
                ref={ref}
                clsPrefix='animate__'
                cls='animated bounce infinite'
                // cls='animated backInDown infinite'
                initialVisible={true}
                getVisibleWhenAnimateEnd={(cls) => {
                    if (cls.includes('Out')) {
                        return false
                    }
                    return true;
                }}
                onAnimationEnd={() => {
                    console.log('done')
                }}
            >
                <div>
                    测试动画
                </div>
            </CompatibleRAnimate>
        </div>
    );
}
export default App;