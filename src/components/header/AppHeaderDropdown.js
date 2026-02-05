import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/aa.png'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        caret={false}
        className="py-2 pe-3"
      >
        <CAvatar
          src={avatar8}
          size="xl"
          style={{
            width: '55px',
            height: '20px',
          }}
        />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Configuración
        </CDropdownHeader>

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
