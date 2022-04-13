// https://reactrouter.com/docs/en/v6
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Sentry from '@sentry/react';

const Home = () => {
  return <div>Home</div>;
};

const About = () => {
  return <div>About</div>;
};

const User = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='add'>添加用户</Link>
        </li>
        <li>
          <Link to='list'>用户列表</Link>
        </li>
      </ul>
      {/* 也可以在app中 /user路由的里面配合 Outlet实现 */}
      {/* 嵌套路由这里可以使用相对路径 */}
      <Routes>
        <Route path='add' element={<UserAdd />} />
        <Route path='list' element={<UserList />} />
        {/* 也可以作为高阶组件使用 Sentry.withErrorBoundary(UserDetail, { fallback: <p>an error has occurred</p> }); */}
        <Route
          path='detail/:id'
          element={
            // React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
            <Sentry.ErrorBoundary
              fallback={<p>An error has occurred</p>}
              // 使用beforeCapture设置tag附加在错误中
              beforeCapture={(scope) => {
                scope.setTag('location', 'first');
              }}
              // showDialog={true}
            >
              <UserDetail />
            </Sentry.ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
};

function UserAdd() {
  return <div>UserAdd</div>;
}

function UserDetail(props) {
  const params = useParams();
  // let [searchParams] = useSearchParams();
  // shopee searchParams
  // console.log(searchParams.get('name'), 'searchParams');
  console.log(params.a.b());
  return <div>UserDetail: {params.id}</div>;
}

function UserList() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/user/detail/1?name=shopee')}>UserList</div>
  );
}

//  用来过滤不需要在sentry管理界面中展示的 action 和 state
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    if (action.type === 'test') {
      return null;
    }
    return action;
  },
  stateTransformer: (state) => {
    return {
      ...state,
      // 删除敏感信息
      password: null,
    };
  },
  // 配置作用域
  // configureScopeWithState: (scope, state) => {}
});

const initialState = {
  number: 1,
  password: 'shopee',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'incremented':
      return { ...state, number: state.number + 1 };
    case 'decremented':
      return { ...state, number: state.number - 1 };
    case 'test':
      return { ...state, number: state.number + 100 };
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), sentryReduxEnhancer)
);

function App() {
  const methodDoesNotExist = () => {
    console.log(window.a.b());
  };
  return (
    <div className='App'>
      <button onClick={() => store.dispatch({ type: 'incremented' })}>
        add
      </button>
      <button onClick={() => store.dispatch({ type: 'decremented' })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: 'test' })}>test</button>
      <button onClick={methodDoesNotExist}>Break the world</button>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/user'>User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/user/*' element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

// export default App;
export default Sentry.withProfiler(App, { name: 'CustomAppName' });
