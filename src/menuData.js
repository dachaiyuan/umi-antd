/**
 * hideChildrenInMenu   true/false  隐藏子菜单
 * breadCrumbClick true/false 面包屑可点击
 */

export default [
  {
    name: '账号管理',
    path: '/account',
    icon: 'user',
  },
  {
    name: '角色管理',
    path: '/role',
    icon: 'cluster'
  },
  {
    name: '用户组管理',
    path: '/group',
    icon: 'team',
    hideChildrenInMenu: true,
    breadCrumbClick: true,
    children: [
      {
        name: '用户组详情',
        path: '/group/detail',
        icon: 'team'
      }
    ]
  },
  {
    name: '权限管理',
    path: '/auth',
    icon: 'lock'
  },
  // {
  //   name: '操作日志',
  //   path: '/log',
  //   icon: 'file-text'
  // },
]