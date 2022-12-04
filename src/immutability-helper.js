import logo from './logo.svg';
import './App.css';
import { useState, Profiler, useMemo } from 'react';
import update from 'immutability-helper'

let trace = 1

const getSchools = () => {
  let schools = []
  for(let i = 0; i< 10000; i++) {
    schools.push({
      name: `学校${i}`,
      age: '13',
      pp: '13221'
    })
  }
  return schools
}

function App() {

  const [user, setUser] = useState({
    name: 'wsa',
    age: 22,
    company: {
      name: '测试公司'
    },
    schools: [
      { name: '测试小学' },
      { name: '测试高中' }
    ].concat(...getSchools()),
    schools2: [
      { name: '测试小学' },
      { name: '测试高中' }
    ].concat(...getSchools()),
    schools4: [
      { name: '测试小学' },
      { name: '测试高中' }
    ].concat(...getSchools()),
    schools5: [
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
    const bb = update(user, {
      name: {
        $set: '1231231'
      },
    })
    console.log(bb.company === user.company)
    setUser(bb)
  }

  const handleSchools = () => {
    user.schools[0].name = '1232222'
    
    setUser({...user})
  }

  const handleSchools2 = () => {
    console.time('测试')
    const bb = update(user, {
      schools: {
        0: {
          name: {
            $set: 'bbv'
          }
        }
      },
    })
    console.timeEnd('测试')
    console.log('wsa-tt', user, bb)
    console.log('wsa-test', user.schools2 === user.schools2)
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
          {user.age}
          <button onClick={handleSchools}>添加用户密码</button>
          <button onClick={handleSchools2}>添加用户密码2</button>
          <button onClick={handleSchools3}>添加用户密码3</button>
          <div>{renderSchools}</div>

        </header>
      </Profiler>
    </div>
  );
}

export default App;
