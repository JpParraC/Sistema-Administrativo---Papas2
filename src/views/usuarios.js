// src/views/Usuarios.js
import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm,
  CFormInput, CFormSelect, CRow, CCol
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilOptions } from '@coreui/icons'
import Swal from 'sweetalert2'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [roles, setRoles] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    id: null,
    usuario: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rol_id: '',
    estado: 'A'
  })

  const API_USUARIOS = 'http://localhost:4000/api/usuarios'
  const API_ROLES = 'http://localhost:4000/api/roles'

  const alertSuccess = (title, text) => Swal.fire({ icon: 'success', title, text, timer: 1800, showConfirmButton: false })
  const alertError = (text) => Swal.fire({ icon: 'error', title: 'Error', text })

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_USUARIOS)
      const data = await res.json()
      setUsuarios(data)
    } catch (err) {
      console.error(err)
      alertError('No se pudieron obtener los usuarios')
    }
  }

  const fetchRoles = async () => {
    try {
      const res = await fetch(API_ROLES)
      const data = await res.json()
      setRoles(data)
    } catch (err) {
      console.error(err)
      alertError('No se pudieron obtener los roles')
    }
  }

  useEffect(() => {
    fetchUsuarios()
    fetchRoles()
  }, [])

  const handleInputChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
 setForm({
  id: usuario.id,
  usuario: usuario.usuario,
  password: '', // SIEMPRE VACÍO
  nombre: usuario.nombre,
  apellido: usuario.apellido,
  email: usuario.email,
  telefono: usuario.telefono,
  rol_id: usuario.rol_id,
  estado: usuario.estado
})
    } else {
      setForm({
        id: null,
        usuario: '',
        password: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        rol_id: '',
        estado: 'A'
      })
    }
    setVisibleModal(true)
  }

  const handleSaveUsuario = async (e) => {
    e.preventDefault()
    try {
      const method = form.id ? 'PUT' : 'POST'
      const url = form.id ? `${API_USUARIOS}/${form.id}` : API_USUARIOS

      const payload = { ...form }
      if (!payload.password) delete payload.password

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
     const handleSaveUsuario = async (e) => {
  e.preventDefault()

  try {
    const method = form.id ? 'PUT' : 'POST'
    const url = form.id ? `${API_USUARIOS}/${form.id}` : API_USUARIOS

    const payload = { ...form }
    if (!payload.password) delete payload.password

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      alertError(data.error || 'No se pudo guardar el usuario')
      return
    }

    await fetchUsuarios()
    setVisibleModal(false)

    alertSuccess(
      'Correcto',
      form.id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente'
    )
  } catch (err) {
    console.error(err)
    alertError('Error de conexión con el servidor')
  }
}

      fetchUsuarios()
      setVisibleModal(false)
      alertSuccess('Correcto', form.id ? 'Usuario actualizado' : 'Usuario creado')
    } catch (err) {
      console.error(err)
      alertError('No se pudo guardar el usuario')
    }
  }

  const handleDeleteUsuario = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      const res = await fetch(`${API_USUARIOS}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar usuario')
      fetchUsuarios()
      alertSuccess('Eliminado', 'Usuario eliminado correctamente')
    } catch (err) {
      console.error(err)
      alertError('No se pudo eliminar el usuario')
    }
  }

  const filteredUsuarios = usuarios.filter(u =>
    u.usuario.toLowerCase().includes(search.toLowerCase()) ||
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.apellido.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (roles.find(r => r.id === u.rol_id)?.rol_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="d-flex justify-content-center mt-4">
      <div style={{ width: '750px' }}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <h5>Usuarios</h5>
            <CButton color="primary" size="sm" onClick={() => handleOpenModal()}><CIcon icon={cilPlus} /></CButton>
          </CCardHeader>

          <CCardBody>
            <CFormInput
              className="mb-3"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="sm"
            />

            <CTable hover responsive bordered small className="text-center align-middle">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Usuario</CTableHeaderCell>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Rol</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredUsuarios.map((u, idx) => (
                  <CTableRow key={u.id}>
                    <CTableDataCell>{idx + 1}</CTableDataCell>
                    <CTableDataCell>{u.usuario}</CTableDataCell>
                    <CTableDataCell>{u.nombre} {u.apellido}</CTableDataCell>
                    <CTableDataCell>{roles.find(r => r.id === u.rol_id)?.rol_name || ''}</CTableDataCell>
                    <CTableDataCell>{u.estado}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-center gap-1">
                        <CButton size="sm" color="info" onClick={() => handleOpenModal(u)} title="Editar"><CIcon icon={cilPencil} /></CButton>
                        <CButton size="sm" color="danger" onClick={() => handleDeleteUsuario(u.id)} title="Eliminar"><CIcon icon={cilTrash} /></CButton>
                        <CButton size="sm" color="secondary" onClick={() => handleOpenModal(u)} title="Más detalles"><CIcon icon={cilOptions} /></CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>

          <CModal visible={visibleModal} onClose={() => setVisibleModal(false)} autoFocus={false}>
            <CModalHeader>{form.id ? 'Detalles / Editar Usuario' : 'Nuevo Usuario'}</CModalHeader>
            <CForm onSubmit={handleSaveUsuario}>
              <CModalBody>
                <CRow>
                  <CCol xs={12} className="mb-2">
                    <CFormInput label="Usuario" name="usuario" value={form.usuario} onChange={handleInputChange} required />
                  </CCol>
                  <CCol xs={12} className="mb-2">
                    <CFormInput
  type="password"
  label="Contraseña"
  name="password"
  value={form.password}
  onChange={handleInputChange}
/>
                  </CCol>
                  <CCol xs={6} className="mb-2">
                    <CFormInput label="Nombre" name="nombre" value={form.nombre} onChange={handleInputChange} required />
                  </CCol>
                  <CCol xs={6} className="mb-2">
                    <CFormInput label="Apellido" name="apellido" value={form.apellido} onChange={handleInputChange} required />
                  </CCol>
                  <CCol xs={12} className="mb-2">
                    <CFormInput type="email" label="Email" name="email" value={form.email} onChange={handleInputChange} required />
                  </CCol>
                  <CCol xs={6} className="mb-2">
                    <CFormInput label="Teléfono" name="telefono" value={form.telefono} onChange={handleInputChange} />
                  </CCol>
                  <CCol xs={6} className="mb-2">
                    <CFormSelect label="Rol" name="rol_id" value={form.rol_id} onChange={handleInputChange} required>
                      <option value="">Seleccione...</option>
                      {roles.map(r => <option key={r.id} value={r.id}>{r.rol_name}</option>)}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={12} className="mb-2">
                    <CFormSelect label="Estado" name="estado" value={form.estado} onChange={handleInputChange} required>
                      <option value="A">Activo</option>
                      <option value="I">Inactivo</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisibleModal(false)}>Cerrar</CButton>
                <CButton color="primary" type="submit">Guardar</CButton>
              </CModalFooter>
            </CForm>
          </CModal>
        </CCard>
      </div>
    </div>
  )
}

export default Usuarios
