import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormInput,
  CFormSelect, CBadge, CInputGroup, CInputGroupText
} from '@coreui/react'

// Simulación de datos (reemplaza con fetch a tu API real)
const clientesMock = [
  { id: 1, nombre: 'Cliente Uno' },
  { id: 2, nombre: 'Cliente Dos' },
  { id: 3, nombre: 'Cliente Tres' },
]

const productosMock = [
  { id: 1, nombre: 'Papa Negra' },
  { id: 2, nombre: 'Papa Blanca' },
  { id: 3, nombre: 'Papa Criolla' },
]

const ventasMock = [
  {
    id: 1,
    cliente_id: 1,
    cliente: 'Cliente Uno',
    fecha_venta: '2025-07-07 12:00',
    total_venta: 2500.00,
    estado_venta: 'Completada',
    detalle: [
      {
        id: 1,
        venta_id: 1,
        producto_id: 1,
        producto: 'Papa Negra',
        cantidad: 10,
        precio_unitario_venta: 100,
        subtotal: 1000
      },
      {
        id: 2,
        venta_id: 1,
        producto_id: 2,
        producto: 'Papa Blanca',
        cantidad: 15,
        precio_unitario_venta: 100,
        subtotal: 1500
      }
    ]
  },
  {
    id: 2,
    cliente_id: 2,
    cliente: 'Cliente Dos',
    fecha_venta: '2025-07-06 17:30',
    total_venta: 1200.00,
    estado_venta: 'Pendiente',
    detalle: [
      {
        id: 3,
        venta_id: 2,
        producto_id: 3,
        producto: 'Papa Criolla',
        cantidad: 12,
        precio_unitario_venta: 100,
        subtotal: 1200
      }
    ]
  }
]

