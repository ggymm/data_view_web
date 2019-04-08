import Layout from '../../views/layout/Layout'

// noinspection NpmUsedModulesInstalled
export const dataViewRouterMap = [
  {
    path: '/data_source',
    component: Layout,
    redirect: '/data_source/list',
    name: '数据源管理',
    meta: { title: '数据源管理', icon: 'data_source' },
    children: [
      {
        name: 'DataViewDataSourceList',
        path: 'list',
        component: () => import('@/views/data_view/data_source/list'),
        meta: { title: '数据源列表' }
      },
      {
        path: 'edit/:dataSourceId',
        name: 'DataViewDataSourceEdit',
        hidden: true,
        component: () => import('@/views/data_view/data_source/edit'),
        meta: { title: '编辑数据源' }
      },
      {
        path: 'create',
        name: 'DataViewDataSourceCreate',
        hidden: true,
        component: () => import('@/views/data_view/data_source/edit'),
        meta: { title: '创建数据源' }
      }
    ]
  },
  {
    path: '/instance',
    component: Layout,
    redirect: '/instance/list',
    name: '可视化实例',
    meta: { title: '可视化实例', icon: 'data_view' },
    children: [
      {
        name: 'DataViewInstanceList',
        path: 'list',
        component: () => import('@/views/data_view/instance/list'),
        meta: { title: '可视化实例列表' }
      },
      {
        path: 'create',
        name: 'DataViewInstanceCreate',
        hidden: true,
        component: () => import('@/views/data_view/instance/create'),
        meta: { title: '创建可视化' }
      }
    ]
  }
]

export default dataViewRouterMap

