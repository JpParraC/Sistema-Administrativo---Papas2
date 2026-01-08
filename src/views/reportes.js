import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CFormTextarea,
  CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

const API_URL = 'http://localhost:4000/api/reportes'
const API_PERSONAL = 'http://localhost:4000/api/personal'

const Reportes = () => {
  const [reportes, setReportes] = useState([])
  const [personal, setPersonal] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)

  const [form, setForm] = useState({
    id: null,
    nombre_reporte: '',
    fecha_generacion: '',
    contenido_reporte: '',
    generado_por: ''
  })

  // ================= FILTROS =================
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroPersonal, setFiltroPersonal] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  // ================= MODALES =================
  const [visibleMsg, setVisibleMsg] = useState(false)
  const [msgContent, setMsgContent] = useState({ title: '', text: '', color: 'info' })

  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [reporteAEliminar, setReporteAEliminar] = useState(null)

  const showMessage = (title, text, color = 'info') => {
    setMsgContent({ title, text, color })
    setVisibleMsg(true)
  }

  const showConfirm = (reporte) => {
    setReporteAEliminar(reporte)
    setVisibleConfirm(true)
  }

  // ================= FETCH REPORTES =================
  const fetchReportes = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (filtroNombre) params.append('nombre', filtroNombre)
      if (filtroPersonal) params.append('generado_por', filtroPersonal)
      if (filtroFechaDesde) params.append('fecha_desde', filtroFechaDesde)
      if (filtroFechaHasta) params.append('fecha_hasta', filtroFechaHasta)

      const response = await fetch(`${API_URL}?${params}`)
      if (!response.ok) throw new Error('Error del servidor')
      const data = await response.json()
      setReportes(data)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los reportes')
      showMessage('Error', 'No se pudieron cargar los reportes', 'danger')
      setReportes([])
    } finally {
      setLoading(false)
    }
  }

  // ================= FETCH PERSONAL =================
  const fetchPersonal = async () => {
    try {
      const response = await fetch(API_PERSONAL)
      if (!response.ok) throw new Error('Error al cargar personal')
      const data = await response.json()
      setPersonal(data)
    } catch (err) {
      console.error(err)
      showMessage('Error', 'No se pudo cargar el personal', 'danger')
    }
  }

  useEffect(() => {
    fetchPersonal()
    fetchReportes()
  }, [])

  useEffect(() => {
    fetchReportes()
  }, [filtroNombre, filtroPersonal, filtroFechaDesde, filtroFechaHasta])

  // ================= FORM =================
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmitReporte = async (e) => {
    e.preventDefault()
    try {
      const method = form.id ? 'PUT' : 'POST'
      const url = form.id ? `${API_URL}/${form.id}` : API_URL

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Error al guardar')
      }

      setVisible(false)
      setForm({
        id: null,
        nombre_reporte: '',
        fecha_generacion: '',
        contenido_reporte: '',
        generado_por: ''
      })
      fetchReportes()
      showMessage('Éxito', form.id ? 'Reporte actualizado correctamente' : 'Reporte creado correctamente', 'success')
    } catch (err) {
      console.error(err)
      showMessage('Error', err.message || 'No se pudo guardar el reporte', 'danger')
    }
  }

  // ================= ACCIONES =================
  const handleVerMas = (reporte) => setReporteSeleccionado(reporte)
  const handleCerrarVerMas = () => setReporteSeleccionado(null)

  const handleEliminar = async () => {
    if (!reporteAEliminar) return
    try {
      const response = await fetch(`${API_URL}/${reporteAEliminar.id}`, { method: 'DELETE' })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Error al eliminar')
      }
      fetchReportes()
      showMessage('Éxito', 'Reporte eliminado correctamente', 'success')
    } catch (err) {
      console.error(err)
      showMessage('Error', err.message || 'No se pudo eliminar el reporte', 'danger')
    } finally {
      setVisibleConfirm(false)
      setReporteAEliminar(null)
    }
  }

  const handleEditar = (reporte) => {
    setForm({
      id: reporte.id,
      nombre_reporte: reporte.nombre_reporte,
      fecha_generacion: reporte.fecha_generacion?.slice(0, 10),
      contenido_reporte: reporte.contenido_reporte,
      generado_por: reporte.generado_por
    })
    setVisible(true)
  }

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #F4F1BB 100%)', border: 'none', boxShadow: '0 2px 16px 0 #ED6A5A33' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#36C9C6', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Reportes</h5>
        <CButton color="light" style={{ color: '#36C9C6', fontWeight: 'bold' }} onClick={() => setVisible(true)}>+ Nuevo Reporte</CButton>
      </CCardHeader>

      <CCardBody>
        {/* ================= FILTROS ================= */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormInput size="sm" style={{ maxWidth: 220 }} label="Nombre" placeholder="Buscar por nombre" value={filtroNombre} onChange={e => setFiltroNombre(e.target.value)} />
          <CFormSelect size="sm" style={{ maxWidth: 180 }} label="Generado por" value={filtroPersonal} onChange={e => setFiltroPersonal(e.target.value)}>
            <option value="">Todo el personal</option>
            {personal.map(p => <option key={p.tma_idperso} value={p.tma_idperso}>{p.tma_nombrep}</option>)}
          </CFormSelect>
          <CInputGroup size="sm" style={{ maxWidth: 320 }}>
            <CInputGroupText>Desde</CInputGroupText>
            <CFormInput type="date" value={filtroFechaDesde} onChange={e => setFiltroFechaDesde(e.target.value)} />
            <CInputGroupText>Hasta</CInputGroupText>
            <CFormInput type="date" value={filtroFechaHasta} onChange={e => setFiltroFechaHasta(e.target.value)} />
          </CInputGroup>
          {(filtroNombre || filtroPersonal || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroNombre(''); setFiltroPersonal(''); setFiltroFechaDesde(''); setFiltroFechaHasta('')
            }}>Limpiar filtros</CButton>
          )}
        </div>

        {/* ================= TABLA ================= */}
        <CTable hover responsive bordered align="middle" className="shadow-sm" style={{ background: '#fff', borderRadius: 8 }}>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Fecha Generación</CTableHeaderCell>
              <CTableHeaderCell>Contenido</CTableHeaderCell>
              <CTableHeaderCell>Generado por</CTableHeaderCell>
              <CTableHeaderCell>Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {loading && <CTableRow><CTableDataCell colSpan={6} className="text-center">Cargando...</CTableDataCell></CTableRow>}
            {error && <CTableRow><CTableDataCell colSpan={6} className="text-center text-danger">{error}</CTableDataCell></CTableRow>}
            {!loading && !error && reportes.length === 0 && <CTableRow><CTableDataCell colSpan={6} className="text-center text-muted">No hay reportes</CTableDataCell></CTableRow>}

            {reportes.map(item => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell><CBadge style={{ background: '#36C9C6', color: '#fff' }}>{item.nombre_reporte}</CBadge></CTableDataCell>
                <CTableDataCell style={{ fontFamily: 'monospace' }}>{item.fecha_generacion?.slice(0, 10)}</CTableDataCell>
                <CTableDataCell>{item.contenido_reporte?.length > 60 ? item.contenido_reporte.slice(0, 60) + '...' : item.contenido_reporte}</CTableDataCell>
                <CTableDataCell><CBadge color="secondary">{item.nombre_personal || 'Desconocido'}</CBadge></CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" className="me-1" onClick={() => handleVerMas(item)}>Ver más</CButton>
                  <CButton size="sm" color="warning" className="me-1" onClick={() => handleEditar(item)}>Editar</CButton>
                  <CButton size="sm" color="danger" onClick={() => showConfirm(item)}>Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* ================= MODAL CREAR/EDITAR ================= */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>{form.id ? 'Editar Reporte' : 'Nuevo Reporte'}</strong>
        </CModalHeader>
        <CForm onSubmit={handleSubmitReporte}>
          <CModalBody>
            <CFormInput name="nombre_reporte" label="Nombre del reporte" value={form.nombre_reporte} onChange={handleInputChange} required />
            <CFormInput type="date" className="mt-2" name="fecha_generacion" value={form.fecha_generacion} onChange={handleInputChange} required />
            <CFormTextarea className="mt-2" name="contenido_reporte" label="Contenido" value={form.contenido_reporte} onChange={handleInputChange} required />
            <CFormSelect className="mt-2" name="generado_por" label="Generado por" value={form.generado_por} onChange={handleInputChange} required>
              <option value="">Seleccione personal</option>
              {personal.map(p => <option key={p.tma_idperso} value={p.tma_idperso}>{p.tma_nombrep}</option>)}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* ================= MODAL VER MÁS ================= */}
      <CModal visible={!!reporteSeleccionado} onClose={handleCerrarVerMas}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Detalle del Reporte</strong>
        </CModalHeader>
        <CModalBody>
          {reporteSeleccionado && (
            <>
              <p><strong>Nombre:</strong> {reporteSeleccionado.nombre_reporte}</p>
              <p><strong>Fecha:</strong> {reporteSeleccionado.fecha_generacion?.slice(0, 10)}</p>
              <p><strong>Contenido:</strong> {reporteSeleccionado.contenido_reporte}</p>
              <p><strong>Generado por:</strong> {reporteSeleccionado.nombre_personal || 'Desconocido'}</p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCerrarVerMas}>Cerrar</CButton>
        </CModalFooter>
      </CModal>

      {/* ================= MODAL MENSAJES ================= */}
      <CModal visible={visibleMsg} onClose={() => setVisibleMsg(false)}>
        <CModalHeader>{msgContent.title}</CModalHeader>
        <CModalBody>
          <p>{msgContent.text}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color={msgContent.color} onClick={() => setVisibleMsg(false)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

      {/* ================= MODAL CONFIRMAR ELIMINAR ================= */}
      <CModal visible={visibleConfirm} onClose={() => setVisibleConfirm(false)}>
        <CModalHeader>Confirmar Eliminación</CModalHeader>
        <CModalBody>
          <p>¿Está seguro que desea eliminar el reporte "{reporteAEliminar?.nombre_reporte}"?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleConfirm(false)}>Cancelar</CButton>
          <CButton color="danger" onClick={handleEliminar}>Eliminar</CButton>
        </CModalFooter>
      </CModal>

    </CCard>
  )
}

export default Reportes
