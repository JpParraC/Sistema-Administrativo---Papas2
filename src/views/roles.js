// src/views/Roles.js
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import Swal from 'sweetalert2'

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ id: null, rol_name: '' })

  const API_ROLES = 'http://localhost:4000/api/roles'

  // Alertas SweetAlert
  const alertSuccess = (title, text) => {
    Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 1800,
      showConfirmButton: false,
    })
  }

  const alertError = (text) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text,
    })
  }

  // Traer roles desde el backend
  const fetchRoles = async () => {
    try {
      const res = await fetch(API_ROLES)
      if (!res.ok) throw new Error('Error obteniendo roles')
      const data = await res.json()
      setRoles(data)
    } catch (err) {
      console.error(err)
      alertError('No se pudieron obtener los roles')
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOpenModal = (rol = null) => {
    if (rol) {
      setForm({ id: rol.id, rol_name: rol.rol_name })
    } else {
      setForm({ id: null, rol_name: '' })
    }
    setVisibleModal(true)
  }

  const handleSaveRole = async (e) => {
    e.preventDefault()
    try {
      const method = form.id ? 'PUT' : 'POST'
      const url = form.id ? `${API_ROLES}/${form.id}` : API_ROLES

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol_name: form.rol_name }),
      })

      if (!res.ok) throw new Error('Error guardando rol')

      fetchRoles()
      setVisibleModal(false)
      alertSuccess(
        'Correcto',
        form.id ? 'Rol actualizado correctamente' : 'Rol creado correctamente'
      )
    } catch (err) {
      console.error(err)
      alertError('No se pudo guardar el rol')
    }
  }

  const handleDeleteRole = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar rol?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      const res = await fetch(`${API_ROLES}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar rol')

      fetchRoles()
      alertSuccess('Eliminado', 'El rol fue eliminado correctamente')
    } catch (err) {
      console.error(err)
      alertError('No se pudo eliminar el rol')
    }
  }

  // Filtrar roles por buscador
  const filteredRoles = roles.filter((r) =>
    r.rol_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="d-flex justify-content-center mt-4">
      <div style={{ width: '750px' }}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Roles</h5>
            <CButton color="primary" size="sm" onClick={() => handleOpenModal()}>
              <CIcon icon={cilPlus} /> {/* Icono de + Nuevo Rol */}
            </CButton>
          </CCardHeader>

          <CCardBody>
            <CFormInput
              className="mb-3"
              placeholder="Buscar rol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="sm"
            />

            <CTable hover responsive bordered small className="text-center align-middle">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell style={{ width: '40px' }}>#</CTableHeaderCell>
                  <CTableHeaderCell>Nombre del Rol</CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '100px' }}>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredRoles.map((rol, idx) => (
                  <CTableRow key={rol.id}>
                    <CTableDataCell>{idx + 1}</CTableDataCell>
                    <CTableDataCell>{rol.rol_name}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-center gap-1">
                        {/* Botón Editar con icono */}
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => handleOpenModal(rol)}
                          title="Editar rol"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>

                        {/* Botón Eliminar con icono */}
                        <CButton
                          size="sm"
                          color="danger"
                          onClick={() => handleDeleteRole(rol.id)}
                          title="Eliminar rol"
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>

          {/* Modal */}
          <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
            <CModalHeader>{form.id ? 'Editar Rol' : 'Nuevo Rol'}</CModalHeader>
            <CForm onSubmit={handleSaveRole}>
              <CModalBody>
                <CFormInput
                  className="mb-2"
                  label="Nombre del Rol"
                  name="rol_name"
                  value={form.rol_name}
                  onChange={handleInputChange}
                  required
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" size="sm" onClick={() => setVisibleModal(false)}>
                  Cancelar
                </CButton>
                <CButton color="primary" size="sm" type="submit">
                  Guardar
                </CButton>
              </CModalFooter>
            </CForm>
          </CModal>
        </CCard>
      </div>
    </div>
  )
}

export default Roles
