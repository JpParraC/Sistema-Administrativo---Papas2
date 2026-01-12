import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const balanceMock = [
  {
    id: 1,
    fecha: '2025-07-01',
    tipo_movimiento: 'Ingreso',
    monto: 2500.00,
    descripcion: 'Venta de papa negra',
    referencia_id: 1,
    tipo_referencia: 'Venta'
  },
  {
    id: 2,
    fecha: '2025-07-02',
    tipo_movimiento: 'Egreso',
    monto: 1200.00,
    descripcion: 'Compra de fertilizante',
    referencia_id: 1,
    tipo_referencia: 'Compra'
  },
  {
    id: 3,
    fecha: '2025-07-03',
    tipo_movimiento: 'Egreso',
    monto: 800.00,
    descripcion: 'Pago de salario',
    referencia_id: 2,
    tipo_referencia: 'Salario'
  }
]

const tipoMovimientoColors = {
  'Ingreso': 'success',
  'Egreso': 'danger'
}

const tipoReferenciaOptions = ['Venta', 'Compra', 'Salario', 'Otro']

const Balance = () => {
  const [balance, setBalance] = useState([])
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({
    fecha: '',
    tipo_movimiento: 'Ingreso',
    monto: '',
    descripcion: '',
    referencia_id: '',
    tipo_referencia: 'Venta'
  })

  // Filtros
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroReferencia, setFiltroReferencia] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setBalance(balanceMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddBalance = (e) => {
    e.preventDefault()
    setBalance([
      ...balance,
      {
        id: balance.length + 1,
        ...form,
        monto: parseFloat(form.monto)
      }
    ])
    setVisible(false)
    setForm({
      fecha: '',
      tipo_movimiento: 'Ingreso',
      monto: '',
      descripcion: '',
      referencia_id: '',
      tipo_referencia: 'Venta'
    })
  }

  // Filtro funcional y visualmente ordenado
  const balanceFiltrado = balance.filter((item) => {
    const matchTipo = filtroTipo ? item.tipo_movimiento === filtroTipo : true
    const matchReferencia = filtroReferencia ? item.tipo_referencia === filtroReferencia : true
    const matchFechaDesde = filtroFechaDesde ? item.fecha >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? item.fecha <= filtroFechaHasta : true
    return matchTipo && matchReferencia && matchFechaDesde && matchFechaHasta
  })

  // Calcular totales
  const totalIngresos = balanceFiltrado.filter(b => b.tipo_movimiento === 'Ingreso').reduce((acc, b) => acc + b.monto, 0)
  const totalEgresos = balanceFiltrado.filter(b => b.tipo_movimiento === 'Egreso').reduce((acc, b) => acc + b.monto, 0)
  const balanceFinal = totalIngresos - totalEgresos

  return (
    <CCard
      style={{
        backdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 25px 60px rgba(0,0,0,.15)',
        border: '1px solid rgba(255, 255, 255, 1)',
      }}
    >
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#4b617dff', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Balance de Ingresos y Egresos</h5>
        <CButton color="light" style={{ color: '#4b617dff', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nuevo Movimiento
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 150 }}
            label="Tipo"
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos</option>
            <option>Ingreso</option>
            <option>Egreso</option>
          </CFormSelect>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 150 }}
            label="Referencia"
            value={filtroReferencia}
            onChange={e => setFiltroReferencia(e.target.value)}
          >
            <option value="">Todas</option>
            {tipoReferenciaOptions.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </CFormSelect>
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
          {(filtroTipo || filtroReferencia || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroTipo('')
              setFiltroReferencia('')
              setFiltroFechaDesde('')
              setFiltroFechaHasta('')
            }}>
              Limpiar filtros
            </CButton>
          )}
        </div>
        {/* Totales */}
        <div className="mb-3 d-flex flex-wrap gap-4 justify-content-end">
          <div>
            <CBadge color="success" className="me-2">Ingresos</CBadge>
            <span style={{ fontWeight: 600, color: '#36C9C6' }}>${totalIngresos.toFixed(2)}</span>
          </div>
          <div>
            <CBadge color="danger" className="me-2">Egresos</CBadge>
            <span style={{ fontWeight: 600, color: '#ED6A5A' }}>${totalEgresos.toFixed(2)}</span>
          </div>
          <div>
            <CBadge color="info" className="me-2">Balance</CBadge>
            <span style={{ fontWeight: 700, color: balanceFinal >= 0 ? '#36C9C6' : '#ED6A5A' }}>
              ${balanceFinal.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Tabla */}
        <CTable hover responsive bordered align="middle" className="shadow-sm" style={{ background: '#fff', borderRadius: 8 }}>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Monto</CTableHeaderCell>
              <CTableHeaderCell>Descripción</CTableHeaderCell>
              <CTableHeaderCell>Referencia</CTableHeaderCell>
              <CTableHeaderCell>ID Ref.</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {balanceFiltrado.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={7} className="text-center text-muted">
                  No hay movimientos registrados con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {balanceFiltrado.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {item.fecha}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={tipoMovimientoColors[item.tipo_movimiento] || 'secondary'}>
                    {item.tipo_movimiento}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{
                    color: item.tipo_movimiento === 'Ingreso' ? '#36C9C6' : '#ED6A5A',
                    fontWeight: 600
                  }}>
                    ${item.monto.toFixed(2)}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.descripcion}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info">{item.tipo_referencia}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#222' }}>{item.referencia_id}</span>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nuevo movimiento */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader style={{ background: '#4b617dff', color: '#fff' }}>
          <strong>Nuevo Movimiento</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddBalance}>
          <CModalBody>
            <CFormInput
              type="date"
              label="Fecha"
              name="fecha"
              value={form.fecha}
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              className="mt-2"
              label="Tipo de movimiento"
              name="tipo_movimiento"
              value={form.tipo_movimiento}
              onChange={handleInputChange}
              required
            >
              <option>Ingreso</option>
              <option>Egreso</option>
            </CFormSelect>
            <CFormInput
              className="mt-2"
              type="number"
              step="0.01"
              label="Monto"
              name="monto"
              value={form.monto}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mt-2"
              type="number"
              label="ID de referencia"
              name="referencia_id"
              value={form.referencia_id}
              onChange={handleInputChange}
            />
            <CFormSelect
              className="mt-2"
              label="Tipo de referencia"
              name="tipo_referencia"
              value={form.tipo_referencia}
              onChange={handleInputChange}
              required
            >
              {tipoReferenciaOptions.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
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

export default Balance