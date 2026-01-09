import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Compras = React.lazy(() => import('./views/compras'))
const Inventario = React.lazy(() => import('./views/inventario'))
const Personal = React.lazy(() => import('./views/personal'))
const Ventas = React.lazy(() => import('./views/ventas'))
const Produccion = React.lazy(() => import('./views/produccion'))
const Clientes = React.lazy(() => import('./views/clientes'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const Users = React.lazy(() => import('./views/user/Users'))
const Balance = React.lazy(() => import('./views/balance'))
const Reportes = React.lazy(() => import('./views/reportes'))
const Proveedores = React.lazy(() => import('./views/proveedores'))
const Productos = React.lazy(() => import('./views/productos'))
const Cargos = React.lazy(() => import('./views/cargos'))
const Usuarios = React.lazy(() => import('./views/usuarios'))
const Roles = React.lazy(() => import('./views/roles'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },
  { path: '/usuarios', name: 'Usuarios', element: Usuarios }, // ✅ nueva ruta
  { path: '/roles', name: 'Roles', element: Roles }, // ✅ nueva ruta

  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/compras', name: 'Compras', element: Compras },
  { path: '/inventario', name: 'Inventario', element: Inventario },
  { path: '/personal', name: 'Personal', element: Personal },
  { path: '/ventas', name: 'Ventas', element: Ventas },
  { path: '/clientes', name: 'Clientes', element: Clientes },
  { path: '/produccion', name: 'Produccion', element: Produccion },
  { path: '/balance', name: 'Balance', element: Balance },
  { path: '/reportes', name: 'Reportes', element: Reportes },
  { path: '/proveedores', name: 'Proveedores', element: Proveedores },
  { path: '/productos', name: 'Productos', element: Productos },
  { path: '/cargos', name: 'Cargos', element: Cargos },
]

export default routes
