import CIcon from '@coreui/icons-react'
import {
  cilStorage,
  cilChartPie,
  cilCart,         // compras
  cilUser,         // personal
  cilDollar,       // ventas
  cilPeople,       // clientes
  cilBalanceScale, // balance
  cilFile,         // reportes
  cilFactory,      // producción
  cilBuilding,
  cilBasket
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Módulos Contables',
  },
    {
    component: CNavItem,
    name: 'Proveedores',
    to: '/proveedores',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Productos',
    to: '/productos',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Compras',
    to: '/compras',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
 
  {
    component: CNavItem,
    name: 'Ventas',
    to: '/ventas',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Inventario',
    to: '/inventario',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
   {
    component: CNavItem,
    name: 'Producción',
    to: '/produccion',
    icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Personal',
    to: '/personal',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Clientes',
    to: '/clientes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Balance',
    to: '/balance',
    icon: <CIcon icon={cilBalanceScale} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Reportes',
    to: '/reportes',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  
   {
    component: CNavItem,
    name: 'Cargos',
    to: '/cargos',
    icon: <CIcon icon={cilBalanceScale} customClassName="nav-icon" />,
  },
]

export default _nav
