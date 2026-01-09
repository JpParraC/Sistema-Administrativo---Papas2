import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm,
  CFormInput, CFormSelect, CRow, CCol
} from '@coreui/react'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
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
    rol: '',
    estado: 'A'
  })

  const API_USUARIOS = 'http://localhost:4000/api/usuarios'

  // Obtener usuarios
  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_USUARIOS)
      const data = await res.json()
      setUsuarios(data)
    } catch (err) {
      console.error('Error obteniendo usuarios:', err)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
      setForm({
        id: usuario.id,
        usuario: usuario.usuario,
        password: '', // Nunca mostrar contraseña
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol,
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
        rol: '',
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

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      fetchUsuarios()
      setVisibleModal(false)
    } catch (err) {
      console.error('Error guardando usuario:', err)
    }
  }

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('¿Deseas eliminar este usuario?')) return
    try {
      await fetch(`${API_USUARIOS}/${id}`, { method: 'DELETE' })
      fetchUsuarios()
    } catch (err) {
      console.error('Error eliminando usuario:', err)
    }
  }

  const filteredUsuarios = usuarios.filter(u =>
    u.usuario.toLowerCase().includes(search.toLowerCase()) ||
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.apellido.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.rol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5>Usuarios</h5>
        <CButton color="primary" onClick={() => handleOpenModal()}>+ Nuevo Usuario</CButton>
      </CCardHeader>

      <CCardBody>
        <CFormInput
          className="mb-3"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CTable hover responsive bordered>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Usuario</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Apellido</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
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
                <CTableDataCell>{u.nombre}</CTableDataCell>
                <CTableDataCell>{u.apellido}</CTableDataCell>
                <CTableDataCell>{u.email}</CTableDataCell>
                <CTableDataCell>{u.telefono}</CTableDataCell>
                <CTableDataCell>{u.rol}</CTableDataCell>
                <CTableDataCell>{u.estado}</CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" className="me-2" onClick={() => handleOpenModal(u)}>Editar</CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDeleteUsuario(u.id)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      <CModal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader>{form.id ? 'Editar Usuario' : 'Nuevo Usuario'}</CModalHeader>
        <CForm onSubmit={handleSaveUsuario}>
          <CModalBody>
            <CRow>
              <CCol xs={12} className="mb-2">
                <CFormInput label="Usuario" name="usuario" value={form.usuario} onChange={handleInputChange} required />
              </CCol>
              {!form.id && (
                <CCol xs={12} className="mb-2">
                  <CFormInput type="password" label="Contraseña" name="password" value={form.password} onChange={handleInputChange} required />
                </CCol>
              )}
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
                <CFormSelect label="Rol" name="rol" value={form.rol} onChange={handleInputChange} required>
                  <option value="">Seleccione...</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
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
            <CButton color="secondary" onClick={() => setVisibleModal(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Usuarios
