import { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)

  const [form, setForm] = useState({
    nombre_cliente: '',
    direccion: '',
    telefono: '',
    email: ''
  })

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroTelefono, setFiltroTelefono] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  const API_URL = 'http://localhost:4000/api/clientes'

  // Obtener clientes
  const fetchClientes = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      const clientesMapeados = data.map(item => ({
        id: item.tma_idclien,
        nombre_cliente: item.tma_nombrec,
        direccion: item.tma_direcci,
        telefono: item.tma_telefon,
        email: item.tma_emailcl,
        fecha_registro: item.tma_fechreg
      }))
      setClientes(clientesMapeados)
    } catch (err) {
      console.error('Error obteniendo clientes:', err)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Crear cliente
  const handleAddCliente = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre_cliente,
          direccion: form.direccion,
          telefono: form.telefono,
          email: form.email
        })
      })
      const nuevoCliente = await res.json()
      setClientes([...clientes, {
        id: nuevoCliente.tma_idclien,
        nombre_cliente: nuevoCliente.tma_nombrec,
        direccion: nuevoCliente.tma_direcci,
        telefono: nuevoCliente.tma_telefon,
        email: nuevoCliente.tma_emailcl,
        fecha_registro: nuevoCliente.tma_fechreg
      }])
      setVisible(false)
      setForm({ nombre_cliente: '', direccion: '', telefono: '', email: '' })
    } catch (err) {
      console.error('Error creando cliente:', err)
    }
  }

  // Editar cliente
  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente)
    setForm({
      nombre_cliente: cliente.nombre_cliente,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      email: cliente.email
    })
    setEditVisible(true)
  }

  const handleUpdateCliente = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/${selectedCliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre_cliente,
          direccion: form.direccion,
          telefono: form.telefono,
          email: form.email
        })
      })
      const updatedCliente = await res.json()
      setClientes(clientes.map(c => c.id === updatedCliente.tma_idclien ? {
        id: updatedCliente.tma_idclien,
        nombre_cliente: updatedCliente.tma_nombrec,
        direccion: updatedCliente.tma_direcci,
        telefono: updatedCliente.tma_telefon,
        email: updatedCliente.tma_emailcl,
        fecha_registro: updatedCliente.tma_fechreg
      } : c))
      setEditVisible(false)
      setForm({ nombre_cliente: '', direccion: '', telefono: '', email: '' })
      setSelectedCliente(null)
    } catch (err) {
      console.error('Error actualizando cliente:', err)
    }
  }

  // Eliminar cliente
  const handleDeleteCliente = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setClientes(clientes.filter(c => c.id !== id))
    } catch (err) {
      console.error('Error eliminando cliente:', err)
    }
  }

  // Filtro
  const clientesFiltrados = clientes.filter(item => {
    const matchNombre = filtroNombre ? item.nombre_cliente.toLowerCase().includes(filtroNombre.toLowerCase()) : true
    const matchTelefono = filtroTelefono ? item.telefono.includes(filtroTelefono) : true
    const fechaRegistro = item.fecha_registro?.slice(0, 10) || ''
    const matchFechaDesde = filtroFechaDesde ? fechaRegistro >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaRegistro <= filtroFechaHasta : true
    return matchNombre && matchTelefono && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #9BC1BC 100%)', border: 'none', boxShadow: '0 2px 16px 0 #9BC1BC33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#ED6A5A', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Clientes</h5>
        <CButton color="light" style={{ color: '#ED6A5A', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Cliente
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormInput
            size="sm"
            style={{ maxWidth: 200 }}
            label="Nombre"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
          />
          <CFormInput
            size="sm"
            style={{ maxWidth: 160 }}
            label="Teléfono"
            placeholder="Buscar por teléfono"
            value={filtroTelefono}
            onChange={e => setFiltroTelefono(e.target.value)}
          />
          <CInputGroup size="sm" style={{ maxWidth: 260 }}>
            <CInputGroupText>Desde</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaDesde}
              onChange={e => setFiltroFechaDesde(e.target.value)}
            />
            <CInputGroupText>Hasta</CInputGroupText>
            <CFormInput
              type="date"
              value={filtroFechaHasta}
              onChange={e => setFiltroFechaHasta(e.target.value)}
            />
          </CInputGroup>
          {(filtroNombre || filtroTelefono || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroNombre('')
              setFiltroTelefono('')
              setFiltroFechaDesde('')
              setFiltroFechaHasta('')
            }}>
              Limpiar filtros
            </CButton>
          )}
        </div>

        {/* Tabla */}
        <CTable hover responsive bordered align="middle" className="shadow-sm" style={{ background: '#fff', borderRadius: 8 }}>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Dirección</CTableHeaderCell>
              <CTableHeaderCell>Teléfono</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Fecha Registro</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {clientesFiltrados.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center text-muted">
                  No hay clientes registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            ) : clientesFiltrados.map(item => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {item.nombre_cliente}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{item.direccion}</CTableDataCell>
                <CTableDataCell>{item.telefono}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                  {item.fecha_registro}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="warning" className="me-2" onClick={() => handleEditCliente(item)}>Editar</CButton>
                  <CButton size="sm" color="danger" onClick={() => handleDeleteCliente(item.id)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo cliente */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nuevo Cliente</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddCliente}>
          <CModalBody>
            <CFormInput
              label="Nombre completo"
              name="nombre_cliente"
              value={form.nombre_cliente}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal para editar cliente */}
      <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
        <CModalHeader style={{ background: '#FFB74D', color: '#fff' }}>
          <strong>Editar Cliente</strong>
        </CModalHeader>
        <CForm onSubmit={handleUpdateCliente}>
          <CModalBody>
            <CFormInput
              label="Nombre completo"
              name="nombre_cliente"
              value={form.nombre_cliente}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Actualizar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  )
}

export default Clientes