const estadoColors = {
  'Pendiente': 'warning',
  'Completada': 'success',
  'Cancelada': 'danger'
}

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [clientes, setClientes] = useState([])
  const [productos, setProductos] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [detalleSeleccionado, setDetalleSeleccionado] = useState([])
  const [form, setForm] = useState({
    cliente_id: '',
    fecha_venta: '',
    total_venta: '',
    estado_venta: 'Pendiente'
  })
  const [detalleVenta, setDetalleVenta] = useState([
    // { producto_id, cantidad, precio_unitario_venta, subtotal }
  ])

  // Filtros
  const [filtroCliente, setFiltroCliente] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroFechaDesde, setFiltroFechaDesde] = useState('')
  const [filtroFechaHasta, setFiltroFechaHasta] = useState('')

  useEffect(() => {
    setVentas(ventasMock)
    setClientes(clientesMock)
    setProductos(productosMock)
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Detalle de venta handlers
  const handleDetalleChange = (idx, field, value) => {
    const updated = detalleVenta.map((item, i) =>
      i === idx
        ? {
            ...item,
            [field]: value,
            subtotal:
              field === 'cantidad' || field === 'precio_unitario_venta'
                ? (field === 'cantidad'
                    ? value
                    : item.cantidad || 0) *
                  (field === 'precio_unitario_venta'
                    ? value
                    : item.precio_unitario_venta || 0)
                : item.subtotal
          }
        : item
    )
    setDetalleVenta(updated)
  }

  const handleAddDetalle = () => {
    setDetalleVenta([
      ...detalleVenta,
      {
        producto_id: '',
        cantidad: '',
        precio_unitario_venta: '',
        subtotal: 0
      }
    ])
  }

  const handleRemoveDetalle = (idx) => {
    setDetalleVenta(detalleVenta.filter((_, i) => i !== idx))
  }

  const calcularTotal = () => {
    return detalleVenta.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)
  }

  const handleAddVenta = (e) => {
    e.preventDefault()
    const cliente = clientes.find(c => c.id === parseInt(form.cliente_id))
    // Armar detalle con nombres de producto
    const detalleConNombres = detalleVenta.map((d, idx) => {
      const prod = productos.find(p => p.id === parseInt(d.producto_id))
      return {
        id: idx + 1,
        venta_id: ventas.length + 1,
        producto_id: parseInt(d.producto_id),
        producto: prod ? prod.nombre : '',
        cantidad: parseInt(d.cantidad),
        precio_unitario_venta: parseFloat(d.precio_unitario_venta),
        subtotal: parseFloat(d.subtotal)
      }
    })
    setVentas([
      ...ventas,
      {
        id: ventas.length + 1,
        cliente_id: parseInt(form.cliente_id),
        cliente: cliente ? cliente.nombre : '',
        fecha_venta: form.fecha_venta,
        total_venta: calcularTotal(),
        estado_venta: form.estado_venta,
        detalle: detalleConNombres
      }
    ])
    setVisible(false)
    setForm({
      cliente_id: '',
      fecha_venta: '',
      total_venta: '',
      estado_venta: 'Pendiente'
    })
    setDetalleVenta([])
  }

  // Filtro funcional y visualmente ordenado
  const ventasFiltradas = ventas.filter((venta) => {
    const matchCliente = filtroCliente ? venta.cliente_id === parseInt(filtroCliente) : true
    const matchEstado = filtroEstado ? venta.estado_venta === filtroEstado : true
    const fechaVenta = venta.fecha_venta.slice(0, 10)
    const matchFechaDesde = filtroFechaDesde ? fechaVenta >= filtroFechaDesde : true
    const matchFechaHasta = filtroFechaHasta ? fechaVenta <= filtroFechaHasta : true
    return matchCliente && matchEstado && matchFechaDesde && matchFechaHasta
  })

  return (
    <CCard style={{ background: 'linear-gradient(135deg, #E6EBE0 60%, #36C9C6 100%)', border: 'none', boxShadow: '0 2px 16px 0 #36C9C633' }}>
      <CCardHeader className="d-flex justify-content-between align-items-center" style={{ background: '#ED6A5A', color: '#fff' }}>
        <h5 className="mb-0" style={{ letterSpacing: 1 }}>Ventas</h5>
        <CButton color="light" style={{ color: '#ED6A5A', fontWeight: 'bold' }} onClick={() => setVisible(true)}>
          + Nueva Venta
        </CButton>
      </CCardHeader>
      <CCardBody>
        {/* Filtros organizados */}
        <div className="mb-4 d-flex flex-wrap gap-3 align-items-end" style={{ background: '#F4F1BB', borderRadius: 8, padding: 16 }}>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 200 }}
            label="Cliente"
            value={filtroCliente}
            onChange={e => setFiltroCliente(e.target.value)}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </CFormSelect>
          <CFormSelect
            size="sm"
            style={{ maxWidth: 150 }}
            label="Estado"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option>Pendiente</option>
            <option>Completada</option>
            <option>Cancelada</option>
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
          {(filtroCliente || filtroEstado || filtroFechaDesde || filtroFechaHasta) && (
            <CButton color="secondary" size="sm" variant="outline" onClick={() => {
              setFiltroCliente('')
              setFiltroEstado('')
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
              <CTableHeaderCell>Cliente</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Total</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Detalle</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ventasFiltradas.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center text-muted">
                  No hay ventas registradas con los filtros seleccionados.
                </CTableDataCell>
              </CTableRow>
            )}
            {ventasFiltradas.map((venta) => (
              <CTableRow key={venta.id}>
                <CTableDataCell>{venta.id}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color="info" style={{ fontSize: 13, background: '#36C9C6', color: '#fff' }}>
                    {venta.cliente}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontFamily: 'monospace', color: '#6c757d' }}>
                    {venta.fecha_venta}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ color: '#ED6A5A', fontWeight: 600 }}>${venta.total_venta.toFixed(2)}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={estadoColors[venta.estado_venta] || 'secondary'}>
                    {venta.estado_venta}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDetalleSeleccionado(venta.detalle || [])
                      setVisibleDetalle(true)
                    }}
                  >
                    Ver Detalle
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Modal para nueva venta */}
      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader style={{ background: '#ED6A5A', color: '#fff' }}>
          <strong>Nueva Venta</strong>
        </CModalHeader>
        <CForm onSubmit={handleAddVenta}>
          <CModalBody>
            <CFormSelect
              label="Cliente"
              name="cliente_id"
              value={form.cliente_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </CFormSelect>
            <CFormInput
              className="mt-2"
              type="datetime-local"
              label="Fecha de venta"
              name="fecha_venta"
              value={form.fecha_venta}
              onChange={handleInputChange}
              required
            />
            <CFormSelect
              className="mt-2"
              label="Estado"
              name="estado_venta"
              value={form.estado_venta}
              onChange={handleInputChange}
              required
            >
              <option>Pendiente</option>
              <option>Completada</option>
              <option>Cancelada</option>
            </CFormSelect>
            <div className="mt-4 mb-2">
              <strong>Detalle de la venta</strong>
              <CButton color="success" size="sm" className="ms-2" onClick={handleAddDetalle}>
                + Agregar producto
              </CButton>
            </div>
            <CTable bordered small>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Producto</CTableHeaderCell>
                  <CTableHeaderCell>Cantidad</CTableHeaderCell>
                  <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                  <CTableHeaderCell>Subtotal</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {detalleVenta.length === 0 && (
                  <CTableRow>
                    <CTableDataCell colSpan={5} className="text-center text-muted">
                      Agregue productos a la venta.
                    </CTableDataCell>
                  </CTableRow>
                )}
                {detalleVenta.map((item, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>
                      <CFormSelect
                        size="sm"
                        value={item.producto_id}
                        onChange={e => handleDetalleChange(idx, 'producto_id', e.target.value)}
                        required
                      >
                        <option value="">Seleccione producto</option>
                        {productos.map((p) => (
                          <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={e => handleDetalleChange(idx, 'cantidad', parseInt(e.target.value) || '')}
                        required
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.precio_unitario_venta}
                        onChange={e => handleDetalleChange(idx, 'precio_unitario_venta', parseFloat(e.target.value) || '')}
                        required
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <span style={{ color: '#ED6A5A', fontWeight: 600 }}>
                        ${item.subtotal ? Number(item.subtotal).toFixed(2) : '0.00'}
                      </span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm" variant="outline" onClick={() => handleRemoveDetalle(idx)}>
                        Quitar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="text-end mt-2">
              <strong>Total: </strong>
              <span style={{ color: '#36C9C6', fontWeight: 700, fontSize: 18 }}>
                ${calcularTotal().toFixed(2)}
              </span>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit" disabled={detalleVenta.length === 0}>
              Guardar
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Modal Detalle Venta */}
      <CModal visible={visibleDetalle} onClose={() => setVisibleDetalle(false)}>
        <CModalHeader style={{ background: '#36C9C6', color: '#fff' }}>
          <strong>Detalle de la Venta</strong>
        </CModalHeader>
        <CModalBody>
          <CTable bordered small>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                <CTableHeaderCell>Precio Unitario</CTableHeaderCell>
                <CTableHeaderCell>Subtotal</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {detalleSeleccionado.length === 0 && (
                <CTableRow>
                  <CTableDataCell colSpan={4} className="text-center text-muted">
                    Sin productos en esta venta.
                  </CTableDataCell>
                </CTableRow>
              )}
              {detalleSeleccionado.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{item.producto}</CTableDataCell>
                  <CTableDataCell>{item.cantidad}</CTableDataCell>
                  <CTableDataCell>${Number(item.precio_unitario_venta).toFixed(2)}</CTableDataCell>
                  <CTableDataCell>${Number(item.subtotal).toFixed(2)}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetalle(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Ventas

//commit