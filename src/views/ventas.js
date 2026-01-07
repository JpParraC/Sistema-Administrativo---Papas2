import React, { useEffect, useState } from 'react'
import {
  CCard, CCardHeader, CCardBody, CButton, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader,
  CModalBody, CModalFooter, CForm, CFormInput, CFormSelect, CBadge
} from '@coreui/react'

const API_URL = 'http://localhost:4000/api'

const estadoColors = {
  Pendiente: 'warning',
  Completada: 'success',
  Cancelada: 'danger'
}

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [clientes, setClientes] = useState([])
  const [productos, setProductos] = useState([])
  const [visibleVenta, setVisibleVenta] = useState(false)
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [visibleCedula, setVisibleCedula] = useState(false)
  const [visibleNuevoCliente, setVisibleNuevoCliente] = useState(false)
  const [detalleSeleccionado, setDetalleSeleccionado] = useState([])
  const [detalleVenta, setDetalleVenta] = useState([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)

  const [form, setForm] = useState({
    cliente_id: '',
    estado_venta: 'Pendiente'
  })

  const [cedulaInput, setCedulaInput] = useState('')
  const [nuevoClienteForm, setNuevoClienteForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    cedula: ''
  })

  /* ======================
     CARGA INICIAL
  ====================== */
  useEffect(() => {
    fetchVentas()
    fetchProductos()
  }, [])

  const fetchVentas = async () => {
    try {
      const res = await fetch(`${API_URL}/ventas`)
      const data = await res.json()
      setVentas(
        data.map(v => ({
          id: v.tb_idventa,
          cliente_id: v.tb_idclien,
          cliente: v.cliente,
          fecha_venta: v.tb_fechvent,
          total_venta: Number(v.tb_totalven),
          estado_venta: v.tb_estadven
        }))
      )
    } catch (error) {
      console.error('Error cargando ventas', error)
    }
  }

  const fetchProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos/cosecha`)
      const data = await res.json()
      setProductos(data.map(p => ({
        id: p.id,
        nombre: p.nombre
      })))
    } catch (error) {
      console.error('Error cargando productos', error)
    }
  }

  /* ======================
     DETALLE VENTA
  ====================== */
  const verDetalleVenta = async (idVenta) => {
    try {
      const res = await fetch(`${API_URL}/ventas/${idVenta}`)
      const data = await res.json()
      setDetalleSeleccionado(
        data.detalles.map(d => ({
          producto: d.producto || d.tb_idprodu,
          cantidad: d.tb_cantida,
          precio_unitario_venta: d.tb_precuni,
          subtotal: d.tb_subtota
        }))
      )
      setVisibleDetalle(true)
    } catch (error) {
      console.error('Error obteniendo detalle', error)
    }
  }

  /* ======================
     NUEVA VENTA
  ====================== */
  const handleAddDetalle = () => {
    setDetalleVenta([...detalleVenta, {
      producto_id: '',
      cantidad: '',
      precio_unitario_venta: '',
      subtotal: 0
    }])
  }

  const handleDetalleChange = (idx, field, value) => {
    const updated = detalleVenta.map((item, i) =>
      i === idx
        ? {
            ...item,
            [field]: value,
            subtotal:
              (field === 'cantidad' ? value : item.cantidad || 0) *
              (field === 'precio_unitario_venta' ? value : item.precio_unitario_venta || 0)
          }
        : item
    )
    setDetalleVenta(updated)
  }

  const handleRemoveDetalle = (idx) => {
    setDetalleVenta(detalleVenta.filter((_, i) => i !== idx))
  }

  const calcularTotal = () =>
    detalleVenta.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)

  const handleAddVenta = async (e) => {
    e.preventDefault()
    if (!clienteSeleccionado) return alert('Debe seleccionar un cliente')

    const payload = {
      idCliente: parseInt(clienteSeleccionado.tma_idclien),
      estado: form.estado_venta,
      detalles: detalleVenta.map(d => ({
        idProducto: parseInt(d.producto_id),
        cantidad: parseInt(d.cantidad),
        precio: parseFloat(d.precio_unitario_venta)
      }))
    }

    try {
      const res = await fetch(`${API_URL}/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error()

      setVisibleVenta(false)
      setDetalleVenta([])
      setForm({ cliente_id: '', estado_venta: 'Pendiente' })
      setClienteSeleccionado(null)
      fetchVentas()
    } catch (error) {
      alert('Error al guardar la venta')
    }
  }

  /* ======================
     CLIENTE POR CEDULA
  ====================== */
  const buscarCliente = async () => {
    try {
      const res = await fetch(`${API_URL}/clientes/cedula/${cedulaInput}`)
      if (res.status === 404) {
        // No encontrado, abrir modal de nuevo cliente
        setNuevoClienteForm({ ...nuevoClienteForm, cedula: cedulaInput })
        setVisibleNuevoCliente(true)
      } else {
        const data = await res.json()
        setClienteSeleccionado(data)
        setVisibleCedula(false)
        setVisibleVenta(true)
      }
    } catch (error) {
      console.error('Error buscando cliente', error)
    }
  }

  const registrarNuevoCliente = async () => {
    try {
      const res = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoClienteForm)
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setClienteSeleccionado(data)
      setVisibleNuevoCliente(false)
      setVisibleCedula(false)
      setVisibleVenta(true)
    } catch (error) {
      alert('Error registrando cliente')
    }
  }

  /* ======================
     FILTROS
  ====================== */
  const ventasFiltradas = ventas

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h5>Ventas</h5>
        <CButton onClick={() => setVisibleCedula(true)}>+ Nueva Venta</CButton>
      </CCardHeader>

      <CCardBody>
        <CTable bordered hover responsive>
          <CTableHead>
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
            {ventasFiltradas.map(v => (
              <CTableRow key={v.id}>
                <CTableDataCell>{v.id}</CTableDataCell>
                <CTableDataCell>{v.cliente}</CTableDataCell>
                <CTableDataCell>{v.fecha_venta}</CTableDataCell>
                <CTableDataCell>${v.total_venta.toFixed(2)}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={estadoColors[v.estado_venta]}>{v.estado_venta}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" onClick={() => verDetalleVenta(v.id)}>Ver</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* MODAL CEDULA */}
      <CModal visible={visibleCedula} onClose={() => setVisibleCedula(false)}>
        <CModalHeader>Buscar Cliente por Cédula</CModalHeader>
        <CModalBody>
          <CFormInput
            placeholder="Ingrese cédula"
            value={cedulaInput}
            onChange={e => setCedulaInput(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCedula(false)}>Cancelar</CButton>
          <CButton onClick={buscarCliente}>Buscar</CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL NUEVO CLIENTE */}
      <CModal visible={visibleNuevoCliente} onClose={() => setVisibleNuevoCliente(false)}>
        <CModalHeader>Registrar Nuevo Cliente</CModalHeader>
        <CModalBody>
          <CFormInput
            className="mb-2"
            placeholder="Nombre"
            value={nuevoClienteForm.nombre}
            onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, nombre: e.target.value })}
          />
          <CFormInput
            className="mb-2"
            placeholder="Dirección"
            value={nuevoClienteForm.direccion}
            onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, direccion: e.target.value })}
          />
          <CFormInput
            className="mb-2"
            placeholder="Teléfono"
            value={nuevoClienteForm.telefono}
            onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, telefono: e.target.value })}
          />
          <CFormInput
            className="mb-2"
            placeholder="Email"
            value={nuevoClienteForm.email}
            onChange={e => setNuevoClienteForm({ ...nuevoClienteForm, email: e.target.value })}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleNuevoCliente(false)}>Cancelar</CButton>
          <CButton onClick={registrarNuevoCliente}>Registrar</CButton>
        </CModalFooter>
      </CModal>

      {/* MODAL NUEVA VENTA */}
      <CModal visible={visibleVenta} onClose={() => setVisibleVenta(false)} size="lg">
        <CModalHeader>Nueva Venta</CModalHeader>
        <CForm onSubmit={handleAddVenta}>
          <CModalBody>
            <CFormInput
              label="Cliente"
              value={clienteSeleccionado?.tma_nombrec || ''}
              readOnly
            />

            <div className="mt-3">
              <CButton size="sm" onClick={handleAddDetalle}>+ Agregar producto</CButton>
            </div>

            <CTable small bordered className="mt-2">
              <CTableBody>
                {detalleVenta.map((d, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell>
                      <CFormSelect
                        size="sm"
                        value={d.producto_id}
                        onChange={e => handleDetalleChange(i, 'producto_id', e.target.value)}
                      >
                        <option value="">Producto</option>
                        {productos.map(p => (
                          <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        value={d.cantidad}
                        onChange={e => handleDetalleChange(i, 'cantidad', e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        size="sm"
                        type="number"
                        value={d.precio_unitario_venta}
                        onChange={e => handleDetalleChange(i, 'precio_unitario_venta', e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell>${d.subtotal}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="danger" onClick={() => handleRemoveDetalle(i)}>X</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <div className="text-end">
              <strong>Total: ${calcularTotal().toFixed(2)}</strong>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleVenta(false)}>Cancelar</CButton>
            <CButton type="submit" disabled={!detalleVenta.length}>Guardar</CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* MODAL DETALLE */}
      <CModal visible={visibleDetalle} onClose={() => setVisibleDetalle(false)}>
        <CModalHeader>Detalle Venta</CModalHeader>
        <CModalBody>
          <CTable small bordered>
            <CTableBody>
              {detalleSeleccionado.map((d, i) => (
                <CTableRow key={i}>
                  <CTableDataCell>{d.producto}</CTableDataCell>
                  <CTableDataCell>{d.cantidad}</CTableDataCell>
                  <CTableDataCell>${d.precio_unitario_venta}</CTableDataCell>
                  <CTableDataCell>${d.subtotal}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setVisibleDetalle(false)}>Cerrar</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Ventas
