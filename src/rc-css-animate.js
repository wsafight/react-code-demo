import React, { createRef, useEffect } from 'react';
import { CompatibleRAnimate, setPrefixCls } from 'rc-css-animate'
import 'animate.css'

setPrefixCls('animate__')

function block (props) {
    const { className, children } = props;

    return <div className={className} style={{ 
        background: 'red',
        padding: 100
     }}>
        {children}
    </div>
}

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
                tag={block}
                ref={ref}
                // clsPrefix='animate__'
                // cls='animated flipInY'
                cls='animated backInDown infinite'
                initialVisible={false}
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