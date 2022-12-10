import './App.css';
import { useState, Profiler, useMemo } from 'react';
import update from 'immutability-helper'

let trace = 1


const convertImmutabilityByPath = (
  path,
  value
) => {
  if (typeof path !== 'string' || !path) {
    return {}
  }

  if (!value || Object.prototype.toString.call(value) !== '[object Object]') {
    return {}
  }

  const keys = path.replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
    .filter(Boolean)

  const result = {}
  let current = result
  
  const len = keys.length
  
  keys.forEach((key, index) => {
    current[key] = index === len - 1 ? value : {}
    current = current[key]
  })

  return result
}

const getSchools = () => {
  let schools = []
  for(let i = 0; i< 10000; i++) {
    schools.push({
      name: `学校${i}`,
      start: '13',
      end: '13221'
    })
  }
  return schools
}

function App2() {

  const [user, setUser] = useState({
    name: 'wsa',
    company: {
      name: '测试公司'
    },
    schools: [
      { name: '测试小学' },
      { name: '测试高中' }
    ].concat(...getSchools()),

  });


  const callback = (...info) => {
    console.log('wsa-test', info);
  }


  const handleName = () => {
    user.name = '哈哈哈'
    const newUser = { ...user }
    setUser(newUser)
  }

  const handleName2 = () => {
    // const bb = update(user, {
    //   name: {
    //     $set: '1231231'
    //   },
    // })

    const bb = update(user, convertImmutabilityByPath('name' ,{
      $set: '1231231'
    },))
    console.log(bb.company === user.company)
    setUser(bb)
  }

  const handleSchools = () => {
    user.schools[0].name = '1232222'
    
    setUser({...user})
  }

  const handleSchools2 = () => {
    console.time('测试')
    // const bb = update(user, {
    //   schools: {
    //     0: {
    //       name: {
    //         $set: 'bbv'
    //       }
    //     }
    //   },
    // })

    const bb = update(user, convertImmutabilityByPath('schools[0].name' ,{
      $set: 'bbv'
    },))

    console.timeEnd('测试')
    console.log('wsa-tt', user, bb)
    console.log('wsa-test', user === bb)
    console.log('wsa-test', user.schools2 === bb.schools2)
    setUser(bb)
  }

  const handleSchools3 = () => {
    user.schools[0].name = '1232222'
    console.time('测试2')
    const user2 = JSON.parse(JSON.stringify(user))
    console.timeEnd('测试2')
    setUser(user2)
  }


  const renderSchools = useMemo(() => {
    return (
      <div>
        {user.schools.map(item => {
          return <p key={item.name}>{item.name}</p>
        })}
      </div>
    );
  }, [user.schools]);

  return (
    <div className="App">
      <Profiler id="Navigation" onRender={callback}>
        <header className="App-header">
          <div>{trace++}</div>

          {user.name}
          <button onClick={handleName}>修改名称</button>
          <button onClick={handleName2}>修改名称</button>
          <button onClick={handleSchools}>添加用户密码</button>
          <button onClick={handleSchools2}>添加用户密码2</button>
          <button onClick={handleSchools3}>添加用户密码3</button>

          <div>{renderSchools}</div>

        </header>
      </Profiler>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({
    name: 'wsa',
    company: {
      name: '测试公司'
    },
    schools: [
      { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
      { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    ].concat(...getSchools()),
    schools2: [
      { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
      { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    ].concat(...getSchools()),
    schools3: [
      { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
      { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    ].concat(...getSchools()),
    schools4: [
      { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
      { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    ].concat(...getSchools()),
    schools5: [
      { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
      { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    ].concat(...getSchools()),
    // schools6: [
    //   { name: '测试小学', start: '1998-01-02', end: '2004-01-02' },
    //   { name: '测试高中', start: '2005-01-02', end: '2007-01-02' },
    // ].concat(...getSchools()),
  });

  /**
   * Profiler 组件，可以查看渲染时间等信息
   */
  const renderCallback = (...info) => {
    console.log(`渲染原因 ${info[1]},本次更新 committed 花费的渲染时间 ${info[2]}`);
  }

  const handleSchools = () => {
    user.schools[0].name = '1232222'
    setUser({...user})
  }

  const handleSchools2 = () => {
    console.time('测试')
    const bb = update(user, convertImmutabilityByPath('schools[0].name' ,{
      $set: 'bbv'
    },))
    console.timeEnd('测试')
    setUser(bb)
  }

  const handleSchools3 = () => {
    user.schools[0].name = '1232222'
    console.time('测试2')
    const user2 = JSON.parse(JSON.stringify(user))
    console.timeEnd('测试2')
    setUser(user2)
  }

  // 使用 useMemo 优化性能，如果是新的组件使用 memo 或者 pureComponent
  // 如果 user.schools 不变,则不会重新渲染
  const renderSchools = useMemo(() => {
    return (
      <div>
        {user.schools.map(item => {
          return <div key={item.name}>
            {item.name}
            {item.start}
            {item.end}
          </div>
        })}
      </div>
    );
  }, [user.schools]);

  return (
    <div className="App">
      <Profiler id="render" onRender={renderCallback}>
        <header className="App-header">
          {user.name}
          <button onClick={handleSchools}>修改学校</button>
          <button onClick={handleSchools2}>修改学校</button>
          <button onClick={handleSchools3}>修改学校</button>
          <div>{renderSchools}</div>
        </header>
      </Profiler>
    </div>
  );
}
export {
  App2
}
export default App;
