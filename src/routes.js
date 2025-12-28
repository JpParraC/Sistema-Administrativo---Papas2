import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Compras = React.lazy(() => import('./views/compras'))
const Inventario = React.lazy(() => import('./views/inventario'))
const Personal = React.lazy(() => import('./views/personal'))
const Ventas = React.lazy(() => import('./views/ventas'))
const produccion = React.lazy(() => import('./views/produccion'))
const clientes = React.lazy(() => import('./views/clientes'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const Users = React.lazy(() => import('./views/user/Users'))
const balance = React.lazy(() => import('./views/balance'))
const reportes = React.lazy(() => import('./views/reportes'))
const proveedores = React.lazy(() => import('./views/proveedores'))
const productos = React.lazy(() => import('./views/productos'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Compras', name: 'Compras', element: Compras },
  { path: '/Inventario', name: 'Inventario', element: Inventario },
  { path: '/Personal', name: 'Personal', element: Personal },
  { path: '/Ventas', name: 'Ventas', element: Ventas },
  { path: '/clientes', name: 'clientes', element: clientes },
  { path: '/produccion', name: 'produccion', element: produccion },
  { path: '/balance', name: 'balance', element: balance },
  { path: '/reportes', name: 'reportes', element: reportes },
  {path: '/proveedores', name: 'proveedores', element: proveedores},
  {path: '/productos', name: 'productos', element: productos},
]

export default routes
