import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'

// Logo PNG
import Logo from 'src/assets/images/log.png'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      style={{
        boxShadow: '4px 0 8px -2px rgba(73, 93, 194, 1)'
      }}
      className="border-end"
      colorScheme="black"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      {/* Sidebar Header con logo pegado arriba y abajo */}
      <CSidebarHeader
        className="border-bottom d-flex align-items-center justify-content-center"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          height: 'auto', // se ajusta al logo
        }}
      >
        <CSidebarBrand
          to="/"
          className="d-flex align-items-center justify-content-center"
          style={{
            padding: 0,
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '190px',   // tamaño deseado
              height: 'auto',
              objectFit: 'contain',
              display: 'block',  // elimina espacio inferior
            }}
          />
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Navegación */}
      <AppSidebarNav items={navigation} />      
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
