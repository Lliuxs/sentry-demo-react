import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// import { createBrowserHistory } from 'history';
import SentryRRWeb from '@sentry/rrweb';
import dayjs from 'dayjs';

const environment = 'production';
export const release = `${environment}@${dayjs().format('YYYY_MM_DD')}_4`;
// https://segmentfault.com/a/1190000020870683
Sentry.init({
  // 基本选项
  // sdk发送的地址 如果不配置读取 SENTRY_DSN 环境变量
  dsn: "https://4212acf8a6144b20a36698d04ad6af8d@o1191297.ingest.sentry.io/6327464",
  // 用户传输捕获时间的url不是DSN 实现自定义服务器端点
  // tunnel: '',
  // 调试模式 默认是false 设置为true SDK 尝试打印有用的调试信息 不建议在生产中打开它
  debug: false,
  // 设置发布 最好手动设置 确保发布和部署集成sourcemap同步 SENTRY_RELEASE 环境变量
  release: release,
  // 设置环境 一个版本可以和多个环境管理 prod test uat 设置 SENTRY_ENVIRONMENT 环境变量
  // 环境区分大小写
  environment: environment,
  // 错误事件的采样率 0-1 默认是1表示发送100%的错误 如果设置0.1 随机按发送10%的事件
  sampleRate: 1.0,
  // 面包屑的总量 默认是100
  maxBreadcrumbs: 100,
  // 堆栈跟踪会自动附加到所有记录的消息 默认为false 有堆栈跟踪和没有堆栈跟踪的事件 分组是不同的
  attachStacktrace: true,
  // 不发送到sentry的错误URL
  // denyUrls: '',
  // allowUrls: '',
  // 设置为true SDK发送会话事件 每次页面加载和页面导航都会发出一个会话
  // TODO: 那里查看数据?
  autoSessionTracking: true,
  // 初始范围的数据 初始作用域可以定义为对象和回调函数
  initialScope: {
    tags: { 'my-tag': 'my value' },
    user: { id: '42', email: 'john.doe@example.com' },
  },
  // 单个值在被截断之前可以包含的最大字符数
  maxValueLength: 250,
  // 将任何上下文数据标准化到给定的深度 默认是3层  超出的就是[Object]标记
  normalizeDepth: 3,
  // 任何给定对象或数组中将包含的属性或条目的最大数量 超出的数据将被丢失
  normalizeMaxBreadth: 1000,

  // 集成配置
  integrations: [
    new Integrations.BrowserTracing({
      // routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath),
    }),
    new SentryRRWeb({
      checkoutEveryNms: 10 * 1000, // 每10秒重新制作快照
      checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
      maskAllInputs: false, // 将所有输入内容记录为 *
    }),
  ],
  // 警用默认添加的集成 设置为false表示不添加默认的集成
  // 默认集成了很多 用户代理信息 link 面包屑 数据过滤等
  // defaultIntegrations: false,

  // 钩子hooks
  beforeSend: (event, hint) => {
    // 在发送前 可以修改事件的数据 hint保存原始异常
    const error = hint.originalException;
    // if (event.exception) {
    //   // 用户交互
    //   Sentry.showReportDialog({ eventId: event.event_id });
    // }
    return event;
  },
  beforeBreadcrumb(breadcrumb) {
    return breadcrumb;
  },

  // 传输 对传输进行定制 切换用于发送事件的传输。其工作原理取决于 SDK
  // transport: '',

  // 跟踪选项 必须定义此或tracesSampler必须定义以启用跟踪
  // 控制给定事务发送到sentry的概率百分比
  tracesSampleRate: 1.0,
  // tracesSampler
});

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


