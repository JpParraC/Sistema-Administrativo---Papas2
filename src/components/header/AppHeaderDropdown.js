import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilSettings } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/aa.png'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Configuracion
        </CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Ajustes
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem
          href="#"
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            window.location.reload()
          }}
        >
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
