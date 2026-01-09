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

const Roles = () => {
  const [roles, setRoles] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ id: null, rol_name: '' })

  const API_ROLES = 'http://localhost:4000/api/roles'

  // Traer roles desde el backend
  const fetchRoles = async () => {
    try {
      const res = await fetch(API_ROLES)
      const data = await res.json()
      setRoles(data)
    } catch (err) {
      console.error('Error obteniendo roles:', err)
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

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol_name: form.rol_name }),
      })

      fetchRoles()
      setVisibleModal(false)
    } catch (err) {
      console.error('Error guardando rol:', err)
    }
  }

  const handleDeleteRole = async (id) => {
    if (!window.confirm('¿Deseas eliminar este rol?')) return
    try {
      await fetch(`${API_ROLES}/${id}`, { method: 'DELETE' })
      fetchRoles()
    } catch (err) {
      console.error('Error eliminando rol:', err)
    }
  }

  // Filtrar roles por buscador
  const filteredRoles = roles.filter((r) =>
    r.rol_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Roles</h5>
        <CButton color="primary" onClick={() => handleOpenModal()}>
          + Nuevo Rol
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CFormInput
          className="mb-3"
          placeholder="Buscar rol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CTable hover responsive bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre del Rol</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredRoles.map((rol, idx) => (
              <CTableRow key={rol.id}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                <CTableDataCell>{rol.rol_name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="info"
                    className="me-2"
                    onClick={() => handleOpenModal(rol)}
                  >
                    Editar
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => handleDeleteRole(rol.id)}
                  >
                    Eliminar
                  </CButton>
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
            <CButton color="secondary" onClick={() => setVisibleModal(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Roles
